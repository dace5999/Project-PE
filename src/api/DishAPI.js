import axiosClient from "./axiosClient";

const DishAPI = {
    getDish: (id) => {
        const url = `/Dish/GetDishByProductId?Id=${id}`;
        return axiosClient.get(url);
    },
}
export default DishAPI;