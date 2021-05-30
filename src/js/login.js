const signupBtn = document.querySelector(".button--submit");

signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    
        fetch(settings.host + "/api/users/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => {
            return response.json();

        }).then(json => {
            if(json.status === "success"){
                console.log("login succes")
                let token = json.data.token;
                localStorage.setItem("token",token);
                window.location.href = "home";
            }
        })
    
});