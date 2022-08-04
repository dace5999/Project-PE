import axiosClient from "./axiosClient";

const SubCategoryApi = {
    getAll: (params) => {
        const url = '/Product/GetAllProduct';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/Product/GetAllSubCategoriesbyCategoryId?id=${id}`;
        return axiosClient.get(url);
    },
    getproduct: (id) => {
        const url = `/Product/GetAllProductbySubCategory?id=${id}`;
        return axiosClient.get(url);
    },
}
export default SubCategoryApi;