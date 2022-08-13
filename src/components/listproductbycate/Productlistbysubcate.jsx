import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductAPI from "../../api/ProductAPI";
import SubCategoryApi from "../../api/SubCategoryApi";
import Navbar from "../Submenu/Navbar";
import "./Productlist.css"
const ProductbySublist = ({ addToCart }) => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }
    const { id } = useParams();
    const [categorylist, setCategoryList] = useState([])
    const [discount, setDiscount] = useState([]);
    useEffect(() => {
        const fetchProductbycateList = async () => {
            try {
                const response = await SubCategoryApi.getproduct(id);
                const resdis = await ProductAPI.getdiscount();
                setCategoryList(response);
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
                {categorylist.map((value, index) => {
                    return (
                        <div className='list-box' key={index} >
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
                                        <h3 className="product-title">{`${value.productName.replace(/^(.{30}[^\s]*).*/, "$1")}${value.productName.length > 30 ? `...` : ``}`}</h3>
                                    </Link>
                                    <div className='price'>
                                        {
                                            discount.map((values) => {
                                                if (values.discountId == value.discountId) {
                                                    const ab = values.discountPercent * value.price / 100;
                                                    return <h4>${value.price - ab} </h4>
                                                }
                                            })
                                        }
                                        <button onClick={() => addToCart(value)}>
                                            <i className='fa fa-plus'></i>
                                        </button>
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
export default ProductbySublist