import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        window.innerWidth > 960 && setDropdown(false);
    };

    return (
        <li
            className="menu-items1"
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {items.subCategories ? (
                <>
                    <button
                        type="button"
                        aria-haspopup="menu1"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {items.categoryName}{" "}
                        {depthLevel > 0 ? <span>&raquo;</span> : <span />}
                    </button>
                    <Dropdown
                        depthLevel={depthLevel}
                        subCategories={items.subCategories}
                        dropdown={dropdown}
                    />
                </>
            ) : (

                <a href={`/subcate/${items.subCategoryId}`}>{items.subCategoryName}</a>
            )}
        </li>
    );
};

export default MenuItems;
