import React, { useState } from "react"
import { useEffect } from "react"
import ProductAPI from "../../api/ProductAPI"
import Dcard from "./Dcard"

const Discount = ({addToCart}) => {
  const [productDis, setProductDist] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await ProductAPI.getProductDiscount();
          console.log(res)
          setProductDist(res);
      } catch (error) {
        console.log("Failed to fetch data", error)
      }
    }
    fetchData();
  }, [])
  return (
    <>
      <section className='Discount background NewArrivals'>
        <div className='container'>
          <div className='heading d_flex'>
            <div className='heading-left row  f_flex'>
              <img src='https://img.icons8.com/windows/32/fa314a/gift.png' />
              <h2>Big Discounts</h2>
            </div>
          </div>
          <Dcard product = {productDis} addToCart = {addToCart} />
        </div>
      </section>
    </>
  )
}

export default Discount
