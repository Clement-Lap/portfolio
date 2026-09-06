import { applyTheme } from "@utils/themes";

const timeDataElement: HTMLSpanElement = document.querySelector("#time > span")!;
const weatherElement: HTMLDivElement = document.querySelector("#weather")!;
const weatherDataElement: HTMLSpanElement = document.createElement("img");

function stringifyDate(date: Date) {
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	return `${hours}:${minutes}`
}

window.addEventListener("load", () => {
	const [timeData, weatherData] = [1788087786, "https://cdn.weatherapi.com/weather/64x64/day/116.png"]
	const date = new Date(timeData * 1000);
	timeDataElement.innerText = stringifyDate(date);
	weatherDataElement.setAttribute("src", weatherData);
	weatherDataElement.setAttribute("alt", "Weather icon");
	weatherElement.appendChild(weatherDataElement);
})

//const counter = setInterval(() => { }, 60000);

const langSelectionElement: HTMLSelectElement = document.querySelector("[data-lang-selection]")!;
const themeSelectionElement: HTMLSelectElement = document.querySelector("[data-theme-selection]")!;
const navElement: HTMLElement = document.querySelector("header > nav")!;
const links = document.querySelectorAll("[data-header-link]");

const temp = links.entries()
							.toArray()
							.filter((element) => document.URL.startsWith((element[1] as HTMLAnchorElement).href));

const currentLink = temp[temp.length - 1];

let totalWidth = 0;
links.forEach((element) => totalWidth += element.clientWidth)
const calculatedGap = (navElement.clientWidth - totalWidth) / 5;



if (currentLink) {
	const currentLinkElement = currentLink[1] as HTMLAnchorElement
  const nLink = currentLink[0];
	const headerSelector: HTMLDivElement = document.querySelector("[data-header-link-selector]")!;

	currentLinkElement.style.color = "var(--primary-clr)";

	console.log(currentLinkElement)

	if (window.screen.width > 480) {
		headerSelector.style.left = `calc(var(--gap) + ${nLink! * 25}%)`;
		headerSelector.style.right = `calc(var(--gap) + ${100 - (nLink! + 1) * 25}%)`;
	} else {
		headerSelector.style.left = `calc(${currentLinkElement.offsetLeft - calculatedGap / 2}px)`;
		headerSelector.style.right = `calc(100% - (${currentLinkElement.offsetLeft + currentLinkElement.clientWidth + calculatedGap / 2}px))`;
	}
}

langSelectionElement.addEventListener("change", () => {
  const currentUrl = document.URL;
  const splitUrl = currentUrl.split("/");
  splitUrl[3] = langSelectionElement.value;
  const endUrl = splitUrl.join("/");

  if (endUrl !== currentUrl) window.location.replace(endUrl);
});

themeSelectionElement.addEventListener("change", () => {
  applyTheme(themeSelectionElement.value);
});
