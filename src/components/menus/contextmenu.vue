<template>
  <q-menu context-menu>
    <q-list separator class="context-menu-list">
      <div v-for="(item, index) in menuItems" :key="index">
        <ContextMenuItem :action="item.action" :i18n="item.i18n" @clicked="clickedMenu(item)" />
      </div>
    </q-list>
  </q-menu>
</template>

<script>
import ContextMenuItem from "./contextmenu_item";

export default {
  name: "ContextMenu",
  components: {
    ContextMenuItem
  },
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    clickedMenu(item) {
      this.$emit(item.action);
    }
  }
};
</script>

<style>
.context-menu-list {
  min-width: 150px;
  max-height: 300px;
  color: white;
}
</style>
