import { authenticationHelper, logout } from "./authenticationHelper";

export async function getData(endpoint, params = {}, additionalHeaders = []) {
    let authHeader = getAuthHeader();
    if (authHeader)
        additionalHeaders.push(authHeader);

    const promise = await getDataPromise(endpoint,params,additionalHeaders);
    return promise;
}

export async function getDataPromise(endpoint, params = {}, additionalHeaders = []){
    let path = [
        process.env.REACT_APP_SERVER_URL + endpoint,
        Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
    ].join('?');

    let headers = { 'Content-Type': 'application/json' };
    if (additionalHeaders && additionalHeaders.length > 0)
        additionalHeaders.forEach(addH => headers[addH.key] = addH.value);

    const response = await fetch(path, {
        method: 'GET',
        headers: headers,
    });

    return handleResponse(response);
}

export async function postData(endpoint, params = {}, additionalHeaders = []) {
    let authHeader = getAuthHeader();
    if (authHeader)
        additionalHeaders.push(authHeader);

    const promise = await postDataPromise(endpoint,params,additionalHeaders);
    return promise;
}

export async function postDataPromise(endpoint, params = {}, additionalHeaders = []) {
    let headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    if (additionalHeaders && additionalHeaders.length > 0)
        additionalHeaders.forEach(addH => headers[addH.key] = addH.value);
    
    const response = await fetch(process.env.REACT_APP_SERVER_URL + endpoint, {
        mode: 'cors',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })

    return handleResponse(response);
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                logout();
                window.location.href = '/';
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function getAuthHeader() {
    const currentUser = authenticationHelper.currentUserValue;
    if (currentUser && currentUser.token) {
        return { 
            key: 'Authorization',
            value: `Bearer ${currentUser.token}`
        };
    } else {
        return null;
    }
}