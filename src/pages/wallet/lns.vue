<template>
  <q-page class="lns-page">
    <div class="header row items-center justify-center q-pt-md">
      <q-btn-toggle
        v-model="screen"
        toggle-color="primary"
        color="secondary"
        :options="[
          {
            label: $t('titles.lns.sessionId'),
            value: 'sessionId'
          },
          {
            label: $t('titles.lns.lokinetName'),
            value: 'lokinetName'
          }
        ]"
      />
    </div>
    <LNSSession v-if="screen === 'sessionId'" />
    <LNSLokinet v-if="screen === 'lokinetName'" />
  </q-page>
</template>

<script>
import LNSSession from "components/lns/lns_session";
import LNSLokinet from "components/lns/lns_lokinet";

export default {
  components: {
    LNSSession,
    LNSLokinet
  },
  data() {
    return {
      screen: "sessionId"
    };
  }
};
</script>

<style lang="scss"></style>
