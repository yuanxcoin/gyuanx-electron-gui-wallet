<template>
  <q-page class="advanced-page">
    <div class="header row items-center justify-center q-pt-md">
      <q-btn-toggle
        v-model="screen"
        toggle-color="primary"
        color="accent"
        :options="[
          { label: $t('titles.advanced.prove'), value: 'prove' },
          {
            label: $t('titles.advanced.checkTransaction'),
            value: 'check'
          },
          {
            label: $t('titles.advanced.signAndVerify'),
            value: 'signAndVerify'
          }
        ]"
      />
    </div>
    <ProveTransaction v-if="screen === 'prove'" />
    <CheckTransaction v-if="screen === 'check'" />
    <SignAndVerify v-if="screen === 'signAndVerify'" />
  </q-page>
</template>

<script>
import ProveTransaction from "components/advanced/prove_transaction";
import CheckTransaction from "components/advanced/check_transaction";
import SignAndVerify from "components/advanced/sign_and_verify";

export default {
  components: {
    ProveTransaction,
    CheckTransaction,
    SignAndVerify
  },
  data() {
    return {
      screen: "prove"
    };
  }
};
</script>

<style lang="scss"></style>
