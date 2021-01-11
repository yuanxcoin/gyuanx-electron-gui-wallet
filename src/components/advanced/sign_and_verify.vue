<template>
  <div class="sign-and-verify">
    <div class="q-pa-md">
      <div class="q-mb-lg tab-desc">
        {{ $t("strings.signAndVerifyDescription") }}
      </div>
      <div v-if="is_view_only">
        {{ $t("strings.cannotSign") }}
      </div>
      <div v-else>
        <div class="text-h6 header">{{ $t("titles.advanced.sign") }}</div>
        <div class="row justify-between items-end">
          <GyuanxField :label="$t('fieldLabels.data')">
            <q-input
              v-model.trim="toSign"
              :dark="theme == 'dark'"
              borderless
              dense
              :placeholder="$t('placeholders.dataToSign')"
            />
          </GyuanxField>
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
      </div>
      <div class="verify-heading text-h6 header">
        {{ $t("titles.advanced.verify") }}
      </div>
      <div class="justify-between items-end">
        <GyuanxField class="q-mt-md" :label="$t('fieldLabels.signature')">
          <q-input
            v-model.trim="signatureToVerify"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.signature')"
          />
        </GyuanxField>
        <GyuanxField class="q-mt-md" :label="$t('fieldLabels.data')">
          <q-input
            v-model.trim="unsignedData"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.unsignedData')"
          />
        </GyuanxField>
        <GyuanxField class="q-mt-md" :label="$t('fieldLabels.address')">
          <q-input
            v-model.trim="address"
            :dark="theme == 'dark'"
            borderless
            dense
            :placeholder="$t('placeholders.addressOfSigner')"
          />
        </GyuanxField>
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
            color="accent"
            @click="clear"
          />
        </div>
        <SignatureDialog
          :on-copy-signature="copySignature"
          :on-copy-unsigned-data="copyUnsignedData"
          :on-copy-address="copyAddress"
          :on-close="closeDialog"
          :signature="signature"
          :unsigned-data="toSign"
          :address="primary_address"
          :show="!!signature"
        />
      </div>
    </div>
  </div>
</template>

<script>
const { clipboard } = require("electron");
import GyuanxField from "components/gyuanx_field";
import SignatureDialog from "./signature_dialog";
import { mapState } from "vuex";
export default {
  name: "SignAndVerify",
  components: {
    GyuanxField,
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
    primary_address: state => state.gateway.wallet.info.address,
    is_view_only: state => state.gateway.wallet.info.view_only,
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
    // copy from the dialog
    copyUnsignedData() {
      clipboard.writeText(this.toSign);
      this.$q.notify({
        type: "positive",
        timeout: 2000,
        message: this.$t("notification.positive.copied", { item: "Data" })
      });
    },
    copyAddress() {
      clipboard.writeText(this.primary_address);
      this.$q.notify({
        type: "positive",
        timeout: 2000,
        message: this.$t("notification.positive.addressCopied")
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

  .gyuanx-field {
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
