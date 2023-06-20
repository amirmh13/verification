<template>
  <v-form v-model="formStepIsValidate" @submit.prevent="setBankCard">
    <v-row>
      <v-col
        v-for="(entity, index) in verificationBankCardFormEntities"
        :key="index"
        cols="12"
        lg="6"
      >
        <component
          :is="entity.type"
          v-model="verificationBankCardFormEntities[entity.key]"
          :label="entity.title"
          color="primary"
          :rules="entity.rules"
        ></component>
      </v-col>
    </v-row>

    <v-row justify="center" class="my-8">
      <v-col cols="6" lg="2">
        <v-btn color="primary" class="tw-w-full" type="submit">
          ثبت اطلاعات بانک
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useVerificationStore } from "~~/store/verification";
import { VerificationBankCardDTO, VerificationFormEntity } from "~~/models";
import {
  required,
  shebaNumber,
  bankCardNumber,
} from "~~/utils/validation-rules";

const formIsValidate = ref<boolean | null>(null);
const verificationBankCardDTO = reactive<VerificationBankCardDTO>({
  bankCard: "",
  sheba: "",
});

const verificationBankCardFormEntities = ref<
  VerificationFormEntity<VerificationBankCardDTO>[]
>([
  {
    title: "شماره کارت",
    key: "bankCard",
    type: "v-text-field",
    rules: [required(), bankCardNumber()],
  },
  {
    title: "شماره شبا",
    key: "sheba",
    type: "v-text-field",
    rules: [required(), shebaNumber()],
  },
]);

const { uploadIdentityCard } = useVerification();
const { showSnackbar } = useVerificationStore();

const setBankCard = async () => {
  if (!formIsValidate.value) return;

  try {
    await uploadIdentityCard();

    showSnackbar();
  } catch (error) {
    console.error(error);
  }
};
</script>
