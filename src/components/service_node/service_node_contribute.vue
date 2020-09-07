<template>
  <div class="service-node-stake-tab">
    <div class="q-pa-md">
      <div class="q-pb-sm header">
        {{ $t("titles.availableForContribution") }}
      </div>
      <q-list class="service-node-list" no-border />
      <ServiceNodeList
        :service-nodes="awaiting_service_nodes"
        :button-i18n="'STAKE'"
        :button-action="'contribute'"
        :details="details"
        @contribute="contributeToNode"
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
      const awaitingContribution = nodes.filter(isAwaitingContriubtion);
      console.log("here are the service nodes from state");
      console.log(awaitingContribution);
      return awaitingContribution;
    }
  }),
  methods: {
    contributeToNode(node) {
      console.log("calling contribute to node with key");
      const key = node.service_node_pubkey;
      console.log(key);
      // close the popup if it's open
      this.$refs.serviceNodeDetailsContribute.isVisible = false;
      this.$emit("contribute", key);
    },
    details(node) {
      console.log("Details being called");
      this.$refs.serviceNodeDetailsContribute.isVisible = true;
      this.$refs.serviceNodeDetailsContribute.node = node;
    }
  }
};
</script>

<style></style>
