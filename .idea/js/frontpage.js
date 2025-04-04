console.log("vi er på forsiden");

// fetch function to fetch films
function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

// js objekt der opfører sig som et map med key value pairs
const aktivitetBeskrivelse = {
    "1": "Ingen eller næsten ingen fysisk aktivitet.",
    "2": "Overvejende stillesiddende med lidt bevægelse, f.eks. kontorarbejde.",
    "3": "Let træning 1-3 gange om ugen eller bevægelse i hverdagen.",
    "4": "Træning flere gange om ugen eller fysisk krævende job.",
    "5": "Daglig hård træning eller meget fysisk arbejde."
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

