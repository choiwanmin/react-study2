import axios, { AxiosResponse } from "axios";
export const searchApi = async <T, D>(api: string, param: object) => {
    try {
        // const result = axios.post(api, param).then((res: AxiosResponse<type>) => {}); //axios 프로미스 객체를 받는다, 프로미스에는 비동기 함수를 갖고 있다. -> async 사용
        const result: AxiosResponse<T> = await axios.post(api, param); //axios 프로미스 객체를 받는다, 프로미스에는 비동기 함수를 갖고 있다. -> async 사용

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error("api 호출 오류 발생", error);
    }
};
