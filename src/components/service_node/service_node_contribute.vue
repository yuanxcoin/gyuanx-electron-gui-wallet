<template>
  <div class="service-node-stake-tab">
    <div class="q-pa-md">
      <div class="q-pb-sm header">
        {{ $t("titles.availableForContribution") }}
      </div>
      <!-- <q-list class="service-node-list" no-border /> -->
      <!-- use placeholder i18n here -->
      <p>There is a maximum of 4 contributors per service node.</p>
      <ServiceNodeList
        :service-nodes="awaiting_service_nodes"
        :button-i18n="'STAKE'"
        :details="details"
        :action="contributeToNode"
      />
    </div>
    <ServiceNodeDetails ref="serviceNodeDetailsContribute" :action="contributeToNode" action-i18n="buttons.stake" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ServiceNodeList from "./service_node_list";
import ServiceNodeDetails from "./service_node_details";
export default {
  name: "ServiceNodeContribute",
  components: {
    ServiceNodeList,
    ServiceNodeDetails
  },
  data() {
    return {};
  },
  computed: mapState({
    awaiting_service_nodes(state) {
      const nodes = state.gateway.daemon.service_nodes;
      console.log(nodes);
      const isAwaitingContriubtion = node => !node.active && !node.funded;
      const compareFee = (n1, n2) => (this.getFeeDecimal(n1) > this.getFeeDecimal(n2) ? 1 : -1);
      const awaitingContributionNodes = nodes.filter(isAwaitingContriubtion).map(n => {
        return {
          ...n,
          awaitingContribution: true
        };
      });
      awaitingContributionNodes.sort(compareFee);
      console.log("here are the service nodes from state");
      return awaitingContributionNodes;
    }
  }),
  methods: {
    getFeeDecimal(node) {
      const operatorPortion = node.portions_for_operator;
      return (operatorPortion / 18446744073709551612) * 100;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    contributeToNode(node, event) {
      // stop detail page from popping up
      event.stopPropagation();
      this.scrollToTop();
      console.log("calling contribute to node with key");
      const key = node.service_node_pubkey;
      const minContribution = node.minContribution;
      console.log(key);
      console.log(minContribution);
      // close the popup if it's open
      this.$refs.serviceNodeDetailsContribute.isVisible = false;
      this.$emit("contribute", key, minContribution);
    },
    details(node) {
      console.log("Details contribute being called");
      this.$refs.serviceNodeDetailsContribute.isVisible = true;
      this.$refs.serviceNodeDetailsContribute.node = node;
    }
  }
};
</script>

<style></style>
