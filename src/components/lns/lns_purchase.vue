<template>
  <div class="lns-purchase">
    <div class="q-mb-lg q-px-md q-pt-md">
      <div class="description">
        {{ $t("strings.lnsPurchaseDescription") }}
      </div>
      <div class="prices">
        {{ $t("strings.lns.prices") }}
        <table>
          <tr>
            <td>{{ $t("strings.lns.sessionID") }}:</td>
            <td>15 LOKI</td>
          </tr>
          <tr>
            <td>{{ $t("strings.lns.lokinetName1Year") }}:</td>
            <td>15 LOKI</td>
          </tr>
          <tr>
            <td>{{ $t("strings.lns.lokinetNameXYears", { years: 2 }) }}:</td>
            <td>30 LOKI</td>
          </tr>
          <tr>
            <td>{{ $t("strings.lns.lokinetNameXYears", { years: 5 }) }}:</td>
            <td>60 LOKI</td>
          </tr>
          <tr>
            <td>{{ $t("strings.lns.lokinetNameXYears", { years: 10 }) }}:</td>
            <td>90 LOKI</td>
          </tr>
        </table>
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
    margin-bottom: 20px;
  }

  .prices {
    color: #cecece;
  }
}
</style>
