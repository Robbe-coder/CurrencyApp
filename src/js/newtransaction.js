let names = [];

const inputUsername = document.getElementById("name");
console.log(inputUsername);

inputUsername.addEventListener("keyup", function (e) {

    fetch(settings.host + "/api/users?username=" + e.target.value, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        /*close any already open lists of autocompleted values*/
        closeAllLists();

        /*create a DIV element that will contain the items (values):*/
        let allValues = document.createElement("div");
        allValues.setAttribute("id", this.id + "autocomplete-list");
        allValues.setAttribute("class", "form__autocomplete-items");

        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(allValues);

        let users = json.user;
        if(users) {
            for(var i = 0; i < users.length; i++) {
                let username = users[i].username;

                /*create a DIV element for each matching element:*/
                let newValue = document.createElement("div");
                /*make the matching letters bold:*/
                newValue.innerHTML = username;
                /*insert a input field that will hold the current array item's value:*/
                newValue.innerHTML += "<input type='hidden' value='" + username + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                newValue.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inputUsername.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
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
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("form__autocomplete-items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inputUsername) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});