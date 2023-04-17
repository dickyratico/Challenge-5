class gameSuwit {
  constructor(player, comp) {
    this.player = player;
    this.comp = comp;
    this.hasil = null;
    this.round = 1;

    this.versus = document.querySelector(".versus h1");
    this.resultClass = document.querySelector(".versus div div");
    this.textResult = document.querySelector(".versus h5");
    this.compBox = document.querySelectorAll(".greyBox.compImage");
    this.playerBox = document.querySelectorAll(".greyBox.playerImage");
  }

  getHasil(player, comp) {
    if (player.pilihan === comp.pilihan) return (this.hasil = "DRAW");
    if (player.pilihan === "batu")
      return comp.pilihan === "gunting"
        ? (this.hasil = "PLAYER 1 WIN")
        : (this.hasil = "COM WIN");
    if (player.pilihan === "kertas")
      return comp.pilihan === "batu"
        ? (this.hasil = "PLAYER 1 WIN")
        : (this.hasil = "COM WIN");
    if (player.pilihan === "gunting")
      return comp.pilihan === "kertas"
        ? (this.hasil = "PLAYER 1 WIN")
        : (this.hasil = "COM WIN");
  }

  setPlayerGreyBox(player) {
    if (player.pilihan === "batu")
      return (this.playerBox[0].style.backgroundColor = "#c4c4c4");
    if (player.pilihan === "kertas")
      return (this.playerBox[1].style.backgroundColor = "#c4c4c4");
    if (player.pilihan === "gunting")
      return (this.playerBox[2].style.backgroundColor = "#c4c4c4");
  }

  setCompGreyBox(comp) {
    if (comp.pilihan === "batu")
      return (this.compBox[0].style.backgroundColor = "#c4c4c4");
    if (comp.pilihan === "kertas")
      return (this.compBox[1].style.backgroundColor = "#c4c4c4");
    if (comp.pilihan === "gunting")
      return (this.compBox[2].style.backgroundColor = "#c4c4c4");
  }

  showHasil(player, comp) {
    this.versus.style.color = "#9c835f";
    this.resultClass.classList.add("hasil");
    this.textResult.innerHTML = this.hasil;
    this.textResult.style.backgroundColor = "#4c9654";
    if (this.hasil === "DRAW") {
      this.textResult.style.backgroundColor = "#225c0e";
    }
    this.setCompGreyBox(comp);
  }

  pilihanComp() {
    const start = new Date().getTime();
    let i = 0;

    setInterval(() => {
      if (new Date().getTime() - start >= 1000) {
        clearInterval;
        return;
      }
      this.compBox[i++].style.backgroundColor = "#c4c4c4";
      if (i == this.compBox.length) i = 0;
    }, 50);

    setTimeout(() => {
      setInterval(() => {
        if (new Date().getTime() - start >= 1200) {
          clearInterval;
          return;
        }
        const compBox = document.querySelectorAll(".greyBox.compImage");
        compBox[i++].style.backgroundColor = "#9c835f";
        if (i == compBox.length) i = 0;
      }, 50);
    }, 50);
  }

  mulaiGame(player, comp) {
    comp.getPilihanComp();
    this.getHasil(player, comp);
    this.setPlayerGreyBox(player);

    this.pilihanComp();

    setTimeout(() => {
      this.showHasil(player, comp);
    }, 1200);

    this.round++;
  }

  refresh() {
    this.textResult.innerHTML = "";
    this.resultClass.classList.remove("hasil");
    this.versus.style.color = "rgb(189,48,46)";
    this.hasil = null;

    for (let i = 0; i < this.compBox.length; i++) {
      this.playerBox[i].style.backgroundColor = "#9c835f";
      this.compBox[i].style.backgroundColor = "#9c835f";
    }
  }
}

class Player {
  constructor() {
    this.pilihan = null;
  }

  getPilihanPlayer(pilihan) {
    this.pilihan = pilihan;
  }
}

class Comp extends Player {
  constructor() {
    super();
  }

  getPilihanComp() {
    const pilihan = Math.random();
    if (pilihan <= 1 / 3) this.pilihan = "batu";
    if (pilihan > 1 / 3 && pilihan <= 2 / 3) this.pilihan = "kertas";
    if (pilihan > 2 / 3) this.pilihan = "gunting";
  }
}

const p1 = new Player();
const cpu = new Comp();
const game = new gameSuwit(p1, cpu);

document.querySelectorAll(".contentImage .player").forEach((playerimg) => {
  playerimg.addEventListener("click", () => {
    if (!game.hasil) {
      const pilihanPlayer = playerimg.className.substr(7, 7);

      p1.getPilihanPlayer(pilihanPlayer);

      game.mulaiGame(p1, cpu);
    } else alert("Please reset the game first.");
  });
});

document
  .querySelector(".refresh")
  .addEventListener("click", () => game.refresh());
