<template>
  <q-item v-close-popup clickable @click.native="clickedItem">
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
    clickedItem() {
      this.$emit("clicked");
    }
  }
};
</script>

<style></style>
