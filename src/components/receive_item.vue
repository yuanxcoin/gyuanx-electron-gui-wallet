<template>
  <q-list class="oxen-list-item" no-border @click.native="details(address)">
    <q-item>
      <q-item-section class="flex">
        <q-item-label class="ellipsis">{{ address.address }}</q-item-label>
        <q-item-label v-if="sublabel" caption class="non-selectable">{{
          sublabel
        }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <q-btn
            style="margin-right: 4px;"
            flat
            padding="xs"
            size="md"
            @click="showQR(address.address, $event)"
          >
            <!-- height of 24 makes it equal size as copy -->
            <img :src="qrImage" height="24" />
            <q-tooltip anchor="bottom right" self="top right" :offset="[0, 5]">
              {{ $t("menuItems.showQRCode") }}
            </q-tooltip>
          </q-btn>
          <q-btn
            flat
            padding="xs"
            size="md"
            icon="file_copy"
            @click="copyAddress(address.address, $event)"
          >
            <q-tooltip anchor="bottom right" self="top right" :offset="[0, 5]">
              {{ $t("menuItems.copyAddress") }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-item-section>
    </q-item>
    <template v-if="shouldShowInfo">
      <q-separator />
      <q-item>
        <q-item-section>
          <div class="row info-section">
            <span class="col-sm-4">
              <span>{{ $t("strings.oxenBalance") }}</span>
              <br />
              <span class="value">{{ address.balance | currency }}</span>
            </span>
            <span class="col-sm-4">
              <span>{{ $t("strings.oxenUnlockedBalance") }}</span>
              <br />
              <span class="value">{{
                address.unlocked_balance | currency
              }}</span>
            </span>
            <span class="col-sm-4">
              <span>{{ $t("strings.unspentOutputs") }}</span>
              <br />
              <span class="value">{{
                address.num_unspent_outputs | toString
              }}</span>
            </span>
          </div>
        </q-item-section>
      </q-item>
    </template>
    <ContextMenu
      :menu-items="menuItems"
      @showDetails="details(address)"
      @copyAddress="copyAddress(address.address, $event)"
    />
  </q-list>
</template>

<script>
import ContextMenu from "components/menus/contextmenu";

export default {
  name: "ReceiveItem",
  components: {
    ContextMenu
  },
  filters: {
    toString: function(value) {
      if (typeof value !== "number") return "N/A";
      return String(value);
    },
    currency: function(value) {
      if (typeof value !== "number") return "N/A";

      const amount = value / 1e9;
      return amount.toLocaleString();
    }
  },
  props: {
    address: {
      type: Object,
      required: true
    },
    sublabel: {
      type: String,
      required: false,
      default: undefined
    },
    shouldShowInfo: {
      type: Boolean,
      required: false,
      default: true
    },
    showQR: {
      type: Function,
      required: true
    },
    copyAddress: {
      type: Function,
      required: true
    },
    details: {
      type: Function,
      required: true
    },
    whiteQRIcon: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    const menuItems = [
      { action: "showDetails", i18n: "menuItems.showDetails" },
      { action: "copyAddress", i18n: "menuItems.copyAddress" }
    ];
    return {
      menuItems
    };
  },
  computed: {
    qrImage() {
      const image = this.whiteQRIcon ? "qr-code" : "qr-code-grey";
      return `${image}.svg`;
    }
  }
};
</script>

<style>
.info-section {
  max-height: 3rem;
}
</style>
