"use strict";var names=["Bob Storms","Bob Dylan","Bob Marley","Bob Ross"],inputUsername=document.getElementById("name");console.log(inputUsername),autocomplete(inputUsername,names);function autocomplete(a,c){function d(a){return!!a&&void(e(a),g>=a.length&&(g=0),0>g&&(g=a.length-1),a[g].classList.add("form__autocomplete--active"))}function e(a){for(var b=0;b<a.length;b++)a[b].classList.remove("form__autocomplete--active")}function f(b){for(var c=document.getElementsByClassName("form__autocomplete-items"),d=0;d<c.length;d++)b!=c[d]&&b!=a&&c[d].parentNode.removeChild(c[d])}var g;a.addEventListener("input",function(){var d,e,h,j=this.value;if(f(),!j)return!1;for(g=-1,d=document.createElement("DIV"),d.setAttribute("id",this.id+"autocomplete-list"),d.setAttribute("class","form__autocomplete-items"),this.parentNode.appendChild(d),h=0;h<c.length;h++)c[h].substr(0,j.length).toUpperCase()==j.toUpperCase()&&(e=document.createElement("DIV"),e.innerHTML="<strong>"+c[h].substr(0,j.length)+"</strong>",e.innerHTML+=c[h].substr(j.length),e.innerHTML+="<input type='hidden' value='"+c[h]+"'>",e.addEventListener("click",function(){a.value=this.getElementsByTagName("input")[0].value,f()}),d.appendChild(e))}),a.addEventListener("keydown",function(a){var b=document.getElementById(this.id+"autocomplete-list");b&&(b=b.getElementsByTagName("div")),40==a.keyCode?(g++,d(b)):38==a.keyCode?(g--,d(b)):13==a.keyCode&&(a.preventDefault(),-1<g&&b&&b[g].click())}),document.addEventListener("click",function(a){f(a.target)})}