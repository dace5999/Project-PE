import axiosClient from "./axiosClient";

const CategoryApi = {
    getAll: (params) => {
        const url = '/Product/GetAllCategoriesandSubcategories';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/Product/GetAllProductbCategory?id=${id}`;
        return axiosClient.get(url);
    },
}
export default CategoryApi;