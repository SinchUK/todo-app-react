import { useState } from "react";

import { pencil, recycle } from "../../assets";
import { setLocalStorage } from "../../helpers/localStorage";

import "./task.css";

const Task = ({ categories, tasks, task, setTasks, setIsDisabled }) => {
    const { isDone, name, category, id } = task;
    const [isChecked, setIsChecked] = useState(isDone);
    const [isChangeTask, setIsChangeTask] = useState(false);
    const [newTask, setNewTask] = useState("");

    let color =
        categories.find((el) => el.name === category) !== undefined
            ? categories.find((el) => el.name === category).color
            : "";
    const handleChange = (id) => {
        setIsChecked(!isChecked);

        const taskIndex = tasks.findIndex((el) => el.id === id);
        let changedTasks = [];

        setTasks((prev) => {
            changedTasks = prev
                .map((item, i) =>
                    i === taskIndex ? { ...item, isDone: !isChecked } : item
                )
                .slice()
                .sort((a, b) => a.isDone - b.isDone);
            setLocalStorage("tasks", changedTasks);
            return changedTasks;
        });
    };

    const onDeleteTask = (id) => {
        setLocalStorage(
            "tasks",
            tasks.filter((el) => el.id !== id)
        );
        setTasks(tasks.filter((el) => el.id !== id));
    };

    const onChangeTask = () => {
        setIsChangeTask(!isChangeTask);
    };

    const onHandleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const changeTaskName = (e) => {
        if (e.key === "Enter") {
            const taskIndex = tasks.findIndex((el) => el.id === id);
            setTasks((prev) => {
                const newTasks = prev.map((item, i) =>
                    i === taskIndex ? { ...item, name: newTask } : item
                );
                setLocalStorage("tasks", newTasks);
                return newTasks;
            });
            setIsChangeTask(false);
            setNewTask("");
        }
    };

    return (
        <li>
            <label
                className={
                    isChecked
                        ? "main_block-tasks_item line_trough"
                        : "main_block-tasks_item"
                }
            >
                {isChangeTask ? (
                    <input
                        onKeyDown={(e) => changeTaskName(e)}
                        onChange={(e) => onHandleInputChange(e)}
                        className="main_block-task_input"
                        placeholder="Change your task name"
                        type="text"
                        name="task"
                        autoFocus
                        value={newTask}
                    />
                ) : (
                    name
                )}
                <input
                    className="main_block-task_item-input"
                    onChange={() => handleChange(id)}
                    type="checkbox"
                    checked={isChecked}
                />
                <span className="checkmark"></span>
            </label>
            <div className="main_block-tasks_options">
                {category === "all tasks" ? (
                    ""
                ) : (
                    <span
                        className="task_label"
                        style={{ backgroundColor: `${color}` }}
                    >
                        {category}
                    </span>
                )}
                <img onClick={() => onChangeTask(id)} src={pencil} alt="" />
                <img onClick={() => onDeleteTask(id)} src={recycle} alt="" />
            </div>
        </li>
    );
};

export default Task;
