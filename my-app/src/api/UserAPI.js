import axiosClient from "./axiosClient";

const UserAPI = {
    getuser: (id) => {
        const url = `/Customer/GetCustomer?id=${id}`;
        return axiosClient.get(url);
    },
}
export default UserAPI;