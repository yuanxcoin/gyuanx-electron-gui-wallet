<template>
  <q-page class="address-book">
    <div class="header row q-pt-md q-pb-xs q-mx-md q-mb-none items-center non-selectable">
      {{ $t("titles.addressBook") }}
    </div>

    <template v-if="address_book_combined.length">
      <q-list link no-border :dark="theme == 'dark'" class="loki-list">
        <q-item
          v-for="entry in address_book_combined"
          :key="`${entry.address}-${entry.name}-${entry.payment_id}`"
          class="loki-list-item"
          @click.native="details(entry)"
        >
          <q-item-section>
            <q-item-label class="ellipsis">{{ entry.address }}</q-item-label>
            <q-item-label class="non-selectable" caption>{{ entry.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>
              <q-icon size="24px" :name="entry.starred ? 'star' : 'star_border'" />
              <q-btn
                color="secondary"
                style="margin-left: 10px;"
                :label="$t('buttons.send')"
                :disabled="view_only"
                @click="sendToAddress(entry, $event)"
              />
            </q-item-label>
          </q-item-section>
          <ContextMenu
            :menu-items="menuItems"
            @showDetails="details(entry)"
            @sendToAddress="sendToAddress(entry)"
            @copyAddress="copyAddress(entry)"
          />
        </q-item>
      </q-list>
    </template>
    <template v-else>
      <p class="q-ma-md">{{ $t("strings.addressBookIsEmpty") }}</p>
    </template>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :disable="!is_ready" round color="primary" icon="add" @click="addEntry" />
    </q-page-sticky>
    <AddressBookDetails ref="addressBookDetails" />
  </q-page>
</template>

<script>
const { clipboard } = require("electron");
import { mapState } from "vuex";
import AddressBookDetails from "components/address_book_details";
import ContextMenu from "components/menus/contextmenu";
export default {
  components: {
    AddressBookDetails,
    ContextMenu
  },
  data() {
    const menuItems = [
      { key: 0, action: "showDetails", i18n: "menuItems.showDetails" },
      { key: 1, action: "sendToAddress", i18n: "menuItems.sendToThisAddress" },
      { key: 2, action: "copyAddress", i18n: "menuItems.copyAddress" }
    ];
    return {
      menuItems
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    view_only: state => state.gateway.wallet.info.view_only,
    address_book: state => state.gateway.wallet.address_list.address_book,
    address_book_starred: state => state.gateway.wallet.address_list.address_book_starred,
    is_ready() {
      return this.$store.getters["gateway/isReady"];
    },
    address_book_combined() {
      const starred = this.address_book_starred.map(a => ({
        ...a,
        starred: true
      }));
      return [...starred, ...this.address_book];
    }
  }),
  methods: {
    details: function(entry) {
      this.$refs.addressBookDetails.entry = entry;
      this.$refs.addressBookDetails.mode = "view";
      this.$refs.addressBookDetails.isVisible = true;
    },
    addEntry: function() {
      this.$refs.addressBookDetails.entry = null;
      this.$refs.addressBookDetails.mode = "new";
      this.$refs.addressBookDetails.isVisible = true;
    },
    sendToAddress(address) {
      this.$router.replace({
        path: "send",
        query: {
          address: address.address,
          payment_id: address.payment_id
        }
      });
    },
    copyAddress(entry) {
      clipboard.writeText(entry.address);
      if (entry.payment_id) {
        this.$q
          .dialog({
            title: this.$t("dialog.copyAddress.title"),
            message: this.$t("dialog.copyAddress.message"),
            ok: {
              label: this.$t("dialog.buttons.ok")
            }
          })
          .onDismiss(() => null)
          .onCancel(() => null)
          .onOk(() => {
            this.$q.notify({
              type: "positive",
              timeout: 1000,
              message: this.$t("notification.positive.addressCopied")
            });
          });
      } else {
        this.$q.notify({
          type: "positive",
          timeout: 1000,
          message: this.$t("notification.positive.addressCopied")
        });
      }
    }
  }
};
</script>

<style lang="scss">
.address-book {
  .header {
    font-size: 14px;
    font-weight: 500;
  }

  .loki-list-item {
    cursor: pointer;
    padding-top: 12px;
    padding-bottom: 12px;

    .q-item-sublabel {
      font-size: 14px;
    }

    .q-item-label {
      font-weight: 400;
    }

    .q-item-section {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 12px;
    }
  }
}
</style>
