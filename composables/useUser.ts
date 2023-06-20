import { ADD_USER, ALL_USERS } from "~~/constants/endpoints";

export const useVUser = () => {

    const add = async () => {
        return useCustom$Fetch(ADD_USER)
    }

    const getAll = async () => {
        return useCustom$Fetch(ALL_USERS)
    }

    return { add, getAll }
}