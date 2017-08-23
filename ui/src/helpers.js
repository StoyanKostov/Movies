export const delay = (func, wait) => {
    let timeOut;
    return (...params) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            if (typeof func !== 'function') {
                throw new Error("Validation error");
            }
            func(...params);
        }, wait);
    };
};