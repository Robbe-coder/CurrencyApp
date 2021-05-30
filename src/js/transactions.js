window.addEventListener("load",()=>{

    fetch(settings.host + "/api/transactions/", {
        method:"get",
        headers: {
            "Authorization": 'Bearer  ' + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        
        if(json.transactions.length !==0){
            let arrayLength = json.transactions.length;
            
            for(let i = arrayLength -1; i >= 0;i--){

                
                let transactionElement = document.querySelector(".transactions");
                let card = document.createElement("div");
                card.classList.add("transaction__card");
                let imageCard = document.createElement("img");
                imageCard.classList.add("icon");
                imageCard.src ="images/credit-card.svg";
                let text = document.createElement("p");
                text.classList.add("transaction__text");
                let span = document.createElement("span");
                let imageArrow = document.createElement("img");
                span.classList.add("transaction__text--highlight");
                imageArrow.classList.add("icon");
                
                
               if(json.personid === json.transactions[i].person_to_id){
                    
                    text.innerHTML = ` received `;
                    span.innerHTML = `${json.transactions[i].amount} coins`;
                    imageArrow.src="images/arrow-left.svg"
                  
                }
                else{
                    text.innerHTML = ` sent `;
                    span.innerHTML = `${json.transactions[i].amount} coins`;
                    imageArrow.src="images/arrow-right.svg"
                   
                }
                text.appendChild(span);
                card.appendChild(imageCard);
                card.appendChild(text);
                card.appendChild(imageArrow);
                transactionElement.appendChild(card);
                //document.querySelector(".transaction__text").innerHTML = `${json.transactions[i].amount} + ${json.transactions[i].message}`;
                
            }
        }

    }).catch(error => {
        console.log(error);
        console.log("Het werkt niet");
    });
    
})
