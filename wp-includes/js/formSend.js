// Basic form handling
const form = document.querySelector("#email-form");
let formReturnHtml = `
    <div style="text-align: center; padding: 2rem;">
    <i class="fas fa-check-circle" style="font-size: 3rem); margin-bottom: 1.5rem;"></i>
    <h2 class="form-heading">Thank You!</h2>
    <p style="font-size: 1.1rem; margin-bottom: 1rem;">Thank you for contacting me. I will get back with you as soon as possible.</p>
    </div>
`

async function sendData() {
    // Associate the FormData object with the form element
    const formData = new FormData(form);
    console.log("Form data.", formData);
    // const formValues = Object.fromEntries(formData.entries());
    // console.log("Form values.", JSON.stringify(formValues),);
 

    const response = await fetch("/formsend", {
        method: "POST",
        headers: { 
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (!response.ok) {
        console.error('Error sending email:', JSON.stringify(error));
        formReturnHtml = `
            <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1.5rem;"></i>
            <h2 class="form-heading">Oops!</h2>
            <p style="font-size: 1.1rem; margin-bottom: 1rem;">There was a problem sending your message. Please try again later.</p>
            </div>
        `;
    }

    // Replace the form with a thank you message
    const formCard = document.querySelector("#email-form");
    formCard.innerHTML = formReturnHtml;

    // Clear the form
    form.reset();
}


// Take over form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});