<template>
  <div class="lns-purchase">
    <div class="q-mb-lg q-px-md q-pt-md">
      <div class="description">
        {{ $t("strings.lnsPurchaseDescription") }}
      </div>

      <LNSInput ref="input" />
    </div>
  </div>
</template>

<script>
import LNSInput from "./lns_input";
export default {
  name: "LNSPurchase",
  components: {
    LNSInput
  },
  methods: {
    startUpdating(record) {
      this.$refs.input.startUpdating(record);
    },
    startRenewing(record) {
      this.$refs.input.startRenewing(record);
    }
  }
};
</script>
<style lang="scss">
.lns-purchase {
  .description {
    white-space: pre-line;
    color: #cecece;
  }
}
</style>
