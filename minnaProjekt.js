// ==========================
// Hämta projekt från JSON och visa dem
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const projektLista = document.getElementById("projekt-lista");

    axios.get("./minnaProjekt.json")
        .then(svar => {
            const data = svar.data;

            data.forEach(projekt => {
                const projektDiv = document.createElement("div");
                projektDiv.classList.add("projekt");

                projektDiv.innerHTML = `
                    <h3>${projekt.titel}</h3>
                    <p><strong>Kund:</strong> ${projekt.kund}</p>
                    <p>${projekt.beskrivning}</p>
                    ${projekt.merInfo ? `<details><summary>Mer info</summary><p>${projekt.merInfo}</p></details>` : ""}
                `;

                projektLista.appendChild(projektDiv);
            });

            // Scroll-animation för projekten
            const projektElementen = document.querySelectorAll('.projekt');

            function ärSynligIViewport(element) {
                const rect = element.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            }

            function hanteraScrollProjekt() {
                projektElementen.forEach((element, index) => {
                    if (ärSynligIViewport(element) && !element.classList.contains('visible')) {
                        setTimeout(() => {
                            element.classList.add('visible');
                        }, index * 200);
                    }
                });
            }

            hanteraScrollProjekt();
            window.addEventListener('scroll', hanteraScrollProjekt);

        })
        .catch(fel => {
            console.error("Fel vid inläsning av projekt:", fel);
            projektLista.innerHTML = "<p>Kunde inte ladda projekt.</p>";
        });

// ==========================
// Fyller skillbar
// ==========================
const färgFyllningar = document.querySelectorAll('.skill-fill');

färgFyllningar.forEach(fyll => {
    const procent = fyll.getAttribute('data-percentage');
    fyll.style.width = procent;
});

// ==========================
// Stänger menyn när länk klickas
// ==========================
document.querySelectorAll('#meny a').forEach(länk => {
    länk.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});

});

// ==========================
// Bildspel
// ==========================
let nuvarandeIndex = 0;
const bilder = document.querySelectorAll(".slide");
const knappFöregående = document.querySelector(".föregående");
const knappNästa = document.querySelector(".nästa");

function visaBild(index) {
    bilder.forEach((bild, i) => {
        bild.classList.toggle('active', i === index);
    });
}

function nästaBild() {
    nuvarandeIndex = (nuvarandeIndex + 1) % bilder.length;
    visaBild(nuvarandeIndex);
}

function föregåendeBild() {
    nuvarandeIndex = (nuvarandeIndex - 1 + bilder.length) % bilder.length;
    visaBild(nuvarandeIndex);
}

// Visa första bilden vid start
visaBild(nuvarandeIndex);

// Event listeners för knapparna
if (knappNästa && knappFöregående) {
    knappNästa.addEventListener("click", nästaBild);
    knappFöregående.addEventListener("click", föregåendeBild);
}
