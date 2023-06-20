<template>
  <v-form v-model="formIsValidate" @submit.prevent="uploadFile">
    <v-row>
      <v-col cols="12" lg="6">
        <v-file-input
          v-model="verificationIdentityDTO"
          clearable
          label="تصویر کارت ملی"
          color="primary"
          :rules="[required()]"
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
</template>

<script setup lang="ts">
import { useVerificationStore } from "~~/store/verification";
import { required } from "~~/utils/validation-rules";

const verificationIdentityDTO = ref<File[]>();
const formIsValidate = ref<boolean | null>(null);

const { uploadIdentityCard } = useVerification();
const { nextStep, showSnackbar } = useVerificationStore();

/**
 * Upload national code API call
 */
const uploadFile = async () => {
  if (!formIsValidate.value) return;

  try {
    await uploadIdentityCard();

    showSnackbar();
    nextStep();
  } catch (error) {
    console.error(error);
  }
};
</script>
