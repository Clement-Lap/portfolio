const defaultSize = 70;
let isInit = false;
let cursor: HTMLElement = document.querySelector("[data-cursor]")!;

function getPos(event: PointerEvent | TouchEvent): [number, number] | null {
	let x;
	let y;

	if ("touches" in event) {
		event = event as TouchEvent;
		x = event.touches[0]?.pageX;
		y = event.touches[0]?.pageY;
	} else if ("pageX" in event && "pageY" in event) {
		event = event as PointerEvent;
		x = event.pageX;
		y = event.pageY;
	} else return null;

	return [x!, y!];
}

function moveCursor(x: number, y: number) {
	const newX = Math.max(defaultSize / 2, Math.min(document.body.clientWidth - defaultSize / 2, x));
	cursor.style.transform = `translate3d(${newX}px, ${y}px, 1px) translate(-50%, -50%)`;
}

function changeCursorScale(size: number) {
	if (cursor.style.transform.includes("scale")) {
		cursor.style.transform.replace(/\.*scale[(].*[)].*/gm, `scale(${size})`);
	} else {
		cursor.style.transform += `scale(${size})`;
	}
}

document.body.addEventListener("pointermove", (event: PointerEvent) => {
	cursor.style.transitionDuration = "175ms";
	const [x, y] = getPos(event)!;
	moveCursor(x, y);
});

document.body.addEventListener(
	"touchmove",
	(event: TouchEvent) => {
		const [x, y] = getPos(event)!;
		moveCursor(x, y);
	},
	{ passive: false },
);

document.body.addEventListener("touchend", () => {
	changeCursorScale(0);
});

document.body.addEventListener("touchstart", (event: TouchEvent) => {
	const [x, y] = getPos(event)!;
	cursor.style.transitionDuration = "0s";
	moveCursor(x, y);
	setTimeout(() => {
		cursor.style.transitionDuration = "175ms";
		changeCursorScale(1);
	}, 0) // AI used for the timeout, to fix an issue where the transition-duration was overridden
});
