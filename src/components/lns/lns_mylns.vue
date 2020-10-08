<template>
  <div class="my-lns">
    <div class="q-px-md q-pt-md">
      <div class="q-mb-lg description">
        {{ $t("strings.lnsDescription") }}
      </div>
      <LNSRecords @onUpdate="onUpdate" />
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
      console.log("MyLNS on update");
      console.log(record);
      this.$emit("onUpdate", record);
    }
  }
};
</script>

<style lang="scss">
.my-lns {
  .description {
    white-space: pre-line;
    color: #cecece;
  }
}
</style>
