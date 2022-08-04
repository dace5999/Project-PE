import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductAPI from "../../api/ProductAPI";
import DetailCart from "./detailCart";

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams();
    const [productinfo, setproductInfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductAPI.get(id)
                console.log(response)
                setproductInfo(response)
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        fetchData();
    }, [])
    return (
        <div className="detail-page">
            <DetailCart productinfo={productinfo} addToCart={addToCart} />
        </div>
    )
};

export default ProductDetail;