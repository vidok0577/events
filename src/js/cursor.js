const lerp = (a, b, n) => (1 - n) * a + n * b;

export class Cursor {
  constructor() {
    // config
    this.target = { x: 0.5, y: 0.5 }; // mouse position
    this.cursor = { x: 0.5, y: 0.5 }; // cursor position
    this.speed = 1;
    this.cursorImg = document.querySelector(".cursor");
    this.init();
  }
  bindAll() {
    ["onMouseMove", "render", "onClickAnimation"].forEach(
      (fn) => (this[fn] = this[fn].bind(this)),
    );
  }
  onMouseMove(e) {
    //get normalized mouse coordinates [0, 1]
    this.target.x = e.clientX / window.innerWidth;
    this.target.y = e.clientY / window.innerHeight;
    // trigger loop if no loop is active
    if (!this.raf) this.raf = requestAnimationFrame(this.render);
  }
  onClickAnimation() {
    this.cursorImg.style.setProperty("--cursor-click", `-45deg`);
    setTimeout(
      () => this.cursorImg.style.setProperty("--cursor-click", `0deg`),
      300,
    );
  }
  render() {
    //calculate lerped values
    this.cursor.x = lerp(this.cursor.x, this.target.x, this.speed);
    this.cursor.y = lerp(this.cursor.y, this.target.y, this.speed);
    this.cursorImg.style.setProperty("--cursor-x", this.cursor.x);
    this.cursorImg.style.setProperty("--cursor-y", this.cursor.y);
    //cancel loop if mouse stops moving
    const delta = Math.sqrt(
      Math.pow(this.target.x - this.cursor.x, 2) +
        Math.pow(this.target.y - this.cursor.y, 2),
    );
    if (delta < 0.001) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
      return;
    }
    //or continue looping if mouse is moving
    this.raf = requestAnimationFrame(this.render);
  }

  init() {
    this.bindAll();
    window.addEventListener("click", this.onClickAnimation);
    window.addEventListener("mousemove", this.onMouseMove);
    this.raf = requestAnimationFrame(this.render);
  }
}

new Cursor();
