document.addEventListener('DOMContentLoaded', () => {

    const projektLista = document.getElementById("projekt-lista");
    const filterInput = document.getElementById("projekt-filter");
    const sortBtn = document.getElementById("projekt-sort");
    let projektData = [];

    // HÄMTA PROJEKT FRÅN J-SON
    axios.get("./minnaProjekt.json")
        .then(response => {
            projektData = response.data;
            visaProjekt(projektData);
        })
        .catch(error => {
            console.error("Fel vid inläsning av projekt:", error);
            projektLista.innerHTML = "<p>Kunde inte ladda projekt.</p>";
        });

    // VISA PROJEKT
    function visaProjekt(data) {
        projektLista.innerHTML = "";
        data.forEach((projekt, index) => {
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

        // SCROLL-ANIMATION FÖR PROJEKT
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
    }

    // FILTRERA PROJEKT BASERAT PÅ NAMN
    if (filterInput) {
        filterInput.addEventListener('input', () => {
            const text = filterInput.value.toLowerCase();
            const filtrerade = projektData.filter(proj => proj.titel.toLowerCase().includes(text));
            visaProjekt(filtrerade);
        });
    }

    // SORTERA PROJEKT
    if (sortBtn) {
        let sortAscending = true;
        sortBtn.addEventListener('click', () => {
            projektData.sort((a, b) => {
                const tA = a.titel.toLowerCase();
                const tB = b.titel.toLowerCase();
                if (tA < tB) return sortAscending ? -1 : 1;
                if (tA > tB) return sortAscending ? 1 : -1;
                return 0;
            });
            sortAscending = !sortAscending;
            visaProjekt(projektData);
        });
    }

    //SKILLBARS
    const färgFyllningar = document.querySelectorAll('.skill-fill');
    färgFyllningar.forEach(fyll => {
        const procent = fyll.getAttribute('data-percentage');
        fyll.style.width = procent;
    });

    // STÄNGA MENY VID KLICK MENY
    document.querySelectorAll('#meny a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menu-toggle').checked = false;
        });
    });

    //BILDSPEL
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

    visaBild(nuvarandeIndex);


    if (knappNästa && knappFöregående) {
        knappNästa.addEventListener("click", nästaBild);
        knappFöregående.addEventListener("click", föregåendeBild);
    }
});
