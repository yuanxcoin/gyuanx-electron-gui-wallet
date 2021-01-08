<template>
  <q-page class="lns-page">
    <div class="header row items-center justify-center q-pt-md">
      <q-btn-toggle
        v-model="screen"
        toggle-color="primary"
        color="accent"
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
    <MyLNS v-if="screen === 'my_lns'" @onUpdate="onUpdate" @onRenew="onRenew" />
  </q-page>
</template>

<script>
import LNSPurchase from "components/lns/lns_purchase";
import MyLNS from "components/lns/lns_mylns";
import Vue from "vue";
import _ from "lodash";

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
    purchasePageAction(record, action) {
      // don't update the pointer to the record (else it'll update on the records page)
      let recordCopy = _.cloneDeep(record);

      if (record.type === "lokinet" && record.name.endsWith(".loki")) {
        // The UI expects no ".loki" extension
        recordCopy.name = recordCopy.name.slice(0, -5);
        recordCopy.value = recordCopy.value.slice(0, -5);
      }
      this.screen = "purchase";
      // refs are not dynamic, so let the purchase tab render
      // then we can call the ref method
      Vue.nextTick().then(() => {
        this.$refs.purchase[action](recordCopy);
      });
    },
    onUpdate(record) {
      let updateRecord = {
        ...record,
        // Don't pre-fill these fields on update
        value: "",
        owner: "",
        backup_owner: ""
      };
      this.purchasePageAction(updateRecord, "startUpdating");
    },
    onRenew(record) {
      this.purchasePageAction(record, "startRenewing");
    }
  }
};
</script>

<style lang="scss"></style>
