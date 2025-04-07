console.log("Jeg er på exercise siden")

trainingObjectData = JSON.parse(sessionStorage.getItem("trainingObject")); // parses the JSON to a javaScript object

document.addEventListener("DOMContentLoaded", function () {
    console.log("siden er loadet")
    bodyParts.forEach(bodypart => {
        getExercises(`http://localhost:8080/exercises/bodyPart/${bodypart}`, bodypart);
        //showPictureBasedOnExercise(`http://localhost:8080/exercises/bodyPart/${bodypart}`)
    })
    addFavoriteButton()
});

function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

let bodyParts = ["chest", "shoulders", "back", "waist", "upper legs",
    "upper arms", "lower arms", "lower legs"]

//let url = "http://localhost:8080/exercises" // evt bare hent for bodypart og så kald funktionen på de forskellige muskelgrupper
//let urlChest = "http://localhost:8080/exercises/bodyPart/chest"

async function getExercises(url, bodyPart){
    try {
        const fetchedExercises = await fetchAnyUrl(url);
        //console.log("All exercises", fetchedExercises);

        // Fjern duplikater ved at bruge Map og exercise.name som nøgle
        const uniqueExercises = Array.from(
            new Map(fetchedExercises.map(item => [item.name, item])).values());

        //console.log("Unique exercises:", uniqueExercises);
        addExerciseToPage(uniqueExercises, bodyPart)
        showPictureBasedOnExercise(uniqueExercises, bodyPart);
    }catch(error){
        console.log("Could not find any exercises", error)
    }
}

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
        option.value = exercise.name;
        option.textContent = exercise.name;
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

function addFavoriteButton(fetchedExercises){

    const favoriteDiv = document.createElement("div")
    favoriteDiv.className = "favorite_div";

    const favorite = document.createElement("button")
    favorite.id="favorite"
    favorite.textContent = "Add to favorites"
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

function showFavoriteExercises(){

    const listDiv = document.createElement("div")
    listDiv.className = "list_div";

    const favoritListe = document.createElement("ul")
    favoriteExercises.forEach(exercise => {
        const favoritPunkt = document.createElement("li")
        favoritPunkt.textContent = exercise
        favoritListe.appendChild(favoritPunkt)
    })

    listDiv.appendChild(favoritListe)

    const finalListDiv = document.getElementById("favorite_exercises")
    finalListDiv.innerHTML = "";
    finalListDiv.appendChild(listDiv)

}


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

            currentExercise = selectedExercise;

            // adss a picture based on link
            pictureDiv.innerHTML = "";
            console.log(selectedExercise);
            const picture = document.createElement("img");
            picture.setAttribute("src", selectedExercise.gifUrl)
            console.log("test")

            picture.setAttribute("alt", "x")
            picture.setAttribute("width", 150)
            picture.setAttribute("height", 180)

            pictureDiv.appendChild(picture);
            finalDiv.appendChild(pictureDiv);
        }else{
            console.log("Can not find exercise")
        }
    })}


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

