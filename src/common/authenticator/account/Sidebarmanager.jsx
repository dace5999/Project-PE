import React from "react"
import "./account.css"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";
const Sidebarmanager = () => {
    let navigate = useNavigate();
    const Sidebardata = [
        {
            title: "Tài Khoản",
            path: "/account"
        },
        {
            title: "Quản lí đơn hàng",
            path: "/order"
        },
        {
            title: "Đổi mật khẩu",
            path: "/changepassword"
        },
    ]
    return (
        <div className="profile-title">
            {
                Sidebardata.map((value, index) => {
                    return (
                        <div key={index} className="profile-item">
                            <NavLink to={value.path}>
                                <span>{value.title}</span>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Sidebarmanager