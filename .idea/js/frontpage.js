console.log("vi er på forsiden");

// js objekt der opfører sig som et map med key value pairs
const activityDescription = {
    "Very sedentary": "No or almost no physical activity.",
    "Lightly active": "Mostly sedentary with some movement, e.g., office work.",
    "Moderately active": "Light exercise 1–3 times a week or general daily movement.",
    "Active": "Exercise several times a week or physically demanding job.",
    "Very active": "Daily intense exercise or very physical work."
};

const trainingLevelDescription = {
    "beginner": "I have never really trained before.",
    "some_experience": "I have practiced other forms of sport.",
    "experienced": "I have done a fair amount of fitness or other sports (1–3 times a week).",
    "advanced": "I do fitness or other sports regularly (4+ times a week)."
};

document.getElementById("aktivitetsniveau").addEventListener("change", function(){
    const valgteNiveau = this.value; // koblet til value i html for option
    document.getElementById("aktiv_beskrivelse").textContent = activityDescription[valgteNiveau];
})

document.getElementById("niveau").addEventListener("change", function(){
    const valgteNiveau = this.value;
    document.getElementById("niveau_beskrivelse").textContent = trainingLevelDescription[valgteNiveau];

})

document.getElementById("brugerform").addEventListener("submit", function(e) {
    e.preventDefault(); // Stopper default navigation

    const formData = new FormData(this); // Samler alle inputfelter og deres værdier i ét objekt.
    const data = {}; // formData konverteres til et almindeligt JavaScript-objekt (et "plain object")

    formData.forEach((value, key) => {
        data[key] = value; // Key er navnet på inputfeltet, og value er det brugeren har skrevet
    })

    sessionStorage.setItem("trainingObject", JSON.stringify(data)); // converts trainingData object to JSON - later we convert the JSON back to an object

    window.location.href = "exercises.html";
});



