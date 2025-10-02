// Hämta knappar och bilder för bildspel
const bilder = document.querySelectorAll('.bildspel img');
const btnFramåt = document.querySelector('#knapp-fram');
const btnBakåt = document.querySelector('#knapp-bak');

let aktuellBildIndex = 0;

// Funktion för att visa vald bild
function visaBild(index) {
  bilder.forEach((bild, i) => {
    bild.style.display = (i === index) ? 'block' : 'none';
  });
}

// Funktion för att visa nästa bild
function visaNästa() {
  aktuellBildIndex = (aktuellBildIndex + 1) % bilder.length;
  visaBild(aktuellBildIndex);
}

// Funktion för att visa föregående bild
function visaFöregående() {
  aktuellBildIndex = (aktuellBildIndex - 1 + bilder.length) % bilder.length;
  visaBild(aktuellBildIndex);
}

// Lägg till eventlyssnare för knappar
if (btnFramåt && btnBakåt) {
  btnFramåt.addEventListener('click', visaNästa);
  btnBakåt.addEventListener('click', visaFöregående);
}

// Visa första bilden vid laddning
visaBild(aktuellBildIndex);


// Hämtar och visar projekten med Axios


// Kontrollera att axios är inkluderat i HTML i <head> eller precis innan slutet av <body>
if (typeof axios !== 'undefined') {
  axios.get('hillevi.json')  // byt till rätt filnamn om annat
    .then(function(response) {
      const projektLista = response.data;
      visaProjekt(projektLista);
    })
    .catch(function(error) {
      console.error('Fel vid inläsning av data:', error);
    });
} else {
  console.error('Axios är inte inkluderat');
}

// Funktion för att visa projekten
function visaProjekt(projektData) {
  const container = document.getElementById('projektLista');
  if (!container) return;
  container.innerHTML = '';

  projektData.forEach((projekt, index) => {
    const projektDiv = document.createElement('div');
    projektDiv.style.border = '1px solid #ccc';
    projektDiv.style.padding = '10px';
    projektDiv.style.marginBottom = '10px';

    // Projektets namn
    const namnEl = document.createElement('h4');
    namnEl.textContent = projekt.namn;
    projektDiv.appendChild(namnEl);

    // "Visa mer" knapp
    const btn = document.createElement('button');
    btn.textContent = 'Visa mer';
    btn.dataset.index = index;

    // Element för att visa projektbeskrivningen
    const infoEl = document.createElement('div');
    infoEl.textContent = projekt.Beskrivning;
    infoEl.style.display = 'none';
    infoEl.style.marginTop = '8px';

    
    

    // Toggle funktion för "Visa mer"/"Dölj"
    btn.onclick = () => {
      if (infoEl.style.display === 'none') {
        infoEl.style.display = 'block';
        btn.textContent = 'Dölj';
      } else {
        infoEl.style.display = 'none';
        btn.textContent = 'Visa mer';
      }
    };

    // Lägg till knappen och info-element till projektet
    projektDiv.appendChild(btn);
    projektDiv.appendChild(infoEl);

    // Lägg till hela projekt-div
    container.appendChild(projektDiv);
  });
}


