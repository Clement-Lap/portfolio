const defaultSize = 70;
let isInit = false;
let cursor: HTMLElement = document.querySelector("[data-cursor]")!;

function moveCursor(event: PointerEvent) {
	if (event.pointerType === "touch") return;

  const clientX = event.pageX;
  const clientY = event.pageY;

  const left = Math.max(
    defaultSize / 2,
    Math.min(document.body.clientWidth - defaultSize / 2, clientX),
  );
  cursor.style.top = `${clientY}px`;
  cursor.style.left = `${left}px`;
}

document.body.addEventListener("pointermove", moveCursor);
