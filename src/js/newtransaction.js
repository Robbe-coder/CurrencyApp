let names = [];

const inputUsername = document.getElementById("name");
console.log(inputUsername);

// Code inspired by: https://www.w3schools.com/howto/howto_js_autocomplete.asp

inputUsername.addEventListener("keyup", function (e) {

    fetch(settings.host + "/api/users?username=" + e.target.value, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        closeAllLists();

        let allValues = document.createElement("div");
        allValues.setAttribute("id", this.id + "autocomplete-list");
        allValues.setAttribute("class", "form__autocomplete-items");

        this.parentNode.appendChild(allValues);

        let users = json.user;
        if(users) {
            for(var i = 0; i < users.length; i++) {
                let username = users[i].username;

                let newValue = document.createElement("div");
                newValue.innerHTML = username;
                newValue.innerHTML += "<input type='hidden' value='" + username + "'>";
                newValue.addEventListener("click", function (e) {
                    inputUsername.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                allValues.appendChild(newValue);
            }
        } else {
            closeAllLists();
        }
    });

});

function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("form__autocomplete-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inputUsername) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});