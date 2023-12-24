import { NavLink } from "react-router-dom";
import "./mobileMenu.css";
import { useEffect, useState } from "react";
import randomColor from "randomcolor";
import { v4 as uuidv4 } from "uuid";
import { Cross, Plus } from "akar-icons";
import { setLocalStorage } from "../../helpers/localStorage";

const MobileMenu = ({
    setIsMobile,
    categories,
    setCurrentCategory,
    currentCategory,
    setCategories,
}) => {
    const [isCategoryAdd, setIsCategoryAdd] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const onHandleTab = (cat) => {
        setCurrentCategory(cat.name);
        setLocalStorage("currentCategory", `${cat.name}`);
        setIsMobile(false);
    };

    const toggleInput = () => {
        setIsCategoryAdd(true);
    };

    useEffect(() => {
        setIsCategoryAdd(false);
    }, [currentCategory]);

    const onHandleInputChange = (e) => {
        setNewCategory(e.target.value);
    };

    const onHandleClick = () => {
        let newCategories = [];
        setCategories((prev) => {
            newCategories = [
                ...prev,
                {
                    id: uuidv4(),
                    name: newCategory,
                    color: randomColor(),
                },
            ];
            return newCategories;
        });
        setLocalStorage("categories", newCategories);
        setNewCategory("");
    };

    return (
        <div className="mobile_menu">
            <div className="mobile_menu-wrapper">
                <div className="mobile_menu-close">
                    <Cross size={36} onClick={() => setIsMobile(false)} />
                </div>
                <nav className="mobile_menu-list">
                    <ul className="mobile_menu-items">
                        {categories &&
                            categories.map((cat, i) => {
                                return (
                                    <li key={`cat+${i}`}>
                                        <NavLink
                                            onClick={() => onHandleTab(cat)}
                                            className="mobile_munu-items_link"
                                            to={`/${cat.name}`}
                                        >
                                            {cat.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                    </ul>
                </nav>

                <div className="mobile_menu-new_category" onClick={toggleInput}>
                    {isCategoryAdd ? (
                        <div className="mobile_menu-new_category-input">
                            <label>
                                <input
                                    onChange={(e) => onHandleInputChange(e)}
                                    className="mobile_menu-search_input"
                                    placeholder="Enter category name"
                                    type="text"
                                    name="category"
                                    autoFocus
                                    value={newCategory}
                                />
                            </label>
                            <button onClick={onHandleClick}>
                                <Plus size={18} color="white" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Plus strokeWidth={2} color="#ababab" size={15} />
                            <span>New category</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MobileMenu;
