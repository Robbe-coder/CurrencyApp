const signupBtn = document.querySelector(".button--submit");

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let username = document.querySelector("#username").value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let passwordRepeat = document.querySelector("#password-repeat").value;

    if(password === passwordRepeat) {
        fetch("http://localhost:3000/api/users/signup", { // Variabele toevoegen
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        }).then(response => {
            return response.json();

        }).then(json => {
            if(json.status === "succes") {
                console.log("signup succes");
                document.querySelector('#username').value = "";
                document.querySelector('#email').value = "";
                document.querySelector('#password').value = "";
                document.querySelector('#password-repeat').value = "";
            }
        });
    }
    else {
        console.log("Passwords don't match.");
    }
    
});