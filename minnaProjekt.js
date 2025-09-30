// ==========================
// Hämta projekt från JSON och visa dem
// ==========================
document.addEventListener('DOMContentLoaded', () => {
    const projektLista = document.getElementById("projekt-lista");

    axios.get("./minnaProjekt.json")
        .then(response => {
            const data = response.data;

            data.forEach(projekt => {
                const div = document.createElement("div");
                div.classList.add("projekt");

                div.innerHTML = `
                    <h3>${projekt.titel}</h3>
                    <p><strong>Kund:</strong> ${projekt.kund}</p>
                    <p>${projekt.beskrivning}</p>
                    ${projekt.merInfo ? `<details><summary>Mer info</summary><p>${projekt.merInfo}</p></details>` : ""}
                `;

                projektLista.appendChild(div);
            });

            // Scroll-animation för projekten
            const projektElements = document.querySelectorAll('.projekt');

            function isInViewport(el) {
                const rect = el.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            }

            function handleScrollProjects() {
                projektElements.forEach((el, index) => {
                    if (isInViewport(el) && !el.classList.contains('visible')) {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 200);
                    }
                });
            }

            handleScrollProjects();
            window.addEventListener('scroll', handleScrollProjects);

        })
        .catch(error => {
            console.error("Fel vid inläsning av projekt:", error);
            projektLista.innerHTML = "<p>Kunde inte ladda projekt.</p>";
        });

    // ==========================
    // Fyller skillbar
    // ==========================
    const skillFills = document.querySelectorAll('.skill-fill');

    skillFills.forEach(fill => {
        const percentage = fill.getAttribute('data-percentage');
        fill.style.width = percentage;
    });

    // ==========================
    // Stänger menyn när länk klickas
    // ==========================
    document.querySelectorAll('#meny a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('menu-toggle').checked = false;
        });
    });
});

// ==========================
// Bildspel
// ==========================
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".föregående");
const nextBtn = document.querySelector(".nästa");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

// Event listeners för knapparna
if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
}

// Visa första bilden
showSlide(currentIndex);
