import { UseFetchOptions } from "nuxt/dist/app/composables";
import Configs from "~/configs";

export const useCustomFetch = async (url: string | Request | Ref<string | Request> | (() => string | Request), options?: UseFetchOptions<Object>) => {

    return await useFetch(url, {
        baseURL: Configs.BASEURL,
        ...options,
        onRequest({ request, options }) {
            const headers = new Headers(options.headers);
            headers.set("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbmlrcGFyZGFraHQtb2Rpbi1zdGFnZS5uZ2luaHViLmNvbS9hZG1pbi9hcGkvdjEvbG9naW4vcGFzc3dvcmQiLCJpYXQiOjE2NzgxOTU2MjAsImV4cCI6MTY3ODI1NTYyMCwibmJmIjoxNjc4MTk1NjIwLCJqdGkiOiI1Y3NtWk94c2Z4NnJTTGJuIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJwYW5lbCI6ImFkbWluIn0.leiQ66o4zmnzqDWFyRFd5v9CvFwy0rEQggHLAliG_MI");

            options.headers = headers;
        },
    })
}