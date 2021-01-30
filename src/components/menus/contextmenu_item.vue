<template>
  <q-item v-close-popup clickable @click.native="clickedItem($event)">
    <q-item-section>
      {{ $t(i18n) }}
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "ContextMenuItem",
  props: {
    action: {
      type: String,
      required: true
    },
    i18n: {
      type: String,
      required: true
    }
  },
  methods: {
    clickedItem(event) {
      this.$emit("clicked", event);
    }
  }
};
</script>

<style></style>
