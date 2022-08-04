import { useEffect } from "react";
import { useState } from "react";
import CategoryApi from "../../../api/CategoryAPI";
import MenuItems from "./MenuItems";
import "./Submenu.css"
const Navbar1 = () => {
    const [categorylist, setCategoryList] = useState([])
    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await CategoryApi.getAll();
                setCategoryList(response);
                console.log(response)
            } catch (error) {
                console.log('Failed to fetch product list: ', error)
            }
        }
        fetchCategoryList();
    }, [])
    return (
        <div className="navbar">
            <ul className="menus1">
                {categorylist.map((menu, index) => {
                    const depthLevel = 0;
                    return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
                })}
            </ul>
        </div>
    );
};

export default Navbar1;
