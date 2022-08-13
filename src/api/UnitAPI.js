import axiosClient from "./axiosClient";

const UnitAPI = {
    getAllUnit: (params) => {
        const url = '/Product/GetAllUnit';
        return axiosClient.get(url, { params });
    },
}
export default UnitAPI;