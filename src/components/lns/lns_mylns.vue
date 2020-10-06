<template>
  <div class="my-lns">
    <div class="q-px-md q-pt-md">
      <div class="q-mb-lg description">
        {{ $t("strings.myLnsDescription") }}
      </div>
      <LNSRecordList />
    </div>
  </div>
</template>

<script>
import LNSRecordList from "./lns_record_list";

export default {
  name: "MyLNS",
  components: {
    LNSRecordList
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
