import React, { useState, useEffect } from "react"
import ShopCart from "./ShopCart"
import "./style.css"
import { Link } from "react-router-dom"
import CategoryApi from "../../api/CategoryAPI"
import ProductAPI from "../../api/ProductAPI"

const Shop = ({ addToCart, shopItems, categorylist }) => {
  const [categoryidbypro, setcategoryidbypro] = useState([]);
  const [cateid, setcateid] = useState(1);
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await CategoryApi.get(cateid);;
        setcategoryidbypro(response)
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
      }
    }
    fetchCategoryList();
  }, [])
  const HandleClick = (cateid) => {
    const fetchCategoryList = async () => {
      try {
        const responsesub = await CategoryApi.get(cateid);
        setcategoryidbypro(responsesub)
        console.log(categoryidbypro)
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
      }
    }
    fetchCategoryList();
    setcateid(cateid);
  }
  return (
    <>
      <section className='shop background'>
        <div className='container d_flex'>
          <div className='category'>
            <div className='chead d_flex'>
              <h1 className="page-item-title">Category </h1>
            </div>
            {categorylist.map((value, index) => {
              return (
                <div className='box f_flex' key={index}>
                  <span key={value.categoryId} onClick={(e) => HandleClick(value.categoryId)}>{value.categoryName}</span>
                </div>
              )
            })}
            {/* <div className='box box2'>
              <button>View All Brands</button>
            </div> */}
          </div>
          <div className='contentWidth'>
            <div className='heading d_flex'>
              <div className='heading-left row  f_flex'>
                <h2>Product</h2>
              </div>
              <Link to={`/category/${cateid}`}>
                <div className='heading-right column'>
                  <span>View all</span>
                  <i className='fa-solid fa-caret-right'></i>
                </div>
              </Link>
            </div>
            <div className='product-content  grid1'>
              <ShopCart addToCart={addToCart} shopItems={shopItems} categoryidbypro={categoryidbypro} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
