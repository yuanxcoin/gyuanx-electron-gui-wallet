<template>
  <div class="lns-input-form">
    <!-- Type -->
    <div class="col q-mt-sm">
      <LokiField :label="$t('fieldLabels.lnsType')" :disable="updating">
        <q-select
          v-model.trim="record.type"
          emit-value
          map-options
          :options="renewing ? lokinetOptions : typeOptions"
          :dark="theme == 'dark'"
          :disable="updating"
          borderless
          dense
        />
      </LokiField>
    </div>
    <!-- Name -->
    <div class="col q-mt-sm">
      <LokiField
        :label="$t('fieldLabels.name')"
        :disable="disableName"
        :error="$v.record.name.$error"
      >
        <q-input
          v-model.trim="record.name"
          :dark="theme == 'dark'"
          :placeholder="$t('placeholders.lnsName')"
          :disable="disableName"
          borderless
          dense
          :suffix="record.type === 'session' ? '' : '.loki'"
          @blur="$v.record.name.$touch"
        />
      </LokiField>
    </div>

    <!-- Value (Session ID, Wallet Address or .loki address) -->
    <div class="col q-mt-sm">
      <LokiField
        class="q-mt-md"
        :label="value_field_label"
        :error="$v.record.value.$error"
      >
        <q-input
          v-model.trim="record.value"
          :dark="theme == 'dark'"
          :placeholder="value_placeholder"
          borderless
          dense
          :disable="renewing"
          :suffix="record.type === 'session' ? '' : '.loki'"
          @blur="$v.record.value.$touch"
        />
      </LokiField>
    </div>

    <!-- Owner -->
    <div class="col q-mt-sm">
      <LokiField
        class="q-mt-md"
        :label="$t('fieldLabels.owner')"
        :error="$v.record.owner.$error"
        optional
      >
        <q-input
          v-model.trim="record.owner"
          :dark="theme == 'dark'"
          :placeholder="owner_placeholder"
          borderless
          dense
          :disable="renewing"
          @blur="$v.record.owner.$touch"
        />
      </LokiField>
    </div>

    <!-- Backup owner -->
    <div class="col q-mt-sm">
      <LokiField
        class="q-mt-md"
        :label="$t('fieldLabels.backupOwner')"
        :error="$v.record.backup_owner.$error"
        optional
      >
        <q-input
          v-model.trim="record.backup_owner"
          :dark="theme == 'dark'"
          :placeholder="$t('placeholders.lnsBackupOwner')"
          :disable="renewing"
          borderless
          dense
          @blur="$v.record.backup_owner.$touch"
        />
      </LokiField>
    </div>
    <div class="buttons">
      <q-btn
        :disable="!is_able_to_send || disableSubmitButton || !can_update"
        color="primary"
        :label="submitLabel"
        @click="submit()"
      />
      <q-btn
        v-if="showClearButton"
        color="secondary"
        :label="$t('buttons.clear')"
        @click="clear()"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import {
  address,
  session_id,
  lokinet_address,
  lokinet_name,
  session_name
} from "src/validators/common";
import LokiField from "components/loki_field";
import WalletPassword from "src/mixins/wallet_password";

export default {
  name: "LNSInputForm",
  components: {
    LokiField
  },
  mixins: [WalletPassword],
  props: {
    submitLabel: {
      type: String,
      required: true
    },
    updating: {
      type: Boolean,
      required: true
    },
    renewing: {
      type: Boolean,
      required: false,
      default: false
    },
    disableType: {
      type: Boolean,
      required: false,
      default: false
    },
    disableName: {
      type: Boolean,
      required: false,
      default: false
    },
    showClearButton: {
      type: Boolean,
      required: false,
      default: false
    },
    disableSubmitButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    let sessionOptions = [
      { label: this.$t("strings.lns.sessionID"), value: "session" }
    ];
    let lokinetOptions = [
      { label: this.$t("strings.lns.lokinetName1Year"), value: "lokinet_1y" },
      {
        label: this.$t("strings.lns.lokinetNameXYears", { years: 2 }),
        value: "lokinet_2y"
      },
      {
        label: this.$t("strings.lns.lokinetNameXYears", { years: 5 }),
        value: "lokinet_5y"
      },
      {
        label: this.$t("strings.lns.lokinetNameXYears", { years: 10 }),
        value: "lokinet_10y"
      }
    ];
    let typeOptions = [...sessionOptions, ...lokinetOptions];

    const initialRecord = {
      // Lokinet 1 year is valid on renew or purchase
      type: typeOptions[1].value,
      name: "",
      value: "",
      owner: "",
      backup_owner: ""
    };
    return {
      record: { ...initialRecord },
      typeOptions,
      lokinetOptions
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    our_address: state => state.gateway.wallet.info.address,
    is_able_to_send() {
      return this.$store.getters["gateway/isAbleToSend"];
    },
    value_field_label() {
      if (this.record.type === "session") {
        return this.$t("fieldLabels.sessionId");
      } else {
        return this.$t("fieldLabels.lokinetFullAddress");
      }
    },
    can_update() {
      // if we are on update screen and there have been no changes, then not allowed
      // to click "update"
      if (this.updating === true) {
        const isOwnerDifferent =
          this.record.owner !== "" &&
          this.record.owner !== this.initialRecord.owner;
        const isBackupOwnerDifferent =
          this.record.backup_owner !== "" &&
          this.record.backup_owner !== this.initialRecord.backup_owner;
        const isValueDifferent = this.record.value !== this.initialRecord.value;
        const different =
          isOwnerDifferent || isBackupOwnerDifferent || isValueDifferent;
        return different;
      }
      return true;
    },
    value_placeholder() {
      if (this.record.type === "session") {
        return this.$t("placeholders.sessionId");
      } else {
        return this.$t("placeholders.lokinetFullAddress");
      }
    },
    owner_placeholder() {
      const { owner } = this.initialRecord || {};
      if (!owner || owner.trim() === "") {
        return this.our_address;
      }

      return owner;
    },
    cleanRecord() {
      return {
        type: "session",
        name: "",
        value: "",
        owner: "",
        backup_owner: ""
      };
    }
  }),
  methods: {
    setRecord(record) {
      this.initialRecord = {
        ...this.cleanRecord,
        ...(record || {})
      };
      this.record = { ...this.initialRecord };
    },
    isAddress: function(value) {
      if (value === "") return true;

      return new Promise(resolve => {
        address(value, this.$gateway)
          .then(() => resolve(true))
          .catch(() => resolve(false));
      });
    },
    reset() {
      this.initialRecord = { ...this.cleanRecord };
      this.record = { ...this.cleanRecord };
      this.$v.$reset();
    },
    submit() {
      this.$v.record.$touch();

      const nameValidator = this.$v.record.name;
      if (nameValidator.$error) {
        let message;
        if (!nameValidator.required) {
          message = "notification.errors.enterName";
        } else if (!nameValidator.maxLength) {
          message = "notification.errors.invalidNameLength";
        } else if (!nameValidator.hyphen) {
          message = "notification.errors.invalidNameHypenNotAllowed";
        } else {
          message = "notification.errors.invalidNameFormat";
        }

        this.$q.notify({
          type: "negative",
          timeout: 3000,
          message: this.$t(message)
        });
        return;
      }

      if (this.$v.record.value.$error) {
        let message = "Invalid value provided";
        if (this.record.type === "session") {
          message = this.$t("notification.errors.invalidSessionId");
        }
        this.$q.notify({
          type: "negative",
          timeout: 3000,
          message
        });
        return;
      }

      if (this.$v.record.backup_owner.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 3000,
          message: this.$t("notification.errors.invalidBackupOwner")
        });
        return;
      }

      if (this.$v.record.owner.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 3000,
          message: this.$t("notification.errors.invalidOwner")
        });
        return;
      }
      // The validators validate on lowercase, need to submit as lowercase too
      const submitRecord = {
        ...this.record,
        name: this.record.name.toLowerCase(),
        value: this.record.value.toLowerCase()
      };
      // Send up the submission with the record
      this.$emit("onSubmit", submitRecord);
    },
    clear() {
      this.$emit("onClear");
    }
  },
  validations: {
    record: {
      name: {
        required,
        maxLength: maxLength(64),
        hyphen: function(value) {
          let str = value || "";
          return !(str.startsWith("-") || str.endsWith("-"));
        },
        validate: function(value) {
          const _value = value.toLowerCase();
          if (this.record.type === "session") {
            return session_name(_value);
          } else {
            // shortened lokinet LNS name
            return lokinet_name(_value);
          }
        }
      },
      owner: {
        validate: function(value) {
          return this.isAddress(value);
        }
      },
      value: {
        required,
        validate: function(value) {
          const _value = value.toLowerCase();
          if (this.record.type === "session") {
            return session_id(_value);
          } else {
            // full lokinet address
            return lokinet_address(_value);
          }
        }
      },
      backup_owner: {
        validate: function(value) {
          return this.isAddress(value);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.lns-input-form {
  .buttons {
    margin-top: 6px;

    .q-btn:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
