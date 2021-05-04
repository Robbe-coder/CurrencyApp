const signupBtn = document.querySelector(".button--submit");

signupBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let passwordRepeat = document.querySelector("#password-repeat").value;

    if(password === passwordRepeat){
        fetch('http://localhost:3000/users/signup',{
            method: "post",
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(response => {
            return response.json();

        }).then(json => {
            if(json.status === "succes"){
                console.log("signup succes")
                document.querySelector('#name').value="";
                document.querySelector('#email').value ="";
                document.querySelector('#password').value ="";
                document.querySelector('#password-repeat').value ="";
            }
        })
    }
    else{
        console.log(`passwords don't match`)
    }
    
});