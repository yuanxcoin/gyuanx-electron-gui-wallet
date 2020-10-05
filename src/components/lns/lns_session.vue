<template>
  <div>
    <LNSInput ref="input" />
    <LNSRecordList @onUpdate="onUpdate" />
  </div>
</template>

<script>
import LNSInput from "./lns_input";
import LNSRecordList from "./lns_record_list";
export default {
  name: "LNSSession",
  components: {
    LNSInput,
    LNSRecordList
  },
  methods: {
    onUpdate(record) {
      this.$refs.input.startUpdating(record);
    }
  }
};
</script>
