const images = [
    "ellenBild4.png",
    "ellenBild3.png",
    "ellenBild1.png",
    "ellenBild2.png"
]

let currentImageIndex = 0;

const slideshowImage = document.getElementById("slideshow-image");
const tillbakaBtn = document.getElementById("tillbakaBtn");
const nästaBtn = document.getElementById("nästaBtn");

function updateImage() {
    slideshowImage.src = images[currentImageIndex];
}

nästaBtn.addEventListener("click", () => {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    updateImage();
})

tillbakaBtn.addEventListener("click", () => {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    updateImage();
})

updateImage();

// Stänger menyn
document.querySelectorAll('#meny a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
})


const JSON_FIL = 'ellenSettings.json';
const projektLista = document.getElementById('projekt-lista');
let allProjektData = []; 

const modal = document.getElementById('projekt-modal');
const stangKnapp = document.querySelector('.stang-knapp');

// Funktion för att skapa projekt-HTML
// OBS! Tar emot index som andra argument för räkning (Projekt 1, Projekt 2, etc.)
const skapaProjektHTML = ({ id, titel, kund, kort_beskrivning }, index) => {

    const rubrikPrefix = "Projekt " + index + ": ";

    return "<article class='projekt-kort'>" +
        "<h3>" + rubrikPrefix + titel + "</h3>" + 
        "<div class='knapp-wrapper'>" +
        "<button class='se-projekt-knapp' data-projekt-id='" + id + "'>" +
        "Se Projekt" +
        "</button>" +
        "</div>" +
        "</article>";
};

// Funktion för att visa modalen med detaljerad information
const visaModal = (projectId) => {
    // 1. Hitta rätt projekt i datan baserat på ID
    const projekt = allProjektData.find(p => p.id === projectId);

    if (!projekt) return; // Gör inget om projektet inte hittas

    // 2. Fyll modalen med data
    document.getElementById('modal-titel').textContent = "Projektets namn: " + projekt.titel;
    document.getElementById('modal-kund').textContent = "Kund: " + projekt.kund;
    document.getElementById('modal-beskrivning').textContent = "Beskrivning av projekt: " + projekt.kort_beskrivning;
    document.getElementById('modal-mer-info').textContent = projekt.mer_information;

    // 3. Visa modalen
    modal.classList.remove('modal-dold');
};


// Huvudfunktion för att ladda och visa projekt
const laddaProjekt = () => {
    projektLista.innerHTML = '<p>Laddar projekt...</p>';

    axios.get(JSON_FIL)
        .then(response => {
            // SPARA DATAN TILL DEN GLOBALA VARIABELN
            allProjektData = response.data;
            projektLista.innerHTML = ''; // Rensa 'Laddar projekt...'

            // NY KOD: Använd forEach för att skicka med INDEX (räknaren)
            allProjektData.forEach((projekt, index) => {
                // index + 1 gör att räkningen börjar på 1 istället för 0
                const projektHTML = skapaProjektHTML(projekt, index + 1);
                projektLista.innerHTML += projektHTML;
            });

            // 4. Lägg till klick-lyssnare på de nya knapparna
            document.querySelectorAll('.se-projekt-knapp').forEach(knapp => {
                knapp.addEventListener('click', (e) => {
                    const projektId = e.currentTarget.dataset.projektId;
                    visaModal(projektId);
                });
            });

        })
        .catch(error => {
            console.error('Kunde inte hämta projektdata:', error);
            projektLista.innerHTML = '<p class="felmeddelande">Kunde inte ladda in projekt.</p>';
        });
};

// Logik för att stänga modalen (kopplad till X-knappen)
stangKnapp.addEventListener('click', () => {
    modal.classList.add('modal-dold');
});


laddaProjekt();