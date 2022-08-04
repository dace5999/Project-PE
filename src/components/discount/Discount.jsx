import React from "react"
import { useEffect } from "react"
import Dcard from "./Dcard"

const Discount = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {

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
            <div className='heading-right row '>
              <span>View all</span>
              <i className='fa-solid fa-caret-right'></i>
            </div>
          </div>
          <Dcard />
        </div>
      </section>
    </>
  )
}

export default Discount
