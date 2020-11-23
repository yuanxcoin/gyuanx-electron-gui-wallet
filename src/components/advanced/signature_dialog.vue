<template>
  <q-dialog v-model="show" persistent>
    <q-card dark>
      <q-card-section>
        <div class="text-h6">{{ $t("dialog.signature.title") }}</div>
        <div>
          {{ $t("dialog.signature.message") }}
        </div>
      </q-card-section>
      <q-card-section>
        <p class="signature">{{ signature }}</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$t('buttons.close')" @click="onClose" />
        <q-btn
          :label="$t('buttons.copySignature')"
          color="primary"
          @click="onCopy"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "SignatureDialog",
  props: {
    onCopy: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    signature: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
</script>

<style lang="scss">
.signature {
  flex: 1;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-user-select: all;
  user-select: all;
}
</style>
