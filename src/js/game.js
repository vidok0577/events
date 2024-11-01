import goblinImg from "../img/goblin.png";

class Game {
  constructor() {
    this.area = document.querySelectorAll("td");
    this.table = document.querySelector(".area");
    this.tablo = document.querySelectorAll(".count");
    this.init();
  }

  goblinInit() {
    this.goblin = document.createElement("img");
    this.goblin.src = goblinImg;
    this.goblin.style.pointerEvents = "none";
  }

  bindAll() {
    ["randomField", "shift", "counter"].forEach(
      (fn) => (this[fn] = this[fn].bind(this)),
    );
  }

  randomField() {
    let result;
    do {
      result = Math.floor(Math.random() * 15);
    } while (this.area[result].firstChild);
    return result;
  }

  shift() {
    window.clearTimeout(this.shiftTimeout);
    this.area[this.randomField()].append(this.goblin);
    this.shiftTimeout = setTimeout(this.shift, 1000);
  }

  counter(event) {
    const tablo = this.tablo;
    if (event.target.firstChild) {
      this.tablo[0].textContent = 1 + parseInt(this.tablo[0].textContent);
      this.shift();
    } else {
      this.tablo[1].textContent = 1 + parseInt(this.tablo[1].textContent);
      if (parseInt(this.tablo[1].textContent) >= 5) {
        alert("Game over");
        tablo[0].textContent = 0;
        tablo[1].textContent = 0;
      }
    }
  }

  init() {
    this.bindAll();
    this.goblinInit();
    this.table.addEventListener("click", this.counter);
    this.shift();
  }
}

new Game();
