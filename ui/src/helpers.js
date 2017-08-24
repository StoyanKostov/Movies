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

export const requestDispatcher = (url, params) => {
    if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(params.method) === -1) {
        throw new Error('Invalid method passed');
    }
    let xhr = new XMLHttpRequest();
    xhr.open(params.method, url, true);
    Object.entries(params.header).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
    });
    xhr.send(JSON.stringify(params.data));
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr);
            }
            reject(xhr);
        };
    });
}
