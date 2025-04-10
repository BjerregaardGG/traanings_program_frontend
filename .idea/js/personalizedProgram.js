document.addEventListener("DOMContentLoaded", function () {
    console.log("siden er loadet")
    const program = JSON.parse(sessionStorage.getItem("program"))
    console.log(program)
    //addSearchButton();
    showProgram();

})

function showProgram(){
    const programDiv = document.createElement("div")
    programDiv.className = "program_div"

    const personligtProgram = JSON.parse(sessionStorage.getItem("program"))
    let formattedProgram = personligtProgram.answer.replace(/\n/g, '<br>')

    // Gør linjer der starter med "Day" til fed skrift
    // matcher start, day og til til br
    formattedProgram = formattedProgram.replace(/(^|\<br\>)Day.*?(?=\<br\>|$)/g, match => {
        return `<strong>${match}</strong><br>`;
    });

    const showProgram = document.createElement("div")
    showProgram.innerHTML = formattedProgram;
    showProgram.style.fontSize = "15px";
    showProgram.style.fontFamily = "'Helvetica'";
    programDiv.appendChild(showProgram);

    const finalDiv = document.getElementById("personligt_program")
    finalDiv.appendChild(programDiv);
}


// downloade program - opretter blob objekt og laver url der på usynligt download link
document.getElementById("downloadBtn").addEventListener("click", function(){

    const program = JSON.parse(sessionStorage.getItem("program")).answer;

    // Binary Large Object - data container
    const blob = new Blob([program], {type: "text/plain"});
    const url = URL.createObjectURL(blob)

    // usynligt download link - reagerer på click()
    const a = document.createElement("a")
    a.href = url
    a.download = "træningsprogram.txt"
    a.click();
    URL.revokeObjectURL(url);



})

/*
function addSearchButton(){
    const searchDiv = document.createElement("div")
    searchDiv.className = "serch_divclass"

    const searchButton = document.createElement("search")
    searchButton.textContent = "search for exercise"
    searchDiv.appendChild(searchButton)

    const finalDiv = document.getElementById("search_button")
    finalDiv.appendChild(searchDiv);
}*/