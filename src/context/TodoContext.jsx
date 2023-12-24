import { useState, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

export const TasksContext = createContext([]);
export const CategoriesContext = createContext([]);
export const CurrentCategoryContext = createContext("");

const TodoContext = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const setStorage = () => {
        getLocalStorage("categories", false)
            ? console.log("NO need set Local storage Categories ")
            : setLocalStorage("categories", [
                  { id: uuidv4(), name: "all tasks", color: "white" },
              ]);
    };

    useEffect(() => {
        setStorage();
        setCurrentCategory(
            getLocalStorage("currentCategory", false)
                ? getLocalStorage("currentCategory", false)
                : "all tasks"
        );
        setTasks(
            getLocalStorage("tasks", true) ? getLocalStorage("tasks", true) : []
        );
        setCategories(getLocalStorage("categories", true));
    }, []);

    return (
        <>
            <CategoriesContext.Provider value={[categories, setCategories]}>
                <CurrentCategoryContext.Provider
                    value={[currentCategory, setCurrentCategory]}
                >
                    <TasksContext.Provider value={[tasks, setTasks]}>
                        {children}
                    </TasksContext.Provider>
                </CurrentCategoryContext.Provider>
            </CategoriesContext.Provider>
        </>
    );
};

export default TodoContext;
