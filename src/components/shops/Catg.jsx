import React, { useState, useEffect } from "react"
import CategoryApi from "../../api/CategoryAPI";
import ProductAPI from "../../api/ProductAPI";
const Catg = (Testfucntion) => {
  // const data = [
  //   {
  //     cateImg: "./images/category/cat-1.png",
  //     cateName: "Rau củ - Trái cây",
  //   },
  //   {
  //     cateImg: "./images/category/cat-2.png",
  //     cateName: "Thịt - Trứng - Hải sản",
  //   },
  //   {
  //     cateImg: "./images/category/cat-1.png",
  //     cateName: "Thực phẩm chế biến",
  //   },
  //   {
  //     cateImg: "./images/category/cat-2.png",
  //     cateName: "Thực phẩm đông lạnh",
  //   },
  //   {
  //     cateImg: "./images/category/cat-1.png",
  //     cateName: "Đồ uống - giải khát",
  //   },
  //   {
  //     cateImg: "./images/category/cat-2.png",
  //     cateName: "Sữa các loại",
  //   },
  //   {
  //     cateImg: "./images/category/cat-2.png",
  //     cateName: "Dầu ăn-nước chấm-gia vị",
  //   },
  //   {
  //     cateImg: "./images/category/cat-2.png",
  //     cateName: "Bánh kẹo các loại",
  //   },
  // ];
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [categoryidbypro, setcategoryidbypro] = useState("");
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await CategoryApi.getAll();
        const responsesub = await ProductAPI.getAll();
        setCategoryList(response);
        setProductList(responsesub);
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
      }
    }
    fetchCategoryList();
  }, [])
  const HandleClick = (cateid) => {
    const produictlistbycate = productList.filter((value) => {
      return value.categoryId === cateid
    })
    // console.log(produictlistbycate)
    setProductList(produictlistbycate)
  }
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Category </h1>
        </div>
        {categoryList.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <span onClick={() => HandleClick(value.categoryId)}>{value.categoryName}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )

}
export default Catg
