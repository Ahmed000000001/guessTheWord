let gameName = `Guess The Word`
document.title = gameName
document.querySelector("h1").innerHTML =gameName
document.querySelector("footer").innerHTML =`${gameName} Created By AHMED`

///////////////////////////////////////////////////////////////
let numberOfTries = 6
let numberOfLetters = 6
let currentTry = 1
let wordToGusee=""
const words=["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGusee=words[Math.floor(Math.random()*words.length)].toLocaleLowerCase()
console.log(wordToGusee)
let messageArea = document.querySelector(".message");
let numberOfHints = 2
//////////////////////////////
document.querySelector(".hint span").innerHTML= numberOfHints
let hintButton=document.querySelector(".hint")
hintButton.addEventListener("click", getHint)



///////////////////////////////////

function generateInput(){
    const inputContainer = document.querySelector(".inputs")
    for(i=1; i<= numberOfTries; i++){
        const tryDiv =document.createElement("div")
        tryDiv.classList.add(`try-${i}`)
        tryDiv.innerHTML= `<span>try-${i} </span>`

        if(i!== 1)tryDiv.classList.add("disabled-input")
        for(j=1;j<=numberOfLetters;j++){
            const input = document.createElement("input")
            input.type="text"
            input.id=`guess-${i}-letter-${j}`
            input.setAttribute("maxlength","1")
            tryDiv.appendChild(input)
        }
        inputContainer.appendChild(tryDiv)
    }
    inputContainer.children[0].children[1].focus()

    const inputInDisable = document.querySelectorAll(".disabled-input input")
    inputInDisable.forEach((input) => (input.disabled=true))

    const inputs = document.querySelectorAll("input")
    inputs.forEach((input, index)=>{
        input.addEventListener("input", function(){
            this.value = this.value.toUpperCase()
            const nextInput = inputs[index+1]
            if(nextInput) nextInput.focus()
        })
    input.addEventListener("keydown", function(e){
        const currntIndex = Array.from(inputs).indexOf(e.target)
        if(e.key=== "ArrowRight"){
            const nextInput=currntIndex+1
            if(nextInput<inputs.length)inputs[nextInput].focus()
        }
        if(e.key=== "ArrowLeft"){
            const prevInput = currntIndex - 1
            if(prevInput>=0)inputs[prevInput].focus()
        }

    })
    })
}
const guessButton=document.querySelector(".check")
guessButton.addEventListener("click", handleGuesses);
function handleGuesses(){
    let successGuess = true
    for(i=1;i<=numberOfLetters;i++){
        const inputField=document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const letter=inputField.value.toLocaleLowerCase()
        const acutulLetter=wordToGusee[i-1]
        if(letter===acutulLetter){
            inputField.classList.add("yes-in-place")
        }else if(wordToGusee.includes(letter)&&letter!=="" ){
            inputField.classList.add("not-in-place")
            successGuess=false
        }else{
            inputField.classList.add("no")
            successGuess=false
        }
    }
    if(successGuess){
        messageArea.innerHTML="you win"
        let allTries = document.querySelectorAll(".inputs > div")
        allTries.forEach((tryDiv)=> tryDiv.classList.add("disabled-input"))
        guessButton.disabled = true
        hintButton.disabled=true
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-input")
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        currentTryInputs.forEach((input)=> (input.disabled=true))
        currentTry++
        
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        nextTryInputs.forEach((input)=> (input.disabled=false))
        let el = document.querySelector(`.try-${currentTry}`)
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-input")
            el.children[1].focus()
        }else{
            guessButton.disabled=true
            hintButton.disabled=true
            messageArea.textContent=`you lose the word is ${wordToGusee}`
        }
    }
}
function getHint(){
    
    if(numberOfHints>0){
        numberOfHints--
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if(numberOfHints===0){
        hintButton.disabled=true
    }
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    // console.log(emptyEnabledInputs)
    if(emptyEnabledInputs.length > 0 ){
        const randomIndex=Math.floor(Math.random()*emptyEnabledInputs.length)
      
        const randomInput=emptyEnabledInputs[randomIndex]
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if(indexToFill!==-1){
            randomInput.value=wordToGusee[indexToFill].toUpperCase()
        }
    }

}

function handleBackspace(event){
    if(event.key==="Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])")
        const currentIndex=Array.from(inputs).indexOf(document.activeElement);
        if(currentIndex>0){
            const currentInput = inputs[currentIndex]
            const prvInput = inputs[currentIndex-1]
            currentInput.value=""
            prvInput.value=""
            prvInput.focus()
        }
    }
}
document.addEventListener("keydown", handleBackspace);
window.onload=function(){
    generateInput()
}









