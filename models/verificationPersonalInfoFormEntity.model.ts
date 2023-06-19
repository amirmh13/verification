import { VerificationPersonalInfoDTO } from '.'

export interface VerificationPersonalInfoFormEntity {
    title: string;
    key: keyof VerificationPersonalInfoDTO;
    type: string;
    rules: Function[],
}