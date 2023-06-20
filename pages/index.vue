<template>
  <v-layout class="pa-6">
    <v-container>
      <v-tabs v-model="formStep" color="deep-purple-accent-4" align-tabs="center">
        <v-tab v-for="step in steps" :key="step.value" :value="step.value">
          {{ step.name }}
        </v-tab>
      </v-tabs>

      <v-window v-model="formStep">
        <v-window-item
          v-for="step in steps"
          :key="step.value"
          :value="step.value"
          class="py-10"
        >
          <component :is="step.component"></component>
        </v-window-item>
      </v-window>
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="2000" color="success">
      عملیات با موفقیت انجام شد

      <template v-slot:actions>
        <v-btn variant="text" @click="hideSnackbar"> بستن </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script setup lang="ts">
import { FormStep } from "@/constants/enums";
import { storeToRefs } from "pinia";
import { useVerificationStore } from "~~/store/verification";

const verificationStore = useVerificationStore();
const { formStep, snackbar, hideSnackbar } = storeToRefs(verificationStore);
const steps = ref([
  {
    name: "اطلاعات شخصی",
    component: resolveComponent("VerificationFirstStep"),
    value: FormStep.firstStep,
  },
  {
    name: "اطلاعات کارت ملی",
    component: resolveComponent("VerificationSecondStep"),
    value: FormStep.secondStep,
  },
  {
    name: "کارت بانکی",
    component: resolveComponent("VerificationThirdStep"),
    value: FormStep.thirdStep,
  },
]);
</script>
