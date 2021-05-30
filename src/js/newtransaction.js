const newTransactionButton = document.querySelector(".button--submit");
const inputUsername = document.getElementById("name");

newTransactionButton.addEventListener("click", (e) => {
    e.preventDefault();

    let userIdTo = document.getElementById("name").dataset.userid;
    let amount = parseInt(document.getElementById("amount").value);
    let reason = document.getElementById("reason").value;
    let message = document.getElementById("message").value;

    fetch(settings.host + "/api/transactions", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer  ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "person_to_id": userIdTo,
            "amount": amount,
            "reason": reason,
            "message": message
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success") {
            document.getElementById("name").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("reason").value = "Helping out";
            document.getElementById("message").value = "";
            
            let formSuccess = document.querySelector(".form__success");
            formSuccess.innerText = "Succesfully made a transaction!";
            formSuccess.style.display = "flex";
        } else if(json.status === "error") {
            document.getElementById("name").value = "";
            document.getElementById("amount").value = "";
            document.getElementById("reason").value = "Helping out";
            document.getElementById("message").value = "";
            
            let formError = document.querySelector(".form__error");
            formError.innerText = json.error;
            formError.style.display = "flex";
        }
    });

});

// Code inspired by: https://www.w3schools.com/howto/howto_js_autocomplete.asp

inputUsername.addEventListener("keyup", function (e) {

    fetch(settings.host + "/api/users?name=" + e.target.value, {
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
                let username = users[i].name;
                let userId = users[i]._id;

                let newValue = document.createElement("div");
                newValue.innerHTML = username;
                newValue.innerHTML += "<input type='hidden' value='" + username + "' data-userid='" + userId + "'>";
                newValue.addEventListener("click", function (e) {
                    let option = this.getElementsByTagName("input")[0];
                    inputUsername.dataset.userid = option.dataset.userid;
                    inputUsername.value = option.value;
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

fetch(settings.host + "/api/users/amount", {
    method:"get",
    headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    let amount = json.transactions[0].amount;
    document.querySelector(".balance__data").innerHTML = amount;

}).catch(error => {
    console.log(error);
    console.log("Het werkt niet");
});