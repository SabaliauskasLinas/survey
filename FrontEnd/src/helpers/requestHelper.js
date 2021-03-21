export async function getData(url, params = {}, additionalHeaders = []) {
    const promise = await getDataPromise(url,params,additionalHeaders);
    return promise;
}

export async function postData(url, params = {}, additionalHeaders = []) {
    const promise = await postDataPromise(url,params,additionalHeaders);
    return promise;
}

export async function getDataPromise(url, params = {}, additionalHeaders = []){
    let path = [
        url,
        Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
    ].join('?');

    let headers = { 'Content-Type': 'application/json' };
    if (additionalHeaders && additionalHeaders.length > 0)
        additionalHeaders.forEach(addH => headers[addH.key] = addH.value);

    const response = await fetch(path, {
        credentials: 'include',
        method: 'GET',
        headers: headers,
    });

    return response;
}

export async function postDataPromise(url, params = {}) {
    const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })

    return response;
}