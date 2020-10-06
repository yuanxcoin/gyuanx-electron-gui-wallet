<template>
  <div>
    <LNSInput ref="input" />
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
    onUpdate(record) {
      this.$refs.input.startUpdating(record);
    }
  }
};
</script>
