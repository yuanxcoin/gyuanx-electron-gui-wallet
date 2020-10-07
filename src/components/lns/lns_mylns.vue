<template>
  <div class="my-lns">
    <div class="q-px-md q-pt-md">
      <div class="q-mb-lg description">
        {{ $t("strings.myLnsDescription") }}
      </div>
      <LNSRecords />
    </div>
  </div>
</template>

<script>
import LNSRecords from "./lns_records";

export default {
  name: "MyLNS",
  components: {
    LNSRecords
  }
};
</script>

<style lang="scss">
.my-lns {
  .description {
    white-space: pre-line;
  }
}
</style>
