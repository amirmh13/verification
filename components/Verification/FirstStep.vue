<template>
  <v-form v-model="formStepIsValidate" @submit.prevent="setPersonalInfo">
    <v-row>
      <v-col
        v-for="(entity, index) in verificationPersonalInfoFormEntities"
        :key="index"
        cols="12"
        lg="6"
      >
        <component
          :is="entity.type"
          v-model="verificationPersonalInfoDTO[entity.key]"
          :label="entity.title"
          color="primary"
          :rules="entity.rules"
        ></component>
      </v-col>
    </v-row>

    <v-row justify="center" class="my-8">
      <v-col cols="6" lg="2">
        <v-btn color="primary" class="tw-w-full" type="submit">
          ثبت اطلاعات
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import {
  VerificationPersonalInfoDTO,
  VerificationFormEntity,
} from "~~/models";
import { required, nationalCode, phoneNumber } from "@/utils/validation-rules";
import { useVerificationStore } from "~~/store/verification";

const formStepIsValidate = ref<boolean | null>(null);
const verificationPersonalInfoDTO = reactive<VerificationPersonalInfoDTO>({
  firstName: "",
  lastName: "",
  mobile: null,
  nationalCode: null,
  address: "",
});
const verificationPersonalInfoFormEntities = ref<
VerificationFormEntity<VerificationPersonalInfoDTO>[]
>([
  { title: "نام", key: "firstName", type: "v-text-field", rules: [required()] },
  {
    title: "نام خانوادگی",
    key: "lastName",
    type: "v-text-field",
    rules: [required()],
  },
  {
    title: "شماره همراه",
    key: "mobile",
    type: "v-text-field",
    rules: [required(), phoneNumber()],
  },
  {
    title: "کد ملی",
    key: "nationalCode",
    type: "v-text-field",
    rules: [required(), nationalCode()],
  },
  { title: "آدرس", key: "address", type: "v-textarea", rules: [required()] },
]);

const { setVerificationPersonalInfo } = useVerification();
const { nextStep, showSnackbar } = useVerificationStore();

/**
 * Set user verification personal info API call
 */
const setPersonalInfo = async () => {
  if (!formStepIsValidate.value) return;

  try {
    await setVerificationPersonalInfo();

    showSnackbar();
    formStepIsValidate.value = null;
    nextStep();
  } catch (error) {
    console.error(error);
  }
};
</script>
