<template>
  <q-dialog v-model="show" persistent>
    <q-card class="signature-dialog">
      <q-card-section>
        <div class="text-h6">{{ $t("dialog.signature.title") }}</div>
        <div>
          {{ $t("dialog.signature.message") }}
        </div>
      </q-card-section>
      <q-card-section class="info">
        <q-item class="signature row">
          <div class="col">
            <q-item-label class="labels">{{
              $t("fieldLabels.signature")
            }}</q-item-label>
            {{ signature }}
          </div>
          <div class="col-auto">
            <q-btn
              color="primary"
              icon="file_copy"
              size="sm"
              padding="xs"
              style="width: 100%; margin-top: 16px"
              @click="onCopySignature"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                :offset="[5, 10]"
              >
                {{ $t("buttons.copySignature") }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-item>
        <q-item class="row unsigned-data">
          <div class="col">
            <q-item-label class="labels">{{
              $t("fieldLabels.data")
            }}</q-item-label>
            {{ unsignedData }}
          </div>
          <div class="col-auto">
            <q-btn
              color="primary"
              icon="file_copy"
              size="sm"
              padding="xs"
              style="width: 100%; margin-top: 16px"
              @click="onCopyUnsignedData"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                :offset="[5, 10]"
              >
                {{ $t("buttons.copyData") }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-item>
        <q-item class="row address">
          <div class="col">
            <q-item-label class="labels">{{
              $t("fieldLabels.address")
            }}</q-item-label>
            {{ address }}
          </div>
          <div class="col-auto">
            <q-btn
              color="primary"
              class="vertical-middle"
              icon="file_copy"
              size="sm"
              style="width: 100%; margin-top: 16px"
              padding="xs"
              @click="onCopyAddress"
            >
              <q-tooltip
                anchor="center left"
                self="center right"
                :offset="[5, 10]"
              >
                {{ $t("buttons.copyAddress") }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-item>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat :label="$t('buttons.close')" @click="onClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "SignatureDialog",
  props: {
    onCopySignature: {
      type: Function,
      required: true
    },
    onCopyAddress: {
      type: Function,
      required: true
    },
    onCopyUnsignedData: {
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
    },
    address: {
      type: String,
      required: true
    },
    unsignedData: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.info {
  flex: 1;
  word-break: break-all;
  word-wrap: break-word;

  .labels {
    font-weight: bold;
    margin-bottom: 4px;
  }
}
</style>
