import axiosClient from "./axiosClient";

const ProductAPI = {
    getAll: (params) => {
        const url = '/Product/GetAllProduct';
        return axiosClient.get(url, { params });
    },
    get: (id) => {
        const url = `/Product/GetProductById?id=${id}`;
        return axiosClient.get(url);
    },
    getbcate: (id) => {
        const url = `/Product/GetAllProductbCategory?id=${id}`;
        return axiosClient.get(url);
    },
    getproductNA: (params) => {
        const url = '/Product/GetNewProduct';
        return axiosClient.get(url, { params });
    },
    getdiscount: (params) => {
        const url = '/Product/GetAllDiscount';
        return axiosClient.get(url, { params });
    },
}
export default ProductAPI;