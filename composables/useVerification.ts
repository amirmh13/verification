export const useVerification = () => {

    const setVerificationPersonalInfo = async () => {
        return new Promise((resolve, _) => {
            setTimeout(() => resolve('عملیات با موفقیت انجام شد'), 2000);
        })
    }

    const uploadIdentityCard = async () => {
        return new Promise((resolve, _) => {
            setTimeout(() => resolve('عملیات با موفقیت انجام شد'), 2000);
        })
    }

    const setBankCardInfo = async () => {
        return new Promise((resolve, _) => {
            setTimeout(() => resolve('عملیات با موفقیت انجام شد'), 2000);
        })
    }

    return { setVerificationPersonalInfo, uploadIdentityCard, setBankCardInfo }
}