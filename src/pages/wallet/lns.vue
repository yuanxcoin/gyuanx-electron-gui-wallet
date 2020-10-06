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
    <LNSPurchase v-if="screen === 'purchase'" />
    <MyLNS v-if="screen === 'my_lns'" />
  </q-page>
</template>

<script>
import LNSPurchase from "components/lns/lns_purchase";
import MyLNS from "components/lns/lns_mylns";

export default {
  components: {
    MyLNS,
    LNSPurchase
  },
  data() {
    return {
      screen: "purchase"
    };
  }
};
</script>

<style lang="scss"></style>
