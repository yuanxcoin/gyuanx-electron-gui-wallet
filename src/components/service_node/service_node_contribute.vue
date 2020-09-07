<template>
  <div class="service-node-stake-tab">
    <div class="q-pa-md">
      <div class="q-pb-sm header">
        {{ $t("titles.availableForContribution") }}
      </div>
      <!-- use placeholder with the i18n here -->
      <div class="row align-items full-width">
        <!-- <div class="col-md-8"> -->
        <p>There is a limit of 4 contributors per service node.</p>
        <!-- </div> -->
        <!-- <div class="col-md-4"> -->
        <q-btn class="right float-right" color="primary" label="REFRESH" @click="update_service_node_list" />
        <!-- </div> -->
      </div>
      <ServiceNodeList
        :service-nodes="awaiting_service_nodes"
        button-i18n="buttons.stake"
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
  computed: mapState({
    awaiting_service_nodes(state) {
      const nodes = state.gateway.daemon.service_nodes;
      const isAwaitingContribution = node => !node.active && !node.funded && node.requested_unlock_height === 0;
      const compareFee = (n1, n2) => (this.getFeeDecimal(n1) > this.getFeeDecimal(n2) ? 1 : -1);
      const awaitingContributionNodes = nodes.filter(isAwaitingContribution).map(n => {
        return {
          ...n,
          awaitingContribution: true
        };
      });
      awaitingContributionNodes.sort(compareFee);
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
      const key = node.service_node_pubkey;
      const minContribution = node.minContribution;
      // close the popup if it's open
      this.$refs.serviceNodeDetailsContribute.isVisible = false;
      this.$emit("contribute", key, minContribution);
      this.$q.notify({
        type: "positive",
        timeout: 1000,
        // translate
        message: "Service node key and min amount filled"
      });
    },
    details(node) {
      this.$refs.serviceNodeDetailsContribute.isVisible = true;
      this.$refs.serviceNodeDetailsContribute.node = node;
    },
    update_service_node_list() {
      console.log("update service node list button clicked");
      this.$gateway.send("wallet", "update_service_node_list");
    }
  }
};
</script>

<style></style>
