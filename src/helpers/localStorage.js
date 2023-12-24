const setLocalStorage = (prop = "", value) => {
    const data =
        typeof value === "string"
            ? localStorage.setItem(prop, value)
            : localStorage.setItem(prop, JSON.stringify(value));
    return data;
};

const getLocalStorage = (prop = "", isArray = false) => {
    const responce = isArray
        ? JSON.parse(localStorage.getItem(prop))
        : localStorage.getItem(prop);

    return responce;
};

export { setLocalStorage, getLocalStorage };
