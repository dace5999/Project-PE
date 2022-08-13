import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DishAPI from "../../api/DishAPI";
import ProductAPI from "../../api/ProductAPI";
import DetailCart from "./detailCart";
import "./productdetail.css"
const ProductDetail = ({ addToCart }) => {
    const { id } = useParams();
    const [productinfo, setproductInfo] = useState([]);
    const [dishInfo, setDishInfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductAPI.get(id)
                const res = await DishAPI.getDish(id);
                setproductInfo(response)

                if (res.data == "") {
                    setDishInfo("");
                } else {
                    setDishInfo(res[0])
                }
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        fetchData();
    }, [])
    return (
        <div className="detail-page">
            <DetailCart productinfo={productinfo} addToCart={addToCart} />
            {
                dishInfo != "" ? (
                    <div className="recomfood-page">
                        <div className="title-foodpage">MÓN NGON NẤU CÙNG</div>
                        <div className="infor-foodpage">
                            <div className="title-dish">{dishInfo.dishName}</div>
                            <div className="description-dish">{dishInfo.dishDescription}</div>
                            <div className="ingredient-dish">Nguyên liệu</div>
                            <ul className="ul-ingre">
                                {
                                    dishInfo.dishDetails.map((ingre, indexx) => {
                                        return (

                                            <li className="il-ingre">{ingre.quantity} {ingre.unitName} {ingre.productName}</li>
                                        )
                                    })

                                }
                            </ul>
                            <div className="title-guide-cooking">Cách làm</div>
                            <p className="guide-cooking">{dishInfo.dishCooking}</p>
                        </div>
                    </div>
                ) : (
                    <div style={{ 'paddingBottom': "30px" }}></div>
                )
            }
        </div >
    )
};

export default ProductDetail;