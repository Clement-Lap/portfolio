const inputs = document.querySelectorAll<HTMLInputElement>("[data-contact-form] > div > [data-form-input]");
const textarea = document.querySelector<HTMLTextAreaElement>("[data-contact-form] > div > [data-form-textarea]")!;
const form = document.querySelector<HTMLFormElement>("[data-contact-form]")!;
const formData = new FormData(form);

inputs.forEach((input) => {
  input.addEventListener("input", () =>input.classList.toggle("empty", input.value.trim().length <= 0));
});

textarea.addEventListener("input", () => textarea.classList.toggle("empty", textarea.value.trim().length <= 0));

async function sendData() {
  try {
    const response = await fetch("https://api.clems.dev/contact", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });
    if (response.ok) {
			alert(`An email have been sent to ${formData.get("email")} to validate your message.`);
		} else if (response.status === 400) {
			alert(`Invalid input.`);
		} else {
			alert(`Received code ${response.status} from ${response.url}.`);
    }
  } catch (_) {
		alert("Could not reach the server.");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
