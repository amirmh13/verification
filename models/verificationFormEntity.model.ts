export interface VerificationFormEntity<T> {
    title: string;
    key: keyof T;
    type: string;
    rules: Function[],
}