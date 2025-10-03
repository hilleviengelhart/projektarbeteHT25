document.addEventListener("DOMContentLoaded", () => {

  const filterInput = document.getElementById("filter-input");
  const sortSelect = document.getElementById("sort-select");
  const projektContainer = document.getElementById("projekt-lista");
  let allaProjekt = [];

  // Simulerar Axios-anrop och visar listan med projekt
  axios.get("harunProject.json")
    .then(response => {
      allaProjekt = response.data;
      applyFilterAndSort();
    })
    .catch(error => console.error("Fel vid inläsning:", error));

  function visaProjekt(lista) {
    projektContainer.innerHTML = "";
    lista.forEach((projekt, index) => {
      const card = document.createElement("div");
      card.classList.add("projekt-card");
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
            <h3>${projekt.titel}</h3>
            <p><strong>Kund:</strong> ${projekt.kund}</p>
            <p>${projekt.beskrivning}</p>
            ${projekt.merInfo ? `<details><summary>Mer information</summary><p>${projekt.merInfo}</p></details>` : ""}
          `;
      projektContainer.appendChild(card);
    });
  }
  // --- Bildspel
  const slideImg = document.getElementById("slide-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  let slideIndex = 0;
  const slides = [
    "harunBild1.png",
    "harunBild2.png",
    "harunBild3.png",
    "harunBild4.png",
    "harunBild5.png"
  ];

  function visaSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slideImg.src = slides[slideIndex];
  }

  prevBtn.addEventListener("click", () => visaSlide(slideIndex - 1));
  nextBtn.addEventListener("click", () => visaSlide(slideIndex + 1));
  visaSlide(slideIndex);

  // --- Animationer vid skills ---
  document.querySelectorAll('.skill').forEach((skill, index) => {
    setTimeout(() => {
      skill.classList.add('animate');
    }, index * 300); // varje skill startar 0.3s efter föregående
  });

  // Observera element som ska animeras vid scroll
  document.querySelectorAll('.kompetenser-section').forEach(el => {
    observer.observe(el);
  });

  // Filtrering och sortering - ej fungerande
  function applyFilterAndSort() {
    const search = filterInput.value.toLowerCase();
    const sortTyp = sortSelect.value;

    let lista = allaProjekt.filter(p =>
      p.titel.toLowerCase().includes(search) ||
      p.kund.toLowerCase().includes(search) ||
      p.beskrivning.toLowerCase().includes(search)
    );

    if (sortTyp === "titel") {
      lista.sort((a, b) => a.titel.localeCompare(b.titel, "sv"));
    } else if (sortTyp === "kund") {
      lista.sort((a, b) => a.kund.localeCompare(b.kund, "sv"));
    }

    visaProjekt(lista);
  }

  filterInput.addEventListener("input", applyFilterAndSort);
  sortSelect.addEventListener("change", applyFilterAndSort);
});