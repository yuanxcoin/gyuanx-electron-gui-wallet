<template>
  <div class="my-lns">
    <div class="q-px-md q-pt-md">
      <div class="description">
        {{ $t("strings.lnsDescription") }}
      </div>
      <LNSRecords @onUpdate="onUpdate" @onRenew="onRenew" />
    </div>
  </div>
</template>

<script>
import LNSRecords from "./lns_records";

export default {
  name: "MyLNS",
  components: {
    LNSRecords
  },
  methods: {
    onUpdate(record) {
      this.$emit("onUpdate", record);
    },
    onRenew(record) {
      this.$emit("onRenew", record);
    }
  }
};
</script>

<style lang="scss">
.my-lns {
  .description {
    white-space: pre-line;
    color: #cecece;
    margin-bottom: 8px;
  }
}
</style>
