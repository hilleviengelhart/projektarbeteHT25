// Hämta knappar och bilder för bildspel
const bilder = document.querySelectorAll('.bildspel img');
const btnFramåt = document.querySelector('#knapp-fram');
const btnBakåt = document.querySelector('#knapp-bak');

let aktuellBildIndex = 0;

function visaBild(index) {
  bilder.forEach((bild, i) => {
    bild.style.display = (i === index) ? 'block' : 'none';
  });
}


function visaNästa() {
  aktuellBildIndex = (aktuellBildIndex + 1) % bilder.length;
  visaBild(aktuellBildIndex);
}

function visaFöregående() {
  aktuellBildIndex = (aktuellBildIndex - 1 + bilder.length) % bilder.length;
  visaBild(aktuellBildIndex);
}


if (btnFramåt && btnBakåt) {
  btnFramåt.addEventListener('click', visaNästa);
  btnBakåt.addEventListener('click', visaFöregående);
}

visaBild(aktuellBildIndex);





// Projekt delen


if (typeof axios !== 'undefined') {
  axios.get('hillevi.json')  
    .then(function(response) {
      const projektLista = response.data;
      visaProjekt(projektLista);
    })
    .catch(function(error) {
      console.error('Fel vid inläsning ', error);
    });
} else {
  console.error('Axios är ej inkluderat');
}


function visaProjekt(projektData) {
  const container = document.getElementById('projektLista');
  if (!container) return;
  container.innerHTML = '';

  projektData.forEach((projekt, index) => {

    const projektDiv = document.createElement('div');
    projektDiv.style.border = '1px solid #ccc';
    projektDiv.style.padding = '10px';
    projektDiv.style.marginBottom = '10px';

    
    const namnEl = document.createElement('h4');
    namnEl.textContent = projekt.namn;
    projektDiv.appendChild(namnEl);

    
    const btn = document.createElement('button');
    btn.textContent = 'Visa mer';
    btn.dataset.index = index;

    // Element för att visa projektbeskrivningen
    const infoEl = document.createElement('div');
    infoEl.textContent = projekt.Beskrivning;
    infoEl.style.display = 'none';
    infoEl.style.marginTop = '8px';

    
    

    
    btn.onclick = () => {
      if (infoEl.style.display === 'none') {
        infoEl.style.display = 'block';
        btn.textContent = 'Dölj';
      } else {
        infoEl.style.display = 'none';
        btn.textContent = 'Visa mer';
      }
    };

    
    projektDiv.appendChild(btn);
    projektDiv.appendChild(infoEl);

   
    container.appendChild(projektDiv);
  });
}

