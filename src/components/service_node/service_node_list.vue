<template>
  <div>
    <q-list class="service-node-list" no-border>
      <q-item
        v-for="node in serviceNodes"
        :key="node.service_node_pubkey"
        @click.native="details(nodeWithMinContribution(node))"
      >
        <q-item-section>
          <q-item-label class="ellipsis">{{ node.service_node_pubkey }}</q-item-label>
          <q-item-label class="non-selectable">
            <span v-if="getRole(node)">{{ getRole(node) }} •</span> {{ getFee(node) }}
            <span v-if="node.ourContributionAmount">
              • {{ $t("strings.contribution") }}: <FormatLoki :amount="node.ourContributionAmount"
            /></span>
            <span v-if="node.awaitingContribution">
              • {{ getNumContributors(node) }}
              <span v-if="getNumContributors(node) > 1">Contributors</span>
              <span v-else>Contributor</span>
              • Min contribution: {{ getMinContribution(node) }} Loki
            </span>
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
            @click="action(nodeWithMinContribution(node), $event)"
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

const MAX_NUMBER_OF_CONTRIBUTORS = 4;

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
    action: {
      type: Function,
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
    nodeWithMinContribution(node) {
      const nodeWithMinContribution = { ...node, minContribution: this.getMinContribution(node) };
      return nodeWithMinContribution;
    },
    is_ready() {
      return this.$store.getters["gateway/isReady"];
    },
    getRole(node) {
      // don't show a role if the user is not an operator or contributor
      let role = "";
      const opAddress = node.operator_address;
      if (node.operator_address === this.our_address) {
        role = "strings.operator";
      } else if (node.ourContributionAmount && opAddress !== this.our_address) {
        role = "strings.contributor";
      }
      return this.$t(role);
    },
    getNumContributors(node) {
      return node.contributors.length;
    },
    getMinContribution(node) {
      // This is calculated in the same way it is calculated on the LokiBlocks site
      const openContributionRemaining =
        node.staking_requirement > node.total_reserved ? node.staking_requirement - node.total_reserved : 0;
      const minContributionAtomicUnits =
        !node.funded && node.contributors.length < MAX_NUMBER_OF_CONTRIBUTORS
          ? openContributionRemaining / (MAX_NUMBER_OF_CONTRIBUTORS - node.contributors.length)
          : 0;
      const minContributionLoki = minContributionAtomicUnits / 1e9;
      // ceiling to 4 decimal places
      return minContributionLoki.toFixed(4);
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
