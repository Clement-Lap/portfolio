const defaultSize = 70;
let isInit = false;
let cursor: HTMLElement | undefined;

function moveCursor(event: MouseEvent) {
  if (!cursor) return;
  if (!isInit) return;
  const clientX = event.pageX;
  const clientY = event.pageY;

  const left = Math.max(
    defaultSize / 2,
    Math.min(document.body.clientWidth - defaultSize / 2, clientX),
  );
  cursor.style.top = `${clientY}px`;
  cursor.style.left = `${left}px`;
}

function toggleCursor() {
  cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);
  isInit = true;
  document.body.removeEventListener("mouseenter", toggleCursor);
  document.body.removeEventListener("mousemove", toggleCursor);
}

document.addEventListener("mousemove", moveCursor);
document.body.addEventListener("mouseenter", toggleCursor);
document.body.addEventListener("mousemove", toggleCursor);
