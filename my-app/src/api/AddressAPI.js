import axiosClient from "./axiosClient";

const AddressAPI = {
    getAll: (params) => {
        const url = '/Support/GetAllProvince';
        return axiosClient.get(url, { params });
    },
    getdisrtic: (id) => {
        const url = `/Support/GetAllDistrictbyProvince?id=${id}`;
        return axiosClient.get(url);
    },
    getcwt: (id) => {
        const url = `/Support/GetAllCWTbyDistrict?id=${id}`;
        return axiosClient.get(url);
    },
    getlocationbycwt: (id) => {
        const url = `/Support/GetLocationByCwtid?id=${id}`;
        return axiosClient.get(url);
    },
}
export default AddressAPI;