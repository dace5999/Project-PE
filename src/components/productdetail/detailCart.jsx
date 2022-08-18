import { useState } from "react";
import { useEffect } from "react";
import UnitAPI from "../../api/UnitAPI";

const DetailCart = ({ addToCart, productinfo }) => {
    const [unit, setUnit] = useState([]);
    useEffect(() => {
        const FetchData = async () => {
            try {
                const res = await UnitAPI.getAllUnit();
                console.log(res);
                setUnit(res)
            } catch (error) {
                console.log("Falied to fetchData", error)
            }
        }
        FetchData()
    }, [])
    return (
        <div className="backgrounddetails">
            <div className="details">
                <div className="big-image">
                    <img src={productinfo.productImageURl} alt="" />
                </div>
                <div className="box-detail">
                    <div className="row">
                        <h4>{productinfo.productName}</h4>
                    </div>
                    <h5>{productinfo.productCode}</h5>
                    <p>Giá: {productinfo.price}đ</p>
                    {
                        unit.map((values, index) => {
                            if (values.unitId == productinfo.unitId) {
                                return (
                                    <p>Loại: {values.name}</p>
                                )
                            }
                        })
                    }
                    <p >{productinfo.productDescribe}</p>
                    <button onClick={() => addToCart(productinfo)} className="button-cart">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DetailCart; 