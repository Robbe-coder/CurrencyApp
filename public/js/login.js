"use strict";var signupBtn=document.querySelector(".button--submit");signupBtn.addEventListener("click",function(a){a.preventDefault();var b=document.querySelector("#username").value,c=document.querySelector("#password").value;fetch(settings.host+"/api/users/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:b,password:c})}).then(function(a){return a.json()}).then(function(a){if("success"===a.status){console.log("login succes");var b=a.data.token;localStorage.setItem("token",b),window.location.href="home.html"}})});