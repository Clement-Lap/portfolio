type InteractionEvent = MouseEvent | TouchEvent;

const CarouselSwapEvent = new Event("carouselswap");
const carouselElement = document.querySelector("[data-carousel]")!;
const imagesQuerySelector = "[data-carousel-wrapper] > img";

function getImageElement(index: number): HTMLElement {
	return carouselElement.querySelector(`[data-carousel-image="${index}"]`) as HTMLElement;
}

let carousel: Carousel | null;
let prevMedia: boolean | null = null;

class Carousel {
	readonly imageDescriptionElement: HTMLElement;
	constructor() {
		this.imageDescriptionElement = carouselElement.querySelector("[data-carousel-description]") as HTMLElement;
	}
	public setup(): void {}
	public destructor(): void {}
	protected setImageDescription(currentImageElement: HTMLElement) {
		this.imageDescriptionElement.innerHTML = currentImageElement.getAttribute("data-description") || "";
	}
}

class SwipeCarousel extends Carousel {
	readonly buttonElement: HTMLElement;
	readonly imageDescriptionElement: HTMLElement;
	readonly animationRatio: number;
	readonly deltaTreshold: number;

	currentImageElement: HTMLElement;
	currentImage: number;
	isDragged: boolean;
	defaultOffsetX: number;
	defaultOffsetY: number;

	constructor(animationRatio: number, deltaTreshold: number) {
		super();
		this.buttonElement = carouselElement.querySelector("[data-carousel-rewind]") as HTMLElement;
		this.currentImageElement = getImageElement(5);
		this.imageDescriptionElement = carouselElement.querySelector("[data-carousel-description]") as HTMLElement;

		this.animationRatio = animationRatio;
		this.deltaTreshold = deltaTreshold;
		this.currentImage = 5;
		this.defaultOffsetX = 0;
		this.defaultOffsetY = 0;
		this.isDragged = false;
	}

	private setNextImage() {
		this.currentImage--;
		if (this.currentImage < 1) this.currentImage = 1;
		if (this.currentImage > 5) this.currentImage = 5;
		this.currentImageElement = getImageElement(this.currentImage);
		this.setImgEvents();
		this.setImageDescription(this.currentImageElement);
	}

	private moveEventPos(event: InteractionEvent): [number, number] {
		let clientX = 0;
		let clientY = 0;

		if (event instanceof MouseEvent) {
			clientX = event.pageX;
			clientY = event.pageY;
		} else if (event instanceof TouchEvent) {
			clientX = event.touches[0].pageX;
			clientY = event.touches[0].pageY;
		}

		return [clientX, clientY];
	}

	private resetImage() {
		this.isDragged = false;
		this.currentImageElement.style.transitionDuration = `${0.3 * this.animationRatio}s`;
		this.currentImageElement.style.transform = "translate(-50%, -50%)";

		this.currentImageElement.removeEventListener("mousemove", (event: MouseEvent) => this.moveImg(event));
		this.currentImageElement.removeEventListener("touchmove", (event: TouchEvent) => this.moveImg(event));
		this.currentImageElement.removeEventListener("mouseup", () => this.resetImage());
		this.currentImageElement.removeEventListener("touchend", () => this.resetImage());
	}

	private reloadDefault() {
		document.querySelectorAll(imagesQuerySelector).forEach((elementNode, i) => {
			const element = elementNode as HTMLElement;
			element.style.transitionDelay = `${0.3 * i * this.animationRatio}s`;
			element.style.pointerEvents = "all";
			element.style.opacity = "1";
			setTimeout(() => (element.style.transitionDelay = "0s"), 300 * i * this.animationRatio);
		});

		this.currentImage = carouselElement.querySelectorAll(imagesQuerySelector).length;
		this.currentImageElement = getImageElement(this.currentImage);
		this.animateImages();
		this.setImgEvents();
		this.setImageDescription(this.currentImageElement);
	}

	private selectImg(event: InteractionEvent) {
		this.isDragged = true;
		this.saveOffset(event);

		document.addEventListener("mousemove", (event: MouseEvent) => this.moveImg(event));
		document.addEventListener("touchmove", (event: TouchEvent) => this.moveImg(event));
		this.currentImageElement.addEventListener("mouseup", () => this.resetImage());
		this.currentImageElement.addEventListener("touchend", () => this.resetImage());
	}

	private saveOffset(event: InteractionEvent) {
		const [clientX, clientY] = this.moveEventPos(event);
		this.defaultOffsetX = clientX;
		this.defaultOffsetY = clientY;
	}

	private moveImg(event: InteractionEvent) {
		if (!this.isDragged) return;
		event.preventDefault();
		const [clientX, clientY] = this.moveEventPos(event);

		const newX = clientX - this.defaultOffsetX;
		const newY = clientY - this.defaultOffsetY;
		const delta = Math.abs(newX) + Math.abs(newY);

		if (delta > this.deltaTreshold) {
			document.dispatchEvent(CarouselSwapEvent);
			return;
		}
		this.currentImageElement.style.transitionDuration = `${0.1 * this.animationRatio}s`;
		this.currentImageElement.style.transform = `translate(-50%, -50%) translate3d(${newX}px, ${newY}px, 0)`;
	}

	private swapImage() {
		this.isDragged = false;

		this.currentImageElement.removeEventListener("mousedown", (event) => this.selectImg(event));
		this.currentImageElement.removeEventListener("touchstart", (event) => this.selectImg(event));
		this.currentImageElement.removeEventListener("mouseup", () => this.resetImage());
		this.currentImageElement.removeEventListener("touchend", () => this.resetImage());
		document.removeEventListener("mousemove", (event) => this.moveImg(event));
		document.removeEventListener("touchmove", (event) => this.moveImg(event));

		this.currentImageElement.style.opacity = "0";
		this.currentImageElement.style.pointerEvents = "none";

		this.setNextImage();
		this.setImageDescription(this.currentImageElement);
	}

	private animateImages(maxX: number = 12, maxY: number = 12, maxDeg: number = 20) {
		carouselElement.querySelectorAll(imagesQuerySelector).forEach((element) => {
			const imgElement = element as HTMLElement;
			imgElement.style.left = "50%";
			const randX = Math.floor(Math.random() * maxX - maxX / 2);
			const randY = Math.floor(Math.random() * maxY - maxY / 2);
			const randDeg = Math.floor(Math.random() * maxDeg - maxDeg / 2);
			imgElement.style.transitionDuration = `${0.6 * this.animationRatio}s`;
			imgElement.style.transform = `translate(-50%, -50%) translate(${randX}px, ${randY}px) rotate(${randDeg}deg)`;
			setTimeout(() => (imgElement.style.transitionDuration = `${0.3 * this.animationRatio}s`), 600 * this.animationRatio);
		});
	}

	public destructor(): void {
		carouselElement.querySelectorAll(imagesQuerySelector).forEach((elementNode) => {
			const element = elementNode as HTMLElement;
			element.ontouchstart = null;
			element.onmousedown = null;
			element.onmousemove = null;
			element.ontouchmove = null;
			element.onmouseup = null;
			element.ontouchend = null;

			element.style.opacity = "1";
			element.style.transform = "";
			element.style.pointerEvents = "auto";
		});

		document.removeEventListener("carouselswap", () => this.swapImage());
	}

	private setImgEvents() {
		this.currentImageElement.addEventListener("mousedown", (event: InteractionEvent) => this.selectImg(event));
		this.currentImageElement.addEventListener("touchstart", (event: InteractionEvent) => this.selectImg(event));
	}

	private initEvents() {
		this.currentImageElement.addEventListener("mousedown", (event: InteractionEvent) => this.selectImg(event));
		this.currentImageElement.addEventListener("touchstart", (event: InteractionEvent) => this.selectImg(event));
		document.addEventListener("carouselswap", () => this.swapImage());
		this.buttonElement.onclick = () => this.reloadDefault();
	}

	public override setup() {
		this.animateImages();
		this.initEvents();
		this.setImageDescription(this.currentImageElement);
	}
}

class HorizontalCarousel extends Carousel {
	private current: number;
	private switchDelaySec: number;
	private interval: ReturnType<typeof setInterval> | undefined;

	constructor(switchDelaySec: number) {
		super();
		this.interval = undefined;
		this.current = 1;
		this.switchDelaySec = switchDelaySec;
	}

	private incrementImage() {
		this.current++;
		if (this.current > 5) this.current = 1;
		if (this.current < 1) this.current = 5;
	}

	private getImageCount(index: number): number {
		let count: number = this.current + index;
		if (count > 5) count = 1;
		if (count < 1) count += 5;
		return count;
	}

	private calculateZIndex() {
		const totalImages = carouselElement.querySelectorAll(imagesQuerySelector).length;
		carouselElement.querySelectorAll(imagesQuerySelector).forEach((imgElement: Element) => {
			const imgElementId = parseInt(imgElement.getAttribute("data-carousel-image") || "0", 10);
			const diff = Math.abs(this.current - imgElementId);
			const difference = Math.min(diff, totalImages - diff);
			(imgElement as HTMLElement).style.zIndex = `${5 - difference}`;
		});
	}

	private moveImages(prev: HTMLElement, curr: HTMLElement, next: HTMLElement) {
		prev.style.left = "0";
		prev.style.right = "";
		prev.style.transform = "translate(0%, -50%) scale(0.5)";

		next.style.right = "0";
		next.style.left = "";
		next.style.transform = "translate(0%, -50%) scale(0.5)";

		curr.style.left = "50%";
		curr.style.transform = "translate(-50%, -50%) scale(1)";
	}

	private styleCurrentImages() {
		const currentImageElement = getImageElement(this.current);
		const prevImageElement = getImageElement(this.getImageCount(-1));
		const nextImageElement = getImageElement(this.getImageCount(1));
		this.calculateZIndex();
		this.moveImages(prevImageElement, currentImageElement, nextImageElement);
	}

	private resetStyleImage() {
		const prevImageElement = getImageElement(this.getImageCount(-3));
		prevImageElement.style.right = "0";
		prevImageElement.style.left = "";
	}

	private loop() {
		this.resetStyleImage();
		this.styleCurrentImages();
		this.setImageDescription(getImageElement(this.getImageCount(0)));
		this.incrementImage();
	}

	public override setup(): void {
		this.loop();
		this.interval = setInterval(() => {
			this.loop();
		}, this.switchDelaySec * 1000);
	}

	public destructor() {
		clearInterval(this.interval);
	}
}

function displayCarousel() {
	const widthMedia = window.matchMedia("(width < 1280px)").matches;
	if (widthMedia != prevMedia) {
		prevMedia = widthMedia;
		carousel?.destructor();

		if (widthMedia) {
			carousel = new HorizontalCarousel(7);
		} else {
			carousel = new SwipeCarousel(1, 350);
		}
		if (carousel) {
			carousel.setup();
		}
	}
}

displayCarousel();
window.addEventListener("resize", () => displayCarousel());
