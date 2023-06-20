import { VerificationBankCardDTO } from ".";

export interface VerificationBankCardFormEntity {
    title: string;
    key: keyof VerificationBankCardDTO;
    type: string;
    rules: Function[],
}