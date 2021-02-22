function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(response => {
            return checkStatus(response)
        })
        .then(response => {
            return response.text()
                .then(text => (text) ? JSON.parse(text) : '')
        });
}

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 400 ) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error;
}

export function getRepLogs() {
    return fetchJson('/reps')
        .then(data => data.items);

    // return fetch('/reps', {
    //     credentials: 'same-origin'
    // })
    //     .then(reponse => {
    //         return reponse.json().then((data) => data.items);
    //     })
}

export function deleteRepLogs(id) {
    return fetchJson(`/reps/${id}`, {
        method: 'DELETE'
    })

    // return fetch(`/reps/${id}`, {
    //     credentials: 'same-origin',
    //     method: 'DELETE'
    // })
}

export function createRepLogs(repLog) {
    return fetchJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        header: {
            'Content-Type': 'application/json',
        }
    })
}