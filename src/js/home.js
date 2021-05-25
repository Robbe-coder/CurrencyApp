fetch(settings.host + "/api/transactions/", {
    'headers': {
        "Authorization": 'Bearer' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(error => {
    console.log(error);
    console.log("Het werkt niet");
});
