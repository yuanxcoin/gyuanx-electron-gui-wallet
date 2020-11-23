<template>
  <div class="sign-and-verify">
    <div class="q-pa-md">
      <div class="q-mb-lg description">
        {{ $t("strings.signAndVerifyDescription") }}
      </div>
      <div class="text-h6">Sign</div>
      <div class="row justify-between items-end">
        <LokiField :label="$t('fieldLabels.data')">
          <q-input
            v-model.trim="toSign"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.dataToSign')"
          />
        </LokiField>
        <div class="btn-wrapper q-ml-md q-py-sm">
          <q-btn
            color="primary"
            :label="$t('buttons.sign')"
            :loading="sign_status.sending"
            :disable="!toSign"
            @click="sign()"
          />
        </div>
      </div>
      <div class="verify-heading text-h6">Verify</div>
      <div class="justify-between items-end">
        <LokiField class="q-mt-md" :label="$t('fieldLabels.signature')">
          <q-input
            v-model.trim="signatureToVerify"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.signature')"
          />
        </LokiField>
        <LokiField class="q-mt-md" :label="$t('fieldLabels.data')">
          <q-input
            v-model.trim="unsignedData"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.unsignedData')"
          />
        </LokiField>
        <LokiField class="q-mt-md" :label="$t('fieldLabels.address')">
          <q-input
            v-model.trim="address"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.address')"
          />
        </LokiField>
        <div class="submit-button">
          <q-btn
            color="primary"
            :label="$t('buttons.verify')"
            :disable="!signatureToVerify || !unsignedData || !address"
            @click="verify()"
          />
          <q-btn
            v-if="canClear"
            :label="$t('buttons.clear')"
            color="secondary"
            @click="clear"
          />
        </div>
        <SignatureDialog
          :on-copy="copySignature"
          :on-close="closeDialog"
          :signature="signature"
          :show="!!signature"
        />
      </div>
    </div>
  </div>
</template>

<script>
const { clipboard } = require("electron");
import LokiField from "components/loki_field";
import SignatureDialog from "./signature_dialog";
import { mapState } from "vuex";
export default {
  name: "SignAndVerify",
  components: {
    LokiField,
    SignatureDialog
  },
  data() {
    return {
      toSign: "",
      // entered by the user to verify
      signatureToVerify: "",
      unsignedData: "",
      address: ""
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    sign_status: state => state.gateway.sign_status,
    verify_status: state => state.gateway.verify_status,
    signature: state => state.gateway.sign_status.signature,
    canClear() {
      const canClear =
        this.signatureToVerify !== "" ||
        this.address !== "" ||
        this.unsignedData !== "";
      return canClear;
    }
  }),
  watch: {
    sign_status: {
      handler(val, old) {
        if (val.code == old.code) return;
        const { code, message } = val;
        switch (code) {
          case -1:
            this.$q.notify({
              type: "negative",
              timeout: 3000,
              message
            });
            break;
        }
      },
      deep: true
    },
    verify_status: {
      handler(val, old) {
        if (val.code == old.code) return;
        const { code, message, i18n } = val;
        switch (code) {
          case -1:
            this.$q.notify({
              type: "negative",
              timeout: 3000,
              message: i18n ? this.$t(i18n) : message
            });
            break;
          case 1:
            this.$q.notify({
              type: "positive",
              timeout: 3000,
              message: i18n ? this.$t(i18n) : message
            });
            break;
        }
      },
      deep: true
    }
  },
  methods: {
    sign() {
      this.$gateway.send("wallet", "sign", { data: this.toSign });
    },
    verify() {
      this.$gateway.send("wallet", "verify", {
        address: this.address,
        data: this.unsignedData,
        signature: this.signatureToVerify
      });
    },
    copySignature() {
      clipboard.writeText(this.signature);
      this.$q.notify({
        type: "positive",
        timeout: 2000,
        message: this.$t("notification.positive.signatureCopied")
      });
    },
    closeDialog() {
      this.$store.commit("gateway/set_sign_status", {
        signature: ""
      });
    },
    clear() {
      this.signatureToVerify = "";
      this.unsignedData = "";
      this.address = "";
    }
  }
};
</script>

<style lang="scss">
.description {
  white-space: pre-line;
}
.sign-and-verify {
  .height {
    font-size: 0.9em;
  }
  .q-item {
    cursor: default;
  }

  .loki-field {
    flex: 1;
  }
}

.verify-heading {
  margin-top: 24px;
}

.submit-button {
  .q-btn:not(:first-child) {
    margin-left: 8px;
  }
  margin-bottom: 12px;
}
</style>
