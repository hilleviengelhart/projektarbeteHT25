const projektLista = document.getElementById("projekt-lista");

axios.get("projekt.json")
  .then(response => {
    const data = response.data;

    // Filtrera ut Minnas projekt
    const minnasProjekt = data.filter(projekt => projekt.anstalld === "minna");

    minnasProjekt.forEach(projekt => {
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
  })
  .catch(error => {
    console.error("Fel vid inläsning av projekt:", error);
    projektLista.innerHTML = "<p>Kunde inte ladda projekt 😢</p>";
  });
