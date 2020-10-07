<template>
  <q-list link no-border :dark="theme == 'dark'" class="lns-record-list">
    <q-item
      v-for="record in recordList"
      :key="record.name_hash"
      class="loki-list-item"
    >
      <q-item-section class="type" avatar>
        <q-icon :name="isLocked(record) ? 'lock' : 'lock_open'" size="24px" />
      </q-item-section>
      <q-item-section>
        <q-item-label :class="bindClass(record)">
          {{ isLocked(record) ? record.name_hash : record.name }}
        </q-item-label>
        <q-item-label v-if="!isLocked(record)">
          {{ record.value }}
        </q-item-label>
      </q-item-section>
      <q-item-section side class="height">
        <template v-if="isLocked(record)">
          {{ record.register_height | blockHeight }}
        </template>
        <template v-else>
          <q-item-section>
            <q-btn
              color="secondary"
              :label="$t('buttons.update')"
              @click="onUpdate(record)"
            />
          </q-item-section>
        </template>
      </q-item-section>
      <q-item-section v-if="!isLocked(record)" side>
        {{ record.register_height | blockHeight }}
      </q-item-section>
      <!-- <ContextMenu
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
      /> -->
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from "vuex";
import { i18n } from "boot/i18n";
// import ContextMenu from "components/menus/contextmenu";

export default {
  name: "LNSRecordList",
  props: {
    recordList: {
      type: Array,
      required: true
    }
  },
  // components: {
  //   ContextMenu
  // },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme
  }),
  filters: {
    blockHeight(value) {
      const heightString = i18n.t("strings.blockHeight");
      return `${heightString}: ${value}`;
    }
  },
  methods: {
    isLocked(record) {
      return !record.name || !record.value;
    },
    bindClass(record) {
      return [this.isLocked(record) ? "locked" : "unlocked"];
    }
  }
};
</script>

<style lang="scss">
.lns-record-list {
  .q-item {
    cursor: pointer;
    background: #313131;
    -webkit-transition: background-color 0.2s ease-in;
    transition: background-color 0.2s ease-in;

    border-radius: 3px;

    + .q-item {
      margin-top: 10px;
    }
  }

  .q-item-sublabel {
    color: #313131;
  }

  .q-item:hover {
    background: rgba(117, 117, 117, 0.3);
  }
}
</style>
