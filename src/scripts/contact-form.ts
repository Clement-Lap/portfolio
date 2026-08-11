const inputs = document.querySelectorAll<HTMLInputElement>("input");
const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const code = document.querySelector<HTMLElement>("code")!;
const form = document.querySelector<HTMLFormElement>("form")!;
const formData = new FormData(form);

inputs.forEach((input) => {
	input.oninput = () => {
		input.classList.toggle("empty", input.value.trim().length <= 0);
	};
});

textarea.oninput = () => {
	textarea.classList.toggle("empty", textarea.value.trim().length <= 0);
};

async function sendData() {
	try {
		const response = await fetch("https://www.nonexistant.domain.com", {
			method: "POST",
			body: formData,
			mode: "no-cors",
		});
		if (response.ok) {
			code.innerHTML = "Your message was sent !";
		} else {
			throw new Error(response.statusText);
		}
	} catch (e: unknown) {
		code.innerHTML = String(e);
	}
}

form.onsubmit = (event) => {
	event.preventDefault();
	sendData();
};
