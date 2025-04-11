console.log("Jeg er på exercise siden")
let data = JSON.parse(sessionStorage.getItem("trainingObject"))
console.log(data);

trainingObjectData = JSON.parse(sessionStorage.getItem("trainingObject")); // parses the JSON to a javaScript object

document.addEventListener("DOMContentLoaded", function () {
    console.log("siden er loadet")
    bodyParts.forEach(bodypart => {
        getExercises(`http://localhost:8080/exercises/bodyPart/${bodypart}`, bodypart);
        //showPictureBasedOnExercise(`http://localhost:8080/exercises/bodyPart/${bodypart}`)
    })
    addFavoriteButton()
    addGetProgramButton()

});

// fetch any url metode
function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

let bodyParts = ["chest", "shoulders", "back", "waist", "upper legs",
    "upper arms", "lower arms", "lower legs"]


// henter exercises og tilføjer de unikke til et array
async function getExercises(url, bodyPart){
    try {
        const fetchedExercises = await fetchAnyUrl(url);
        //console.log("All exercises", fetchedExercises);

        // Fjern duplikater ved at bruge Map og exercise.name som nøgle
        const uniqueExercises = Array.from(
            new Map(fetchedExercises.map(item => [item.name, item])).values());

        console.log("Unique exercises:", uniqueExercises);
        addExerciseToPage(uniqueExercises, bodyPart)
        showPictureBasedOnExercise(uniqueExercises, bodyPart);
    }catch(error){
        console.log("Could not find any exercises", error)
    }
}

// tilføjer exercises til siden ud fra bodypart
function addExerciseToPage(exercises, bodyPart){
    const exerciseDiv = document.createElement("div")
    exerciseDiv.className = "exercise_div";

    const heading = document.createElement("h3");
    heading.textContent = bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1);

    const dropDown = document.createElement("select")
    dropDown.name = bodyPart;
    dropDown.id = `select_${bodyPart}`
    dropDown.classList.add("exercise-dropdown");

    exerciseDiv.appendChild(heading)

    exercises.forEach(exercise => {
        const option = document.createElement("option")

        option.value = exercise.name

        option.textContent = exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1);
        dropDown.appendChild(option)
        //console.log(exercise.bodyPart)
    })

    exerciseDiv.appendChild(dropDown)

    const finalDiv = document.getElementById("exercise_list");
    finalDiv.appendChild(exerciseDiv);
}

// metode til at tilføje yndlingsøvelser til en liste

let favoriteExercises = []
let currentExercise = null

// tilføjer en knap til at tilføje favoritter til en liste
function addFavoriteButton(fetchedExercises){

    const favoriteDiv = document.createElement("div")
    favoriteDiv.className = "favorite_div";

    const favorite = document.createElement("button")
    favorite.id="favorite"
    favorite.textContent = "Add To Favorites"
    favoriteDiv.appendChild(favorite)

    const finalDiv = document.getElementById("favorite_button");
    finalDiv.appendChild(favoriteDiv);

    favorite.addEventListener("click", function(){
        if(currentExercise && !favoriteExercises.includes(currentExercise.name)){
            favoriteExercises.push(currentExercise.name)
            console.log("Favoritter: ", favoriteExercises)
            showFavoriteExercises()
        }
    })
}

// tilføjer en knap til at kunne få sit træningsprogram
function addGetProgramButton(){
    const getProgramDiv = document.createElement("div")
    getProgramDiv.className = "program_div"

    const program = document.createElement("button")
    program.id = "program"
    program.textContent = "Get Personal Program"
    program.type = "submit"
    getProgramDiv.appendChild(program)

    const finalDiv = document.getElementById("add_exercises")
    finalDiv.appendChild(getProgramDiv)
    }

// async function der kalder backend med et spørgsmål og får et træningssvar retur
async function askChatBotAndGetAnswer(){

    const input = document.getElementById("inputfield")
    const question = input.value;

    let url =`http://localhost:8080/exercises/chatbot`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const answer = await response.json();

        sessionStorage.setItem("chatsvar", JSON.stringify(answer));

        const responseBoxDiv = document.createElement("div")
        responseBoxDiv.className = "response_box"

        responseBoxDiv.textContent = answer.answer;

        const finalDiv = document.getElementById("chat_bot_question")
        finalDiv.appendChild(responseBoxDiv)

    } catch (error) {
        console.log("Kunne ikke finde træningsprogrammet", error)

    }
}

document.getElementById("chatBot").addEventListener("submit", function(e){
    e.preventDefault();
    console.log("Spørgsmål sendt!");
    askChatBotAndGetAnswer()
})

// viser favoritøvelser fra favoriteExercises listen
function showFavoriteExercises(){

    const listDiv = document.createElement("div")
    listDiv.className = "list_div";

    const favoritListe = document.createElement("ul")

    favoriteExercises.forEach((exercise, index) => {
        const favoritPunkt = document.createElement("li")
        favoritPunkt.textContent = exercise.charAt(0).toUpperCase() + exercise.slice(1)

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Remove from list"
        deleteButton.id = "delete"
        deleteButton.style.marginLeft = "5px"
        deleteButton.addEventListener("click", function(){
            favoriteExercises.splice(index, 1)
            showFavoriteExercises();
        })

        favoritPunkt.appendChild(deleteButton)
        favoritListe.appendChild(favoritPunkt)
    })

    listDiv.appendChild(favoritListe)

    const finalListDiv = document.getElementById("favorite_exercises")
    finalListDiv.innerHTML = "";
    finalListDiv.appendChild(listDiv)

}

// viser billede for hver exercise + ekstra informationer omkring øvelsen
async function showPictureBasedOnExercise(fetchedExercises, bodyPart){

    const pictureDiv = document.createElement("div")
    pictureDiv.className = "picture_div";

    const dropDown = document.getElementById(`select_${bodyPart}`)

    console.log("dropDown found", dropDown);  // Fejlfinding: Tjek om dropdowns findes

        dropDown.addEventListener("change", function () {
            console.log("Dropdown changed!", dropDown.value);

            const finalDiv = document.getElementById("picture_list");
            finalDiv.innerHTML = "";

            const selectedExerciseName = dropDown.value;
            const selectedExercise = fetchedExercises.find(exercise => exercise.name === selectedExerciseName);

        if(selectedExercise) {
            // for favoriteExercises list
            currentExercise = selectedExercise;

            //add a title
            const titel = document.createElement("h2")
            titel.textContent = selectedExercise.name.charAt(0).toUpperCase() + selectedExercise.name.slice(1);

            //add bodypart
            const bodyPart = document.createElement("h4")
            bodyPart.className = "description_class"
            bodyPart.textContent = "Main muscle group: " + selectedExercise.bodyPart.charAt(0).toUpperCase() + selectedExercise.bodyPart.slice(1);

            // add target
            const target = document.createElement("h4")
            target.className = "description_class"
            target.textContent = "Target: " + selectedExercise.target.charAt(0).toUpperCase() + selectedExercise.target.slice(1);

            //add equipment
            const equipment = document.createElement("h4")
            equipment.className = "description_class"
            equipment.textContent = "Equipment: " + selectedExercise.equipment.charAt(0).toUpperCase() + selectedExercise.equipment.slice(1);

            // add description
            const instruction = document.createElement("h5")
            instruction.className = "description_class"
            const beskrivelse = selectedExercise.instructions.join(" "); // konverterer array til en string
            instruction.textContent = beskrivelse;

            //add secondary muscles
            const secMuscles = document.createElement("h4")
            secMuscles.className = "description_class"
            const muscBeskrivelse = selectedExercise.secondaryMuscles.join(" & ")
            secMuscles.textContent = "Secondary muscles: " + muscBeskrivelse.charAt(0).toUpperCase() + muscBeskrivelse.slice(1);;

            // adss a picture based on link
            pictureDiv.innerHTML = "";
            console.log(selectedExercise);
            const picture = document.createElement("img");
            picture.setAttribute("src", selectedExercise.gifUrl)

            pictureDiv.appendChild(titel);
            pictureDiv.appendChild(picture);
            pictureDiv.appendChild(instruction);
            pictureDiv.appendChild(bodyPart);
            pictureDiv.appendChild(secMuscles);
            pictureDiv.appendChild(target);
            pictureDiv.appendChild(equipment);


            finalDiv.appendChild(pictureDiv);
        }else{
            console.log("Can not find exercise")
        }
    })}

// async funktion der sender brugerdata og øvelser til backend og får et træningsprogram retur
async function sendInfoAndGetProgram(){

    let url =`http://localhost:8080/exercises/program`
    brugerDatas = JSON.parse(sessionStorage.getItem("trainingObject"))

    const finalObject = {
        brugerData : JSON.stringify(brugerDatas),
        exercises : favoriteExercises
    };

    console.log(finalObject);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalObject)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const program = await response.json();

        sessionStorage.setItem("program", JSON.stringify(program));

        window.location.href = "personalizedProgram.html";

    }catch (error){
        console.log("Kunne ikke finde træningsprogrammet", error)

    }
}

// adder en loading button
function addLoadingScreen(){

    const loadingDiv = document.createElement("div")
    loadingDiv.className = "loader"

    const exerciseDiv = document.getElementById("add_exercises")
    exerciseDiv.appendChild(loadingDiv);

}

document.getElementById("brugerform").addEventListener("submit", function(e){
    e.preventDefault();
    console.log("Form sendt!");
    sendInfoAndGetProgram();
    addLoadingScreen();

})

// sessionStorage.setItem("trainingExercises", JSON.stringify(favoriteExercises));



/*function addExerciseToPage(exercises){
    exerciseDiv = document.createElement("div")
    exerciseDiv.className = "exercise_div";

    const dropDownChest = document.createElement("select")
    const dropDownWaist = document.createElement("select")
    const dropDownBack = document.createElement("select")
    const dropDownUpperLegs = document.createElement("select")
    const dropDownUpperArms = document.createElement("select")
    const dropDownShoulders = document.createElement("select")
    const dropDownLowerArms = document.createElement("select")
    const dropDownLowerLegs = document.createElement("select")

    exercises.forEach(exercise => {
        console.log(exercise.bodyPart)
    if(exercise.bodyPart === "chest") {
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name;
        option.label
        dropDownChest.appendChild(option)
        console.log(exercise.bodyPart)
    }else if(exercise.bodyPart === "waist"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownWaist.appendChild(option)
    }else if(exercise.bodyPart === "back"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownBack.appendChild(option)
    }else if(exercise.bodyPart === "upper legs"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownUpperLegs.appendChild(option)
    }else if(exercise.bodyPart === "upper arms"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownUpperArms.appendChild(option)
    }else if(exercise.bodyPart === "shoulders"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownShoulders.appendChild(option)
    }else if(exercise.bodyPart === "lower arms"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownLowerArms.appendChild(option)
    }else if(exercise.bodyPart === "lower legs"){
        const option = document.createElement("option")
        option.value = exercise.name;
        option.textContent = exercise.name
        dropDownLowerLegs.appendChild(option)
    }else{
        console.log("Could not find any bodyPart")
    }
    });

    exerciseDiv.appendChild(dropDownChest)
    exerciseDiv.appendChild(dropDownWaist)
    exerciseDiv.appendChild(dropDownBack)
    exerciseDiv.appendChild(dropDownUpperLegs)
    exerciseDiv.appendChild(dropDownUpperArms)
    exerciseDiv.appendChild(dropDownShoulders)
    exerciseDiv.appendChild(dropDownLowerArms)
    exerciseDiv.appendChild(dropDownLowerLegs)

    finalDiv = document.getElementById("exercise_list")
    finalDiv.appendChild(exerciseDiv);

} */

