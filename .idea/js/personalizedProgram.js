document.addEventListener("DOMContentLoaded", function () {
    console.log("siden er loadet")
    const program = JSON.parse(sessionStorage.getItem("program"))
    console.log(program)
    addSearchButton();
    showProgram();

})

function showProgram(){
    const programDiv = document.createElement("div")
    programDiv.className = "program_div"

    const personligtProgram = JSON.parse(sessionStorage.getItem("program"))
    const formattedProgram = personligtProgram.answer.replace(/\n/g, '<br>')

    const showProgram = document.createElement("div")
    showProgram.innerHTML = formattedProgram;
    programDiv.appendChild(showProgram);

    const finalDiv = document.getElementById("personligt_program")
    finalDiv.appendChild(programDiv);
}

function addSearchButton(){
    const searchDiv = document.createElement("div")
    searchDiv.className = "serch_divclass"

    const searchButton = document.createElement("search")
    searchButton.textContent = "search for exercise"
    searchDiv.appendChild(searchButton)

    const finalDiv = document.getElementById("search_button")
    finalDiv.appendChild(searchDiv);
}