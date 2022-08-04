import React, { useState, useEffect } from "react";
import CategoryApi from "../../api/CategoryAPI";
import { Link } from "react-router-dom"
const Categories = () => {
  // const data = [
  //   {
  //     // cateImg: "./images/category/cat1.png",
  //     cateName: "Rau củ - Trái cây",
  //   },
  //   {
  //     // cateImg: "./images/category/cat2.png",
  //     cateName: "Thịt - Trứng - Hải sản",
  //   },
  //   {
  //     // cateImg: "./images/category/cat3.png",
  //     cateName: "Thực phẩm chế biến",
  //   },
  //   {
  //     // cateImg: "./images/category/cat4.png",
  //     cateName: "Thực phẩm đông lạnh",
  //   },
  //   {
  //     // cateImg: "./images/category/cat5.png",
  //     cateName: "Đồ uống - giải khát",
  //   },
  //   {
  //     // cateImg: "./images/category/cat6.png",
  //     cateName: "Sữa các loại",
  //   },
  //   {
  //     // cateImg: "./images/category/cat7.png",
  //     cateName: "Dầu ăn-nước chấm-gia vị",
  //   },
  //   {
  //     // cateImg: "./images/category/cat8.png",
  //     cateName: "Bánh kẹo các loại",
  //   },
  // ];
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
      <div className="category">
        {categorylist.map((value, index) => {
          return (
            <Link to={`/category/${value.categoryId}`}>
              <div className="box f_flex" key={index}>
                {/* <img src={value.cateImg} alt='' /> */}
                <span>{value.categoryName}</span>
                <i className='fa fa-chevron-down'></i>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
