<template>
  <q-page class="send">
    <template v-if="view_only">
      <div class="q-pa-md">
        {{ $t("strings.viewOnlyMode") }}
      </div>
    </template>
    <template v-else>
      <div class="q-pa-md">
        <div class="row gutter-md">
          <!-- Amount -->
          <div class="col-6 amount">
            <GyuanxField
              :label="$t('fieldLabels.amount')"
              :error="$v.newTx.amount.$error"
            >
              <q-input
                v-model="newTx.amount"
                type="number"
                min="0"
                :max="unlocked_balance / 1e12"
                placeholder="0"
                borderless
                dense
                @blur="$v.newTx.amount.$touch"
              />
              <q-btn
                color="primary"
                @click="newTx.amount = unlocked_balance / 1e12"
              >
                {{ $t("buttons.all") }}
              </q-btn>
            </GyuanxField>
          </div>

          <!-- Priority -->
          <div class="col-6 priority">
            <GyuanxField :label="$t('fieldLabels.priority')">
              <q-select
                v-model="newTx.priority"
                emit-value
                map-options
                :options="priorityOptions"
                borderless
                dense
              />
            </GyuanxField>
          </div>
        </div>

        <!-- Address -->
        <div class="col q-mt-sm">
          <GyuanxField
            :label="$t('fieldLabels.address')"
            :error="$v.newTx.address.$error"
          >
            <q-input
              v-model.trim="newTx.address"
              :placeholder="address_placeholder"
              borderless
              dense
              @blur="$v.newTx.address.$touch"
            />
            <q-btn color="primary" to="addressbook">
              {{ $t("buttons.contacts") }}
            </q-btn>
          </GyuanxField>
        </div>

        <!-- Notes -->
        <div class="col q-mt-sm">
          <GyuanxField :label="$t('fieldLabels.notes')" optional>
            <q-input
              v-model="newTx.note"
              class="full-width text-area-gyuanx"
              type="textarea"
              :placeholder="$t('placeholders.transactionNotes')"
              borderless
              dense
            />
          </GyuanxField>
        </div>

        <q-checkbox
          v-model="newTx.address_book.save"
          :label="$t('strings.saveToAddressBook')"
        />
        <div v-if="newTx.address_book.save">
          <GyuanxField :label="$t('fieldLabels.name')" optional>
            <q-input
              v-model="newTx.address_book.name"
              :placeholder="$t('placeholders.addressBookName')"
              borderless
              dense
            />
          </GyuanxField>
          <GyuanxField class="q-mt-sm" :label="$t('fieldLabels.notes')" optional>
            <q-input
              v-model="newTx.address_book.description"
              type="textarea"
              class="full-width text-area-gyuanx"
              rows="2"
              :placeholder="$t('placeholders.additionalNotes')"
              borderless
              dense
            />
          </GyuanxField>
        </div>
        <!-- div required so the button falls below the checkbox -->
        <div>
          <q-btn
            class="send-btn"
            :disable="!is_able_to_send"
            color="primary"
            :label="$t('buttons.send')"
            @click="send()"
          />
        </div>
      </div>
      <ConfirmTransactionDialog
        :show="confirmTransaction"
        :amount="confirmFields.totalAmount"
        :is-blink="confirmFields.isBlink"
        :send-to="confirmFields.destination"
        :fee="confirmFields.totalFees"
        :on-confirm-transaction="onConfirmTransaction"
        :on-cancel-transaction="onCancelTransaction"
      />
      <q-inner-loading :showing="tx_status.sending">
        <q-spinner color="primary" size="30" />
      </q-inner-loading>
    </template>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
import { required, decimal } from "vuelidate/lib/validators";
import { address, greater_than_zero } from "src/validators/common";
import GyuanxField from "components/gyuanx_field";
import WalletPassword from "src/mixins/wallet_password";
import ConfirmDialogMixin from "src/mixins/confirm_dialog_mixin";
import ConfirmTransactionDialog from "components/confirm_tx_dialog";
const objectAssignDeep = require("object-assign-deep");

// the case for doing nothing on a tx_status update
const DO_NOTHING = 10;

export default {
  components: {
    GyuanxField,
    ConfirmTransactionDialog
  },
  mixins: [WalletPassword, ConfirmDialogMixin],
  data() {
    let priorityOptions = [
      { label: this.$t("strings.priorityOptions.blink"), value: 5 }, // Blink
      { label: this.$t("strings.priorityOptions.slow"), value: 1 } // Slow
    ];
    return {
      newTx: {
        amount: 0,
        address: "",
        priority: priorityOptions[0].value,
        address_book: {
          save: false,
          name: "",
          description: ""
        }
      },
      priorityOptions: priorityOptions,
      confirmFields: {
        isBlink: false,
        totalAmount: -1,
        destination: "",
        totalFees: 0
      }
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    view_only: state => state.gateway.wallet.info.view_only,
    unlocked_balance: state => state.gateway.wallet.info.unlocked_balance,
    tx_status: state => state.gateway.tx_status,
    is_ready() {
      return this.$store.getters["gateway/isReady"];
    },
    is_able_to_send() {
      return this.$store.getters["gateway/isAbleToSend"];
    },
    address_placeholder(state) {
      const wallet = state.gateway.wallet.info;
      const prefix = (wallet && wallet.address && wallet.address[0]) || "L";
      return `${prefix}..`;
    },
    confirmTransaction: state => state.gateway.tx_status.code === 1
  }),
  validations: {
    newTx: {
      amount: {
        required,
        decimal,
        greater_than_zero
      },
      address: {
        required,
        isAddress(value) {
          if (value === "") return true;

          return new Promise(resolve => {
            address(value, this.$gateway)
              .then(() => resolve(true))
              .catch(() => resolve(false));
          });
        }
      }
    }
  },
  watch: {
    tx_status: {
      handler(val, old) {
        if (val.code == old.code) return;
        const { code, message } = val;
        switch (code) {
          // the "nothing", so we can update state without doing anything
          // in particular
          case DO_NOTHING:
            break;
          case 1:
            this.buildDialogFieldsSend(val);
            break;
          case 0:
            this.$q.notify({
              type: "positive",
              timeout: 1000,
              message
            });
            this.$v.$reset();
            this.newTx = {
              amount: 0,
              address: "",
              priority: this.priorityOptions[0].value,
              address_book: {
                save: false,
                name: "",
                description: ""
              },
              note: ""
            };
            break;
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
    $route(to) {
      if (to.path == "/wallet/send" && to.query.hasOwnProperty("address")) {
        this.autoFill(to.query);
      }
    }
  },
  mounted() {
    if (
      this.$route.path == "/wallet/send" &&
      this.$route.query.hasOwnProperty("address")
    ) {
      this.autoFill(this.$route.query);
    }
  },
  methods: {
    autoFill: function(info) {
      this.newTx.address = info.address;
    },
    buildDialogFieldsSend(txData) {
      // build using mixin method
      this.confirmFields = this.buildDialogFields(txData);
    },
    onConfirmTransaction() {
      // put the loading spinner up
      this.$store.commit("gateway/set_tx_status", {
        code: DO_NOTHING,
        message: "Getting transaction information",
        sending: true
      });
      const { name, description, save } = this.newTx.address_book;
      const addressSave = {
        address: this.newTx.address,
        address_book: {
          description,
          name,
          save
        }
      };

      const note = this.newTx.note;
      const isBlink = this.confirmFields.isBlink;

      const relayTxData = {
        isBlink,
        addressSave,
        note,
        // you may be sending all (which calls sweep_all RPC), but this refers to
        // if the relay is coming from "sweep all" on the SN tab
        isSweepAll: false
      };

      // Commit the transaction
      this.$gateway.send("wallet", "relay_tx", relayTxData);
    },
    onCancelTransaction() {
      this.$store.commit("gateway/set_tx_status", {
        code: DO_NOTHING,
        message: "Cancel the transaction from confirm dialog",
        sending: false
      });
    },

    async send() {
      this.$v.newTx.$touch();

      if (this.newTx.amount < 0) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.negativeAmount")
        });
        return;
      } else if (this.newTx.amount == 0) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.zeroAmount")
        });
        return;
      } else if (this.newTx.amount > this.unlocked_balance / 1e12) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.notEnoughBalance")
        });
        return;
      } else if (this.$v.newTx.amount.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidAmount")
        });
        return;
      }

      if (this.$v.newTx.address.$error) {
        this.$q.notify({
          type: "negative",
          timeout: 1000,
          message: this.$t("notification.errors.invalidAddress")
        });
        return;
      }

      // must wait for the dialog to be returned
      let passwordDialog = await this.showPasswordConfirmation({
        title: this.$t("dialog.transfer.title"),
        noPasswordMessage: this.$t("dialog.transfer.message"),
        ok: {
          label: this.$t("dialog.transfer.ok"),
          color: "primary"
        }
      });
      passwordDialog
        .onOk(password => {
          password = password || "";
          this.$store.commit("gateway/set_tx_status", {
            code: DO_NOTHING,
            message: "Getting transaction information",
            sending: true
          });
          const newTx = objectAssignDeep.noMutate(this.newTx, {
            password
          });

          this.$gateway.send("wallet", "transfer", newTx);
        })
        .onDismiss(() => {})
        .onCancel(() => {});
    }
  }
};
</script>

<style lang="scss">
.send {
  .send-btn {
    margin-top: 6px;
    width: 200px;
  }
}

.amount {
  padding-right: 10px;
}

.priority {
  padding-left: 10px;
}
</style>
