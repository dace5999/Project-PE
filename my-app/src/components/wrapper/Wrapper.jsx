import React from "react";
import "./style.css";

const Wrapper = () => {
  const data = [
    {
      cover: <i class="fa-solid fa-truck-fast"></i>,
      title: "Giao hàng nhanh",
    },
    {
      cover: <i class="fa-solid fa-id-card"></i>,
      title: "Thanh toán an toàn",
    },
    {
      cover: <i class="fa-solid fa-shield"></i>,
      title: "Sản phẩm an toàn ",

    },
    {
      cover: <i class="fa-solid fa-headset"></i>,
      title: "Hỗ trợ 24/7 ",
    },
  ];
  return (
    <>
      <section className="wrapper background">
        <div className="container grid2">
          {data.map((val, index) => {
            return (
              <div className="product" key={index}>
                <div className="img icon-circle">
                  <i>{val.cover}</i>
                </div>
                <h3>{val.title}</h3>
                <p>{val.decs}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Wrapper;
