const form = document.querySelector("#contactForm");
const siteKey = form?.dataset.sitekey;

const messages = {
  success: [
    "Thank You!",
    "Thank you for contacting me. I will get back with you as soon as possible.",
  ],
  error: [
    "Oops!",
    "There was a problem sending your message. Please try again later.",
  ],
};

function showMessage(kind) {
  const [title, text] = messages[kind];
  const box = document.createElement("div");
  box.className = "formMessage";
  box.setAttribute("role", "status");
  const heading = document.createElement("h2");
  heading.textContent = title;
  const body = document.createElement("p");
  body.textContent = text;
  box.append(heading, body);
  form.parentElement.querySelector(".aside")?.remove();
  form.replaceChildren(box);
}

async function getToken() {
  if (!siteKey || !window.grecaptcha) return "";
  await new Promise((resolve) => window.grecaptcha.ready(resolve));
  return window.grecaptcha.execute(siteKey, { action: "contactform" });
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = form.querySelector("[type=submit]");
  submit.disabled = true;
  try {
    const data = new FormData(form);
    data.set("recaptchaToken", await getToken());
    const response = await fetch("/formsend", { method: "POST", body: data });
    showMessage(response.ok ? "success" : "error");
  } catch {
    showMessage("error");
  }
});
