const inputs = document.querySelectorAll<HTMLInputElement>("input");
const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const form = document.querySelector<HTMLFormElement>("form")!;
const formData = new FormData(form);

inputs.forEach((input) => {
  input.addEventListener("input", () =>input.classList.toggle("empty", input.value.trim().length <= 0));
});

textarea.addEventListener("input", () => textarea.classList.toggle("empty", textarea.value.trim().length <= 0));

async function sendData() {
  try {
    const response = await fetch("https://www.nonexistant.domain.com", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });
    if (response.ok) {
			alert("Message sent successfully!");
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
