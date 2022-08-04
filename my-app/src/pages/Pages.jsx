import React from "react"
import Home from "../components/MainPage/Home"
import FlashDeals from "../components/flashDeals/FlashDeals"
import TopCate from "../components/top/TopCate"
import NewArrivals from "../components/newarrivals/NewArrivals"
import Discount from "../components/discount/Discount"
import Shop from "../components/shops/Shop"
import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"
import { useState, useEffect } from "react"
import CategoryApi from "../api/CategoryAPI"

const Pages = ({ productItems, addToCart, CartItem, shopItems }) => {
  const [categorylist, setCategoryList] = useState([])
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await CategoryApi.getAll();
        setCategoryList(response);
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
      }
    }
    fetchCategoryList();
  }, [])
  return (
    <>
      <Home CartItem={CartItem} shopItems={shopItems} />
      <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals addToCart={addToCart} />
      <Discount />
      <Shop shopItems={shopItems} addToCart={addToCart} categorylist={categorylist} />
      <Annocument />
      <Wrapper />
    </>
  )
}

export default Pages
