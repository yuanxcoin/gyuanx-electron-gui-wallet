<template>
  <q-list link no-border class="lns-record-list">
    <q-item
      v-for="record in recordList"
      :key="record.name_hash"
      class="gyuanx-list-item"
    >
      <q-item-section class="type" avatar>
        <q-icon :name="isLocked(record) ? 'lock' : 'lock_open'" size="24px" />
      </q-item-section>
      <q-item-section>
        <q-item-label :class="bindClass(record)">{{
          isLocked(record) ? record.name_hash : record.name
        }}</q-item-label>
        <q-item-label v-if="!isLocked(record)">{{ record.value }}</q-item-label>
      </q-item-section>
      <q-item-section side class="height">
        <template v-if="isLocked(record)">{{
          record.update_height | blockHeight
        }}</template>
        <template v-else>
          <q-item-section>
            <div class="row update-renew-buttons">
              <q-btn
                color="primary"
                :label="$t('buttons.update')"
                @click="onUpdate(record)"
              />
              <q-btn
                v-if="isGyuanxnet"
                color="primary"
                :label="$t('buttons.renew')"
                @click="onRenew(record)"
              />
            </div>
          </q-item-section>
        </template>
      </q-item-section>
      <q-item-section v-if="!isLocked(record)" side>
        <span v-if="record.type === 'session'">{{
          record.update_height | blockHeight
        }}</span>
        <span v-else class="gyuanxnet-expiration">{{
          record.expiration_height | expirationHeight
        }}</span>
      </q-item-section>
      <ContextMenu
        :menu-items="validMenuItems(record)"
        @ownerCopy="copy(record.owner, $t('notification.positive.ownerCopied'))"
        @nameCopy="copy(record.name, $t('notification.positive.nameCopied'))"
        @copyValue="copyValue(record)"
        @backupOwnerCopy="
          copy(
            record.backup_owner,
            $t('notification.positive.backupOwnerCopied')
          )
        "
      />
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from "vuex";
import { i18n } from "boot/i18n";
import ContextMenu from "components/menus/contextmenu";
const { clipboard } = require("electron");

export default {
  name: "LNSRecordList",
  components: {
    ContextMenu
  },
  props: {
    recordList: {
      type: Array,
      required: true
    },
    isGyuanxnet: {
      type: Boolean,
      required: true
    }
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme
  }),
  filters: {
    blockHeight(value) {
      const heightString = i18n.t("strings.blockHeight");
      return `${heightString}: ${value}`;
    },
    expirationHeight(value) {
      const expirationHeightString = i18n.t("strings.expirationHeight");
      return `${expirationHeightString}: ${value}`;
    }
  },
  methods: {
    isLocked(record) {
      return !record.name || !record.value;
    },
    bindClass(record) {
      return [this.isLocked(record) ? "locked" : "unlocked"];
    },
    onUpdate(record) {
      this.$emit("onUpdate", record);
    },
    onRenew(record) {
      this.$emit("onRenew", record);
    },
    copyNameI18nLabel(record) {
      if (record.type === "session") {
        return "menuItems.copyName";
      } else {
        return "menuItems.copyGyuanxnetName";
      }
    },
    copyValueI18nLabel(record) {
      if (record.type === "session") {
        return "menuItems.copySessionId";
      } else if (record.type === "gyuanxnet") {
        return "menuItems.copyGyuanxnetAddress";
      }
      return "menuItems.copyAddress";
    },
    validMenuItems(record) {
      // change name depending on if gyuanxnet or session
      const lockedItems = [
        { action: "nameCopy", i18n: this.copyNameI18nLabel(record) },
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
    // can copy a value on unlock
    copyValue(record) {
      let message = this.$t("notification.positive.gyuanxnetAddressCopied");
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
  }
};
</script>

<style lang="scss">
.gyuanxnet-expiration {
  width: 180px;
}

.lns-record-list {
  .q-item {
    cursor: pointer;
    color: #1f1c47;
    background: white;
    -webkit-transition: background-color 0.2s ease-in;
    transition: background-color 0.2s ease-in;

    border-radius: 3px;

    .height {
      color: #1f1c47;
    }

    // we don't want to select button text (also a span) as well
    // this is the height text
    div > span {
      color: #1f1c47;
    }

    + .q-item {
      margin-top: 10px;
    }
  }

  .q-item:hover {
    background: #12c7ba;
  }
}
.update-renew-buttons {
  .q-btn {
    color: red;
  }
  .q-btn:not(:first-child) {
    margin-left: 8px;
  }
}
</style>
