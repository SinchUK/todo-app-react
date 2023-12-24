import { useContext, useEffect, useState } from "react";
import { Plus, TextAlignJustified } from "akar-icons";
import { v4 as uuidv4 } from "uuid";

import Task from "../Task/Task";
import MobileMenu from "../MobileMenu/MobileMenu";

import randomColor from "randomcolor";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";

import { recycle } from "../../assets";
import "./main.css";
import {
    CategoriesContext,
    CurrentCategoryContext,
    TasksContext,
} from "../../context/TodoContext";

const Main = () => {
    const [currentCategory, setCurrentCategory] = useContext(
        CurrentCategoryContext
    );
    const [categories, setCategories] = useContext(CategoriesContext);
    const [tasks, setTasks] = useContext(TasksContext);
    const [newTask, setNewTask] = useState("");

    const [isEditColor, setIsEditColor] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsEditColor(false);
    }, [currentCategory]);

    let color =
        currentCategory && categories
            ? categories.find((cat) => cat.name === currentCategory).color
            : "red";

    const filteredTasks =
        currentCategory === "all tasks"
            ? tasks
            : tasks.filter((task) => task.category === currentCategory);
    const clearInput = () => {
        setNewTask("");
    };

    const addTask = () => {
        console.log("Add task");
        setTasks((prev) => {
            const newTasks = [
                ...prev,
                {
                    id: uuidv4(),
                    name: newTask,
                    category: currentCategory,
                    isDone: false,
                },
            ]
                .slice()
                .sort((a, b) => a.isDone - b.isDone);
            setLocalStorage("tasks", newTasks);
            return newTasks;
        });
        clearInput();
        setIsDisabled(true);
    };

    const onHandleInputChange = (e) => {
        setNewTask(e.target.value);
        e.target.value.length > 3 && e.target.value !== ""
            ? setIsDisabled(false)
            : setIsDisabled(true);
    };

    const onEnter = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    const onColorChange = () => {
        setIsEditColor((prev) => !prev);
    };

    const setCategoryColor = (e) => {
        const newColor = e.target.dataset.value;
        setCategories((prev) => {
            const newCategories = prev.map((item) =>
                item.name === currentCategory
                    ? { ...item, color: newColor }
                    : item
            );
            setLocalStorage("categories", newCategories);
            return newCategories;
        });

        setIsEditColor(false);
    };

    const onCategoryDelete = () => {
        const newCategories = categories.filter(
            (cat) => cat.name !== currentCategory
        );
        setLocalStorage("categories", newCategories);
        setLocalStorage("currentCategory", "all tasks");
        setCurrentCategory(getLocalStorage("currentCategory", false));
        setCategories(getLocalStorage("categories", true));
        setTasks((prev) => {
            setLocalStorage(
                "tasks",
                prev.filter((task) => task.category !== currentCategory)
            );
            return prev.filter((task) => task.category !== currentCategory);
        });
    };

    const labelColors = randomColor({ count: 6 });
    labelColors.shift();
    return (
        <main className="main_block">
            <div className="mobile_icon ">
                <TextAlignJustified
                    onClick={() => setIsMobile((prev) => !prev)}
                    strokeWidth={2}
                    size={36}
                />
            </div>
            {isMobile ? (
                <div className="mobile_menu ">
                    <MobileMenu
                        setIsMobile={setIsMobile}
                        categories={categories}
                        setCurrentCategory={setCurrentCategory}
                        currentCategory={currentCategory}
                        setCategories={setCategories}
                    />
                </div>
            ) : (
                ""
            )}
            <div className="main_block-header">
                <h3>{currentCategory}</h3>
                {currentCategory === "all tasks" ? (
                    ""
                ) : (
                    <>
                        <img src={recycle} onClick={onCategoryDelete} alt="" />
                        <div className="main_block-header_category-color">
                            <div
                                onClick={onColorChange}
                                className="main_color-label"
                                style={{
                                    backgroundColor: `${color}`,
                                }}
                            ></div>
                            {isEditColor ? (
                                <>
                                    <ul className="tooltip">
                                        {labelColors.map((item, i) => {
                                            return (
                                                <li
                                                    key={`${item}_${i}`}
                                                    className="main_color-label main_color-label_style"
                                                    onClick={(e) =>
                                                        setCategoryColor(e)
                                                    }
                                                    style={{
                                                        backgroundColor: `${item}`,
                                                    }}
                                                    data-value={item}
                                                ></li>
                                            );
                                        })}
                                    </ul>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="main_block-search">
                <label htmlFor="">
                    <input
                        onKeyDown={(e) => onEnter(e)}
                        onChange={(e) => onHandleInputChange(e)}
                        className="main_block-search_input"
                        placeholder="Add a new task"
                        type="text"
                        name="task"
                        value={newTask}
                    />

                    <button
                        onClick={addTask}
                        className={
                            isDisabled
                                ? "add_task_button disabled"
                                : "add_task_button"
                        }
                        disabled={isDisabled}
                    >
                        <Plus color="white" />
                    </button>
                </label>
            </div>
            <ul className="main_block-tasks">
                {tasks
                    ? filteredTasks.map((task) => (
                          <Task
                              setIsDisabled={setIsDisabled}
                              categories={categories}
                              categoryColor={color}
                              setTasks={setTasks}
                              key={task.id}
                              task={task}
                              tasks={tasks}
                          />
                      ))
                    : null}
            </ul>
        </main>
    );
};

export default Main;
