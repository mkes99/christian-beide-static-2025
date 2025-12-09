// Basic form handling
const form = document.querySelector("#email-form");

let formReturnHtml = `
  <div style="text-align: center; padding: 2rem;">
    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1.5rem;"></i>
    <h2 class="form-heading">Thank You!</h2>
    <p style="font-size: 1.1rem; margin-bottom: 1rem;">
      Thank you for contacting me. I will get back with you as soon as possible.
    </p>
  </div>
`;

const errorHtml = `
  <div style="text-align: center; padding: 2rem;">
    <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1.5rem;"></i>
    <h2 class="form-heading">Oops!</h2>
    <p style="font-size: 1.1rem; margin-bottom: 1rem;">
      There was a problem sending your message. Please try again later.
    </p>
  </div>
`;

function replaceForm(html) {
  const formCard = document.querySelector("#email-form");
  if (formCard) {
    formCard.innerHTML = html;
  }
}

async function sendData() {
  // Collect all form fields, including file inputs
  const formData = new FormData(form);
  console.log("Form data:", formData);

  const response = await fetch("/formsend", {
    method: "POST",
    // IMPORTANT: do NOT set Content-Type when using FormData
    body: formData,
  });

  // Default is success HTML; swap to error if the response is not OK
  if (!response.ok) {
    console.error("Error sending email:", response.status, response.statusText);
    formReturnHtml = errorHtml;
  }

  // Replace the form with the appropriate message
  replaceForm(formReturnHtml);

  // Clear the form (even though it's replaced in the DOM)
  form.reset();
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Call sendData and handle network-level errors here
  sendData().catch((err) => {
    console.error("Network error:", err);
    formReturnHtml = errorHtml;
    replaceForm(formReturnHtml);
  });
});
