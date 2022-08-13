//import React, { useState } from "react"

//const ShopCart = ({ addToCart, shopItems }) => {
//  const [count, setCount] = useState(0)
//  const increment = () => {
//    setCount(count + 1)
//  }

//  return (
//    <>
//      {shopItems.map((shopItems) => {
//        return (
//          <div className='product mtop'>
//            <div className='img'>
//              <span className='discount'>{shopItems.discount}% Off</span>
//              <img src={shopItems.cover} alt='' />
//              <div className='product-like'>
//                <label>{count}</label> <br />
//                <i className='fa-regular fa-heart' onClick={increment}></i>
//              </div>
//            </div>
//            <div className='product-details'>
//              <h3>{shopItems.name}</h3>
//              <div className='rate'>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//                <i className='fa fa-star'></i>
//              </div>
//              <div className='price'>
//                <h4>${shopItems.price}.00 </h4>
//                <button onClick={() => addToCart(shopItems)}>
//                  <i className='fa fa-plus'></i>
//                </button>
//              </div>
//            </div>
//          </div>
//        )
//      })}
//    </>
//  )
//}

//export default ShopCart

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { memo } from "react"
import ProductAPI from "../../api/ProductAPI"


const ShopCart = ({ shopItems, addToCart, categoryidbypro }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const [discount, setDiscount] = useState([]);
  const [formDiscount, setFormDiscount] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductAPI.getdiscount();
        setDiscount(res)
      } catch (error) {
        console.log("Failed to fetchdata", error)
      }
    }
    fetchData();
  }, [])
  return (
    <>
      {categoryidbypro.slice(0, 6).map((productitem, index) => {
        return (
          <div className='box' key={index}>
            <div className='product mtop product-detail-wrapper'>
              <div className='img-box'>
                {
                  discount.map((values) => {
                    if (values.discountId == productitem.discountId && values.discountPercent == null) {
                    } else if (values.discountId == productitem.discountId) {
                      return <span className='discount'>{values.discountPercent}% Off</span>
                    } else if (!productitem.discountId) {
                    }
                  })
                }
                {/* <span className='discount'>0% Off</span> */}
                <img src={productitem.productImageURl} alt='' className="product-img" />
              </div>
              <div className='product-details'>
                <Link to={`/product/${productitem.productId}`}>
                  <h3 className="product-title">{`${productitem.productName.replace(/^(.{30}[^\s]*).*/, "$1")}${productitem.productName.length > 30 ? `...` : ``}`}</h3>
                </Link>
                <div className='price'>
                  {/* <h4>${productitem.price}.00 </h4> */}
                  {
                    discount.map((values) => {
                      if (values.discountId == productitem.discountId) {
                        const ab = values.discountPercent * productitem.price / 100;
                        return <h4>${productitem.price - ab}</h4>
                      }
                    })
                  }
                  <button onClick={() => addToCart(productitem)}>
                    <i className='fa fa-plus'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default memo(ShopCart)
