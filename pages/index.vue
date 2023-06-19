<template>
  <v-layout class="pa-6">
    <v-container>
      <v-form
        v-if="formStep === FormStep.firstStep"
        v-model="firstStepIsValidate"
        @submit.prevent="setPersonalInfo"
      >
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

      <v-form
        v-if="formStep === FormStep.secondStep"
        v-model="firstStepIsValidate"
        @submit.prevent="uploadFile"
      >
        <v-row>
          <v-col cols="12" lg="6">
            <v-file-input
              v-model="verificationIdentityDTO"
              clearable
              label="تصویر کارت ملی"
              color="primary"
              :rules="[
                (value) => {
                  if (value) return true;

                  return 'First name must be at least 3 characters.';
                },
              ]"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-row justify="center" class="my-8">
          <v-col cols="6" lg="2">
            <v-btn color="primary" class="tw-w-full" type="submit">
              ذخیره فایل
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      عملیات با موفقیت انجام شد

      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false"> بستن </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script setup lang="ts">
import {
  VerificationPersonalInfoDTO,
  VerificationPersonalInfoFormEntity,
} from "@/models";
import { FormStep } from "@/constants/enums";
import { required, nationalCode, phoneNumber } from "@/utils/validation-rules";

const snackbar = ref<boolean>(false);
const firstStepIsValidate = ref<boolean | null>(null);
const formStep = ref<number>(FormStep.firstStep);

const verificationPersonalInfoDTO = reactive<VerificationPersonalInfoDTO>({
  firstName: "",
  lastName: "",
  mobile: null,
  nationalCode: null,
  address: "",
});

const verificationIdentityDTO = ref<File[]>();

const verificationPersonalInfoFormEntities = ref<
  VerificationPersonalInfoFormEntity[]
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

const { setVerificationPersonalInfo, uploadIdentityCard } = useVerification();

/**
 * Set user verification personal info API call
 */
const setPersonalInfo = async () => {
  if (!firstStepIsValidate.value) return;

  try {
    await setVerificationPersonalInfo();

    snackbar.value = true;
    firstStepIsValidate.value = null;
    console.log(firstStepIsValidate.value);

    formStep.value++;
  } catch (error) {
    console.error(error);
  }
};

async function uploadFile() {
  console.log(firstStepIsValidate.value);

  if (!firstStepIsValidate.value) return;

  try {
    await uploadIdentityCard();

    snackbar.value = true;
    firstStepIsValidate.value = false;
  } catch (error) {
    console.error(error);
  }
}
</script>
