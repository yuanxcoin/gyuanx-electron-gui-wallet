<template>
  <div class="lns-record-list">
    <div v-if="needsDecryption" class="decrypt row justify-between items-end">
      <LokiField
        :label="$t('fieldLabels.decryptRecord')"
        :disable="decrypting"
        :error="$v.name.$error"
      >
        <q-input
          v-model.trim="name"
          :dark="theme == 'dark'"
          borderless
          dense
          :placeholder="$t('placeholders.lnsDecryptName')"
          :disable="decrypting"
          @blur="$v.name.$touch"
        />
      </LokiField>
      <div class="btn-wrapper q-ml-md row items-center">
        <q-btn
          color="primary"
          :label="$t('buttons.decrypt')"
          :loading="decrypting"
          @click="decrypt()"
        />
      </div>
    </div>
    <div v-if="session_records.length > 0" class="records-group">
      <span class="record-type-title">Session records</span>
      <LNSRecordList :record-list="session_records" />
    </div>
    <div v-if="lokinet_records.length > 0" class="records-group">
      <span class="record-type-title">Lokinet records</span>
      <LNSRecordList :record-list="lokinet_records" />
    </div>
  </div>
</template>

<script>
const { clipboard } = require("electron");
import { mapState } from "vuex";
import { i18n } from "boot/i18n";
import LokiField from "components/loki_field";
import { session_id_or_lokinet_name } from "src/validators/common";
// import ContextMenu from "components/menus/contextmenu";
import LNSRecordList from "./lns_record_list";

export default {
  name: "LNSRecords",
  components: {
    LokiField,
    LNSRecordList
    // ContextMenu
  },
  filters: {
    blockHeight(value) {
      const heightString = i18n.t("strings.blockHeight");
      return `${heightString}: ${value}`;
    }
  },
  data() {
    return {
      name: "",
      decrypting: false
    };
  },
  mounted() {
    console.log("lns_known_names kicking off");
    this.$gateway.send("wallet", "lns_known_names");
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    ourAddresses(state) {
      const { address_list } = state.gateway.wallet;
      const { used, unused, primary } = address_list;
      const all = [...used, ...unused, ...primary];
      return all.map(a => a.address).filter(a => !!a);
    },
    session_records(state) {
      const ourAddresses = this.ourAddresses;
      const records = state.gateway.wallet.lnsRecords;
      const ourRecords = records.filter(record => {
        return (
          record.type === "session" &&
          (ourAddresses.includes(record.owner) ||
            ourAddresses.includes(record.backup_owner))
        );
      });
      //   console.log("records in lokinet records:");
      //   console.log(ourRecords);

      // Sort the records by decrypted ones first, followed by non-decrypted
      return ourRecords.sort((a, b) => {
        if (a.name && !b.name) {
          return -1;
        } else if (b.name && !a.name) {
          return 1;
        } else if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return b.register_height - a.register_height;
      });
    },
    lokinet_records(state) {
      // can clean this up for less reptition
      const ourAddresses = this.ourAddresses;
      const records = state.gateway.wallet.lnsRecords;
      //   console.log("records in lokinet records:");
      //   console.log(ourRecords);
      const ourRecords = records.filter(record => {
        return (
          record.type === "lokinet" &&
          (ourAddresses.includes(record.owner) ||
            ourAddresses.includes(record.backup_owner))
        );
      });

      // Sort the records by decrypted ones first, followed by non-decrypted
      return ourRecords.sort((a, b) => {
        if (a.name && !b.name) {
          return -1;
        } else if (b.name && !a.name) {
          return 1;
        } else if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return b.register_height - a.register_height;
      });
    },
    needsDecryption() {
      const records = [...this.lokinet_records, ...this.session_records];
      return records.find(r => this.isLocked(r));
    }
  }),
  methods: {
    validMenuItems(record) {
      const lockedItems = [
        { action: "nameCopy", i18n: "menuItems.copyName" },
        { action: "copyValue", i18n: this.copyValueI18nLabel(record) }
      ];
      let menuItems = [{ action: "ownerCopy", i18n: "menuItems.copyOwner" }];
      const backupOwnerItem = [
        { action: "backupOwnerCopy", i18n: "menuItems.copyBackupOwner" }
      ];
      if (!this.isLocked(record)) {
        menuItems = [...lockedItems, ...menuItems];
      }
      if (record.backup_owner !== "") {
        menuItems = [...menuItems, ...backupOwnerItem];
      }
      return menuItems;
    },
    isLocked(record) {
      console.log("a record:");
      console.log(record);
      return !record.name || !record.value;
    },
    copyValueI18nLabel(record) {
      if (record.type === "session") {
        return "menuItems.copySessionId";
      } else if (record.type === "lokinet") {
        return "menuItems.copyLokinetName";
      }
      return "menuItems.copyAddress";
    },
    decrypt() {
      this.$v.name.$touch();

      if (!this.name || this.name.trim().length === 0) {
        this.$q.notify({
          type: "negative",
          timeout: 3000,
          message: this.$t("notification.errors.enterName")
        });
        return;
      }

      if (this.$v.name.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 3000,
          message: this.$t("notification.errors.invalidNameFormat")
        });
        return;
      }

      const name = this.name.trim();

      console.log("setting gateway once call");
      this.$gateway.once("decrypt_record_result", data => {
        console.log("data returned from decrypt result");
        console.log(data);
        if (data.decrypted) {
          this.$q.notify({
            type: "positive",
            timeout: 2000,
            message: this.$t("notification.positive.decryptedLNSRecord", {
              name
            })
          });
          this.name = "";
        } else {
          this.$q.notify({
            type: "negative",
            timeout: 3000,
            message: this.$t("notification.errors.decryptLNSRecord", { name })
          });
        }
        this.decrypting = false;
      });

      let type = "session";
      // session names cannot have a "." so this is safe
      if (name.endsWith(".loki")) {
        type = "lokinet";
      }

      console.log("decrypt about to be called, name is and type is");
      console.log(name);
      console.log(type);
      this.$gateway.send("wallet", "decrypt_record", {
        name,
        type
      });
      this.decrypting = true;
    },
    onUpdate(record) {
      this.$emit("onUpdate", record);
    },
    // TODO: Update this
    copyValue(record) {
      let message = this.$t("notification.positive.addressCopied");
      if (record.type === "session") {
        message = this.$t("notification.positive.sessionIdCopied");
      }
      this.copy(record.value, message);
    },
    copy(value, message) {
      if (!value) return;
      clipboard.writeText(value.trim());
      this.$q.notify({
        type: "positive",
        timeout: 2000,
        message
      });
    }
  },

  // ENSURE THIS IS CORRECT, I THINK IT'S WRONG ATM
  validations: {
    // name: function(value) {
    //   // TODO: validate on both session id and lokinet addresses
    //   session_id(value) || lokinet_name(value);
    // }
    name: {
      session_id_or_lokinet_name
    }
  }
};
</script>

<style lang="scss">
.lns-record-list {
  .height {
    font-size: 0.9em;
  }
  .q-item {
    cursor: default;
  }

  .loki-field {
    flex: 1;
  }

  .decrypt {
    margin-bottom: 20px;

    .btn-wrapper {
      height: 46px;
    }
  }
}

.record-type-title {
  font-weight: bold;
  margin-bottom: 40px;
  padding-bottom: 40px;
}

.records-group {
  padding-bottom: 40px;
}
</style>
