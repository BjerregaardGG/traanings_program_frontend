console.log("vi er på forsiden");

// js objekt der opfører sig som et map med key value pairs
const aktivitetBeskrivelse = {
    "Meget stillesidende": "Ingen eller næsten ingen fysisk aktivitet.",
    "Lidt aktiv": "Overvejende stillesiddende med lidt bevægelse, f.eks. kontorarbejde.",
    "Moderat aktiv": "Let træning 1-3 gange om ugen eller bevægelse i hverdagen.",
    "Aktiv": "Træning flere gange om ugen eller fysisk krævende job.",
    "Meget aktiv": "Daglig hård træning eller meget fysisk arbejde."
}

const niveauBeskrivelse = {
    "begynder": "Jeg har aldrig rigtig trænet før",
    "lettere øvet": "Jeg har dyrket andre former for sport",
    "øvet": "Jeg har dyrket en del fitness eller anden sport (1-3 gange om ugen)",
    "avanceret": "Jeg dyrker fitness eller anden sport fast (4+ gange om ugen)"
}

document.getElementById("aktivitetsniveau").addEventListener("change", function(){
    const valgteNiveau = this.value; // koblet til value i html for option
    document.getElementById("aktiv_beskrivelse").textContent = aktivitetBeskrivelse[valgteNiveau];
})

document.getElementById("niveau").addEventListener("change", function(){
    const valgteNiveau = this.value;
    document.getElementById("niveau_beskrivelse").textContent = niveauBeskrivelse[valgteNiveau];

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



