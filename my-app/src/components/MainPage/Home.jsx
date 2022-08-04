import React from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"
import { useState, useEffect } from "react"
import CategoryApi from "../../api/CategoryAPI"
import { Link } from "react-router-dom"
import Navbar1 from "./Submenu/Navbar"
const Home = () => {
  const [categorylist, setCategoryList] = useState([]);

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
      <section className='home'>
        <div className='container d_flex'>
          <Navbar1 />
          <SliderHome />
        </div>
      </section>
    </>
  )
}

export default Home
