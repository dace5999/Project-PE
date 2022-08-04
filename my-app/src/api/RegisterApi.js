import axiosClient from "./axiosClient";

const RegisterApi = {
    get: (id) => {
        const url = `/Account/VerifyPhone?phoneNum=${id}`;
        return axiosClient.get(url);
    },
    update: (id) => {
        const url = `/Account/ChangePhoneNumber`;
        return axiosClient.get(url);
    },
    getotpemail: (id) => {
        const url = `/Account/GetCodeVerifyEmail?email=${id}`;
        return axiosClient.get(url);
    },
}
export default RegisterApi;