<template>
  <div class="lns-record-list">
    <div v-if="needsDecryption" class="decrypt row justify-between items-end">
      <GyuanxField
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
      </GyuanxField>
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
      <span class="record-type-title">{{
        $t("titles.lnsSessionRecords")
      }}</span>
      <LNSRecordList
        :record-list="session_records"
        :is-gyuanxnet="false"
        @onUpdate="onUpdate"
      />
    </div>
    <div v-if="gyuanxnet_records.length > 0" class="records-group">
      <span class="record-type-title">{{
        $t("titles.lnsGyuanxnetRecords")
      }}</span>
      <LNSRecordList
        :record-list="gyuanxnet_records"
        :is-gyuanxnet="true"
        @onUpdate="onUpdate"
        @onRenew="onRenew"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GyuanxField from "components/gyuanx_field";
import { session_name_or_gyuanxnet_name } from "src/validators/common";
import LNSRecordList from "./lns_record_list";

export default {
  name: "LNSRecords",
  components: {
    GyuanxField,
    LNSRecordList
  },
  data() {
    return {
      name: "",
      decrypting: false
    };
  },
  mounted() {
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
      return this.records_of_type(state, "session");
    },
    gyuanxnet_records(state) {
      return this.records_of_type(state, "gyuanxnet");
    },
    needsDecryption() {
      const records = [...this.gyuanxnet_records, ...this.session_records];
      return records.find(r => this.isLocked(r));
    }
  }),
  methods: {
    records_of_type(state, type) {
      // receives the type and returns the records of that type
      const ourAddresses = this.ourAddresses;
      const records = state.gateway.wallet.lnsRecords;
      const ourRecords = records.filter(record => {
        return (
          record.type === type &&
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
        return b.update_height - a.update_height;
      });
    },
    isLocked(record) {
      return !record.name || !record.value;
    },
    onUpdate(record) {
      this.$emit("onUpdate", record);
    },
    onRenew(record) {
      this.$emit("onRenew", record);
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

      const name = this.name.trim().toLowerCase();

      this.$gateway.once("decrypt_record_result", data => {
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
      if (name.endsWith(".gyuanx")) {
        type = "gyuanxnet";
      }

      this.$gateway.send("wallet", "decrypt_record", {
        name,
        type
      });
      this.decrypting = true;
    }
  },

  validations: {
    name: {
      session_name_or_gyuanxnet_name
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

  .gyuanx-field {
    flex: 1;
  }

  .decrypt {
    margin-bottom: 20px;

    .btn-wrapper {
      height: 46px;
    }
  }
}
</style>
