import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CategoryApi from "../../api/CategoryAPI";
import ProductAPI from "../../api/ProductAPI";
import Navbar from "../Submenu/Navbar";
import "./Productlist.css"
const Productlist = ({ addToCart }) => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }
    const { id } = useParams();
    const [productlist, setproductList] = useState([])
    const [categorylist, setCategoryList] = useState([])
    const [discount, setDiscount] = useState([]);
    useEffect(() => {
        const fetchProductbycateList = async () => {
            try {
                const response = await ProductAPI.getbcate(id);
                const response1 = await CategoryApi.getAll();
                const resdis = await ProductAPI.getdiscount();
                console.log(response);
                setproductList(response);
                setCategoryList(response1);
                setDiscount(resdis);
            } catch (error) {
                console.log('Fetch data failed', error);
            }
        }
        fetchProductbycateList();
    }, [])
    return (
        <div className="productlist-page">
            <Navbar />
            <div className="productlist-productbackground">
                {productlist.map((value, index) => {
                    return (
                        <div className='list-box' key={index}>
                            <div className='product mtop'>
                                <div className='img' style={{ textAlign: 'center' }}>
                                    {
                                        discount.map((values) => {
                                            if (values.discountId == value.discountId && values.discountPercent == null) {
                                            } else if (values.discountId == value.discountId) {
                                                return <span className='discount'>{values.discountPercent}% Off</span>
                                            } else if (!value.discountId) {
                                            }
                                        })
                                    }
                                    {/* <span className='discount'>{value.discount}% Off</span> */}
                                    <img src={value.productImageURl} alt='' style={{ width: '120px', height: '120px' }} />
                                </div>
                                <div className='product-details'>
                                    <Link to={`/product/${value.productId}`}>
                                        <h3>{`${value.productName.replace(/^(.{30}[^\s]*).*/, "$1")}${value.productName.length > 30 ? `...` : ``}`}</h3>
                                    </Link>
                                    <div className='price'>
                                        {
                                            discount.map((values) => {
                                                if (values.discountId == value.discountId) {
                                                    const ab = values.discountPercent * value.price / 100;
                                                    return <h4 className="list-box-price">${value.price - ab}</h4>
                                                }
                                            })
                                        }
                                        {
                                            value.quantity == 0 ? (
                                                <div className="sold-out-product">
                                                    Hết hàng
                                                </div>
                                            ):(
                                                <button onClick={() => addToCart(value)}>
                                                <i className='fa fa-plus'></i>
                                                </button>
                                            )
                                        }
                                        {/* <button onClick={() => addToCart(value)}>
                                            <i className='fa fa-plus'></i>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
export default Productlist