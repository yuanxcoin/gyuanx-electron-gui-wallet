<template>
  <div>
    <q-list class="service-node-list" no-border>
      <q-item v-for="node in serviceNodes" :key="node.service_node_pubkey" @click.native="details(node)">
        <q-item-section>
          <q-item-label class="ellipsis">{{ node.service_node_pubkey }}</q-item-label>
          <q-item-label class="non-selectable">
            <span v-if="getRole(node)">{{ getRole(node) }} •</span> {{ getFee(node) }}
            <span v-if="node.ourContributionAmount">
              • {{ $t("strings.contribution") }}: <FormatLoki :amount="node.ourContributionAmount"
            /></span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            v-if="node.requested_unlock_height === 0"
            color="primary"
            size="md"
            :label="$t(buttonI18n)"
            :disabled="!is_ready"
            side
            @click="actionButtonClicked(node, $event)"
          />
          <q-item-label v-if="node.requested_unlock_height > 0" header>
            {{
              $t("strings.unlockingAtHeight", {
                number: node.requested_unlock_height
              })
            }}
          </q-item-label>
        </q-item-section>
        <ContextMenu
          :menu-items="menuItems"
          @viewOnExplorer="openExplorer(node.service_node_pubkey)"
          @copyServiceNodeKey="copyKey(node.service_node_pubkey)"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { clipboard } from "electron";
import ContextMenu from "components/menus/contextmenu";
import FormatLoki from "components/format_loki";
export default {
  name: "ServiceNodeList",
  components: {
    ContextMenu,
    FormatLoki
  },
  props: {
    serviceNodes: {
      type: Array,
      required: true
    },
    details: {
      type: Function,
      required: true
    },
    buttonI18n: {
      type: String,
      required: true
    },
    buttonAction: {
      type: String,
      required: true
    }
  },
  data() {
    const menuItems = [
      { action: "copyServiceNodeKey", i18n: "menuItems.copyServiceNodeKey" },
      { action: "viewOnExplorer", i18n: "menuItems.viewOnExplorer" }
    ];
    return {
      menuItems
    };
  },
  methods: {
    is_ready() {
      return this.$store.getters["gateway/isReady"];
    },
    getRole(node) {
      let role = "";
      const opAddress = node.operator_address;
      if (node.operator_address === this.our_address) {
        role = "strings.operator";
      } else if (node.ourContributionAmount && opAddress !== this.our_address) {
        role = "strings.contributor";
      }
      // const role = node.operator_address === this.our_address ?  : "strings.contributor";
      return this.$t(role);
    },
    getFee(node) {
      const operatorPortion = node.portions_for_operator;
      const percentageFee = (operatorPortion / 18446744073709551612) * 100;
      return `${percentageFee}% ${this.$t("strings.transactions.fee")}`;
    },
    copyKey(key) {
      clipboard.writeText(key);
      this.$q.notify({
        type: "positive",
        timeout: 1000,
        message: this.$t("notification.positive.copied", {
          item: "Service node key"
        })
      });
    },
    actionButtonClicked(node, event) {
      event.stopPropagation();
      console.log("the action button has been clicked");
      this.$emit(this.buttonAction, node);
    },
    openExplorer(key) {
      this.$gateway.send("core", "open_explorer", {
        type: "service_node",
        id: key
      });
    }
  }
};
</script>

<style></style>
