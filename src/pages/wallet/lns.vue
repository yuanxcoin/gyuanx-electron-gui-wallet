<template>
  <q-page class="lns-page">
    <div class="header row items-center justify-center q-pt-md">
      <q-btn-toggle
        v-model="screen"
        toggle-color="primary"
        color="secondary"
        :options="[
          {
            label: $t('titles.lns.purchase'),
            value: 'purchase'
          },
          {
            label: $t('titles.lns.myLns'),
            value: 'my_lns'
          }
        ]"
      />
    </div>
    <LNSPurchase v-if="screen === 'purchase'" ref="purchase" />
    <MyLNS v-if="screen === 'my_lns'" @onUpdate="onUpdate" />
  </q-page>
</template>

<script>
import LNSPurchase from "components/lns/lns_purchase";
import MyLNS from "components/lns/lns_mylns";
import Vue from "vue";

export default {
  components: {
    MyLNS,
    LNSPurchase
  },
  data() {
    return {
      screen: "purchase"
    };
  },
  methods: {
    // if update is clicked from the list, we need to emit the event
    // upwards to here
    onUpdate(record) {
      console.log("on Update in LNS page called");
      console.log(record);
      // remove the .loki at the end if it's been added

      if (record.type === "lokinet") {
        // The UI expects no ".loki" extension
        record.name = record.name.slice(0, -5);
        record.value = record.value.slice(0, -5);
      }
      this.screen = "purchase";
      // refs are not dynamic, so let the purchase tab render
      // then we can call the ref method
      Vue.nextTick().then(() => {
        console.log(this.$refs);
        this.$refs.purchase.startUpdating(record);
      });
    }
  }
};
</script>

<style lang="scss"></style>
