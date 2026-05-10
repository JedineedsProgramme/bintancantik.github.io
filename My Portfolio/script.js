const panels = document.querySelectorAll(".panel")

let currentPanel = 0

window.addEventListener("wheel", (e) => {

if(e.deltaY > 0){
currentPanel++
}else{
currentPanel--
}

if(currentPanel < 0) currentPanel = 0
if(currentPanel >= panels.length) currentPanel = panels.length - 1

panels[currentPanel].scrollIntoView({
behavior:"smooth"
})

})

const firstText = "Jedidah"
const lastText = "Simangunsong"

let i = 0
let j = 0

const firstEl = document.getElementById("first-name")
const lastEl = document.getElementById("last-name")

function typeFirst(){

firstEl.classList.add("cursor")

if(i < firstText.length){
firstEl.textContent += firstText.charAt(i)
i++
setTimeout(typeFirst, 100)
}
else{

firstEl.classList.remove("cursor")

setTimeout(() => {
lastEl.classList.add("cursor")
typeLast()
},200)

}

}

function typeLast(){

if(j < lastText.length){
lastEl.textContent += lastText.charAt(j)
j++
setTimeout(typeLast, 100)
}

}

typeFirst()