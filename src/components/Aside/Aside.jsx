//libraries
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "akar-icons";
import randomColor from "randomcolor";
//local imports
import { setLocalStorage } from "../../helpers/localStorage";

//styles
import "./aside.css";
import {
    CategoriesContext,
    CurrentCategoryContext,
} from "../../context/TodoContext";

const Aside = () => {
    const [currentCategory, setCurrentCategory] = useContext(
        CurrentCategoryContext
    );
    const [categories, setCategories] = useContext(CategoriesContext);
    const [isCategoryAdd, setIsCategoryAdd] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const onHandleTab = (cat) => {
        setCurrentCategory(cat.name);
        setLocalStorage("currentCategory", `${cat.name}`);
    };

    const toggleInput = () => {
        setIsCategoryAdd(true);
    };

    useEffect(() => {
        setIsCategoryAdd(false);
        setNewCategory("");
    }, [currentCategory]);

    const onHandleInputChange = (e) => {
        setNewCategory(e.target.value);
        e.target.value.length > 3 && e.target.value !== ""
            ? setIsDisabled(false)
            : setIsDisabled(true);
    };

    const addCategory = () => {
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

    const onEnter = (e) => {
        if (e.key === "Enter") {
            addCategory();
        }
    };

    return (
        <aside className="aside_block">
            <div className="app_header">
                <ul className="app_header-items">
                    <li>
                        <div className="circle circle-red"></div>
                    </li>
                    <li>
                        <div className="circle circle-yellow"></div>
                    </li>
                    <li>
                        <div className="circle circle-green"></div>
                    </li>
                </ul>
            </div>
            <div className="aside_menu">
                <nav>
                    <ul className="aside_menu-items">
                        {categories &&
                            categories.map((cat, i) => {
                                return (
                                    <li key={`cat+${i}`}>
                                        <NavLink
                                            onClick={() => onHandleTab(cat)}
                                            className="aside_munu-items_link"
                                            to={`/${cat.name}`}
                                        >
                                            {cat.name}
                                        </NavLink>
                                    </li>
                                );
                            })}
                    </ul>
                </nav>

                <div className="aside_menu-new_category" onClick={toggleInput}>
                    {isCategoryAdd ? (
                        <div className="aside_menu-new_category-input">
                            <label>
                                <input
                                    onKeyDown={(e) => onEnter(e)}
                                    onChange={(e) => onHandleInputChange(e)}
                                    className="aside_menu-search_input"
                                    placeholder="Add category name"
                                    type="text"
                                    name="category"
                                    autoFocus
                                    value={newCategory}
                                />
                            </label>
                            <button
                                disabled={isDisabled}
                                className={isDisabled ? "disabled" : ""}
                                onClick={addCategory}
                            >
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
        </aside>
    );
};

export default Aside;
