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

const visaModal = (projectId) => {
    const projekt = allProjektData.find(p => p.id === projectId);

    if (!projekt) return;

    document.getElementById('modal-titel').textContent = "Projektets namn: " + projekt.titel;
    document.getElementById('modal-kund').textContent = "Kund: " + projekt.kund;
    document.getElementById('modal-beskrivning').textContent = "Beskrivning av projekt: " + projekt.kort_beskrivning;
    document.getElementById('modal-mer-info').textContent = projekt.mer_information;

    modal.classList.remove('modal-dold');
};

const laddaProjekt = () => {
    projektLista.innerHTML = '<p>Laddar projekt...</p>';

    axios.get(JSON_FIL)
        .then(response => {
            allProjektData = response.data;
            projektLista.innerHTML = '';
            allProjektData.forEach((projekt, index) => {
                const projektHTML = skapaProjektHTML(projekt, index + 1);
                projektLista.innerHTML += projektHTML;
            });

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

stangKnapp.addEventListener('click', () => {
    modal.classList.add('modal-dold');
});


laddaProjekt();