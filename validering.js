const form = document.getElementById("kontaktformulär");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameFeedback = document.getElementById("nameFeedback");
const phoneFeedback = document.getElementById("phoneFeedback");
const emailFeedback = document.getElementById("emailFeedback");
const messageFeedback = document.getElementById("messageFeedback");

// Valideringsfunktioner
function validateName() {
  const value = nameInput.value.trim();
  if (value.length <2 || /\d/.test(value)) {
    nameFeedback.textContent = "Namnet måste innehålla minst 2 bokstäver och inga siffror.";
    nameFeedback.style.color = "red";
    return false;
  }
  nameFeedback.textContent = "Namn OK";
  nameFeedback.style.color = "green";
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  if (!/^[\d+\- ]+$/.test(value) || value.length <5) {
    phoneFeedback.textContent = "Telefonnummer får bara innehålla siffror, + och -.";
    phoneFeedback.style.color = "red";
    return false;
  }
  phoneFeedback.textContent = "Telefonnummer OK";
  phoneFeedback.style.color = "green";
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    emailFeedback.textContent = "Ange en giltig e-postadress.";
    emailFeedback.style.color = "red";
    return false;
  }
  emailFeedback.textContent = "E-post OK";
  emailFeedback.style.color = "green";
  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();
  if (value === "") {
    messageFeedback.textContent = "Meddelandet får inte vara tomt.";
    messageFeedback.style.color = "red";
    return false;
  }
  messageFeedback.textContent = "Meddelande OK";
  messageFeedback.style.color = "green";
  return true;
}

// Realtidsvalidering
nameInput.addEventListener("input", validateName);
phoneInput.addEventListener("input", validatePhone);
emailInput.addEventListener("input", validateEmail);
messageInput.addEventListener("input", validateMessage);

// Stoppar formulärskick
form.addEventListener("submit", function(e) {
  if (!validateName() || !validatePhone() || !validateEmail() || !validateMessage()) {
    e.preventDefault(); // Förhindrar att formuläret skickas
    alert("Fyll i alla fält korrekt innan du skickar.");
  }
});
