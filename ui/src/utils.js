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
    if(typeof params.header !== 'undefined'){
        Object.entries(params.header).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });
    }
    // xhr.withCredentials = true;
    // credentials: 'include'
    xhr.send(JSON.stringify(params.data));
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            let response;
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if(xhr.status === 0){
                    try{
                        response = JSON.parse(xhr.responseText);
                    } catch(err){
                        response = { 'message': 'No response from server' }
                    }
                    return reject(response);
                }
                return resolve(JSON.parse(xhr.responseText));
            }
        };
    });
}
