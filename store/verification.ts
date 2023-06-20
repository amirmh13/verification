import { defineStore } from "pinia";
import { FormStep } from "@/constants/enums";

export const useVerificationStore = defineStore('verification', () => {
    const formStep = ref<number>(FormStep.firstStep);
    const snackbar = ref<boolean>(false);

    const nextStep = () => {
        formStep.value++
    }

    const showSnackbar = () => {
        snackbar.value = true
    }

    const hideSnackbar = () => {
        snackbar.value = false
    }

    return { formStep, snackbar, nextStep, showSnackbar, hideSnackbar }
})