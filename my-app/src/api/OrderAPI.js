import axiosClient from "./axiosClient";

const OrderAPI = {
    get: (id) => {
        const url = `/Order/GetAllOrderByCustomerId?id=${id}`;
        return axiosClient.get(url);
    },
}
export default OrderAPI;