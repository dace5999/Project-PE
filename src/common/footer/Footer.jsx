import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container grid2">
          <div className="box">
            <h1>SSuMake</h1>
            <p>
              Mã số doanh nghiệp: 15082022 <br /> Đăng ký lần đầu ngày 17 tháng
              5 năm 2022
            </p>
          </div>
          <div className="box">
            <h2>Về chúng tôi</h2>
            <ul>
              <li>Giới thiệu về SSuMake</li>
              <li>Danh sách cửa hàng</li>
              <li>Quản lý chất lượng</li>
              <li>Chính sách bảo mật và chia sẻ thông tin</li>
              <li>Điều khoản và điều kiện giao dịch</li>
            </ul>
          </div>
          <div className="box">
            <h2>Hỗ trợ khách hàng</h2>
            <ul>
              <li>Trung tâm hỗ trợ khách hàng </li>
              <li>Chính sách mua hàng </li>
              <li>Chính sách giao hàng </li>
              <li>Chính sách đổi trả </li>
              <li>Chính sách chiết khấu ưu đãi mua sắm </li>
            </ul>
          </div>
          <div className="box">
            <h2>Liên hệ với chúng tôi</h2>
            <ul>
              <li>
                600 Nguyễn Văn Cừ nối dài, Phường An Bình, Quận Ninh Kiều, Thành
                Phố cần Thơ{" "}
              </li>
              <li>Email: hungnkce130351@fpt.edu.vn</li>
              <li>Tel: +84 923 678 456</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
