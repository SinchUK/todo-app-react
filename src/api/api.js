import axios from "axios";
// const apiUrl = "https://655b0dbaab37729791a878d1.mockapi.io/tasks";
const apiUrl = "https://655b0dbaab37729791a878d1.mockapi.io/users";

const getData = async () => {
    const data = await axios
        .get(apiUrl)
        .then(function (response) {
            const categoriesArr = response.data[0].tasksCategories;
            const tasks = response.data[0].tasks;
            return { tasks, categoriesArr };
        })
        .catch(function (error) {
            console.log(error, "Error from getData()");
        });
    const { categoriesArr, tasks } = data;
    // const arr = data[tasksCategories].map((cat) => cat.category);
    // const categories = [...new Set(arr)];
    return { tasks, categoriesArr };
};

const addCategory = (category) => {
    axios
        .put(`${apiUrl}/1`, {
            name: "Дед Мороз",
            password: "123456",
            id: "1",
            tasks: [],
            // tasksCategories: categories,
            isDone: false,
        })
        .then(function (response) {
            console.log("response Send :", response);
        })
        .catch(function (error) {
            console.log(error, "error from addCategory() function");
        });
};

const addData = (name, category, color) => {
    axios
        .post(apiUrl, {
            isDone: false,
            color,
            name,
            category: category !== "all tasks" ? category : "no category",
        })
        .then(function (response) {
            console.log(response, "Responce send");
        })
        .catch(function (error) {
            console.log(error, "error from addData func");
        });
};

const deleteData = (id) => {
    axios
        .delete(`${apiUrl}/${id}`)
        .then((response) => {
            console.log(response, "resp Delete");
        })
        .catch((error) => {
            console.log(error, "eror in deleteDAta");
        });
};

const editData = (id, prop) => {
    axios
        .put(`${apiUrl}/${id}`, {
            ...prop,
        })
        .then(function (response) {
            console.log(response, "Responce edit");
        })
        .catch(function (error) {
            console.log(error, "error from addData func");
        });
};

const changeCategoryColor = (id, color) => {
    console.log(id, color, "id and color");
    axios
        .put(`../dBase/categories/${id}`, { color: color })
        .then(function (response) {
            console.log(response, "response setCatColor");
            return response.data;
        })
        .catch(function (error) {
            console.log(error, "Error from setCategoryColor()");
        });
};

export {
    getData,
    addData,
    deleteData,
    editData,
    addCategory,
    changeCategoryColor,
};
