import React from "react"
import "./account.css"
import Sidebarmanager from "./Sidebarmanager"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import OrderAPI from "../../../api/OrderAPI";
import axios from "axios";
import ProductAPI from "../../../api/ProductAPI";
const HistoryOrder = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [orders, setOrders] = useState([]);
    const [statusSuccess, setStatusSuccess] = useState("");
    const [statusError, setStatusError] = useState("");
    const [productLis, setProductLis] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://192.168.162.202:5000/api/v1/Order/GetAllOrderIncludeOderDetailbyCustomerId?id=${user.id}`, {
                    headers: { "Authorization": `Bearer ${user.token}` }
                })
                const response = await ProductAPI.getAll()
                console.log(response)
                setProductLis(response)
                setOrders(res.data);
            } catch (error) {
                console.log("Failed to fetch Data", error)
            }
        }
        fetchData();
    }, [])
    const Season = {
        0: "Chờ xử lý",
        1: "Đã xác nhận",
        2: "Đang giao hàng",
        3: "Đã nhận hàng",
        4: "Đã hủy",
    }
    const HandleView = (order) =>{
        console.log(order)
    }
    const HandleUpdate = (order) => {
        console.log(order);
        console.log(user.token)
        const Order = {
            orderId: order,
            status: 4
        }
        // const CartItemPost = {
        //     custormerId: order.custormerId,
        //     dateCreate: order.dateCreate,
        //     addressId: order.addressId,
        //     paymentMethodId: 1,
        //     totalPrice: order.totalPrice,
        //     discountId: order.discountId,
        //     status: 4,
        //     orderdetails: order.orderdetails
        // }
        // console.log(CartItemPost);
        const fetchData = async () => {
            try {
                const res = await axios.post(`http://192.168.162.202:5000/api/v1/Order/UpdateOrderStatus`,Order,{
                    headers: { 'Authorization': `Bearer ${user.token}` }
                })
                if (res.data === true) {
                    // setStatusError("");
                    // setStatusSuccess("Hủy đơn hàng thành công");
                    window.location.href = "/order"
                }
                else {
                    setStatusError("Hủy đơn không thành công");
                    setStatusSuccess("");
                }
                console.log(res);
            } catch (error) {
                setStatusError("Hủy đơn không thành công")
                console.log("Failed to fetch data", error)
            }
        }
        fetchData();
    }
    return (
        <div className="profile">
            <div className="profile-background">
                <div className="profile-sidebar">
                    <Sidebarmanager />
                </div>
                <div className="profile-page">
                    <div className="page-title">Quản lí đơn hàng</div>
                    {/* <div className="pageorder-table-header">
                        <div className="table-header-item1">Mã đơn hàng</div>
                        <div className="table-header-item2">Ngày mua</div>
                        <div className="table-header-item3">Tổng tiền</div>
                        <div className="table-header-item4">Trạng thái</div>
                    </div>
                    {
                        orders.map((value, index) => {
                            return (
                                <div className="pageorder-table-body" key={index}>
                                    <div className="table-body-item">{value.orderId}</div>
                                    <div className="table-body-item">{value.dateCreate}</div>
                                    <div className="table-body-item">{value.totalPrice}</div>
                                    <div className="table-body-item">{Season[value.status]}</div>
                                </div>
                            )
                        })
                    } */}
                    <div className="cancel-order">{statusSuccess}</div>
                    <table className="history-order">
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Ngày mua</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        {
                            orders.map((value, index) => {
                                return (
                                    <tbody>
                                        <tr key={index}>
                                            <td>{value.orderId}</td>
                                            <td>{value.dateCreate}</td>
                                            <td>{value.totalPrice}</td>
                                            <td>{Season[value.status]}</td>
                                            {/* <td><button className="button-delete-order" onClick={(e) => HandleView(value.orderId)}>Chi tiết</button></td> */}
                                            {
                                                value.status == 0 && (
                                                    
                                                    <td><button className="button-delete-order" onClick={(e) => HandleUpdate(value.orderId)}>Hủy đơn</button></td>
                                                )
                                            }
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div >
    )
}
export default HistoryOrder