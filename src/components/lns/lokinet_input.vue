<template>
  <div class="lokinet-input">
    <div class="q-px-md q-pt-md">
      <div class="q-mb-lg description">
        {{ $t("strings.lokinetDescription") }}
      </div>
      <!-- <LNSInputForm
        ref="form"
        :submit-label="submit_label"
        :disable-name="updating"
        :show-clear-button="updating"
        :disable-submit-button="disable_submit_button"
        @onSubmit="onSubmit"
        @onClear="onClear"
      /> -->
      <!-- <q-inner-loading :showing="lns_status.sending" :dark="theme == 'dark'">
        <q-spinner color="primary" size="30" />
      </q-inner-loading> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "LokinetInput"
};
</script>

<style></style>
