export class Text {
  constructor(root) {
    this.root = root;
    this.domElement = document.createElement("div");
    this.domElement.style.position = "absolute";
    this.domElement.style.fontSize = "2em";
    this.domElement.style.minWidth = "30vw";
    this.domElement.style.minHeight = "30vh";
    this.domElement.style.display = "none";
    this.domElement.style.zIndex = 2000;
    this.domElement.id = "text";
    root.appendChild(this.domElement);
  }

  update(txt) {
    this.domElement.innerText = txt;
  }
  createElementWithText(element, innerText) {
    if (innerText) {
      return (document.createElement(element).innerText = innerText);
    }
    return document.createElement(element);
  }
  _appendChild(element, ...args) {
    for (i in args) {
      element.appendChild(i);
    }
  }
  displayScores(scores) {
    const table = document.createElement("table");

    // headers
    const row = document.createElement("tr");
    const rounds = this.createElementWithText("th", "Round");
    const kills = this.createElementWithText("th", "Asteroids destroyed");
    const time = this.createElementWithText("th", "Time elapsed");
    this._appendChild(row, rounds, kills, time);
    table.style.textAlign = "center";
    table.appendChild(row);

    // scores
    scores.forEach((element, index) => {
      const row = document.createElement("tr");
      const kills = this.createElement("td", `${element.kills}`);
      const time = this.createElement(
        "td",
        `0${element.time.minutes}:${element.time.seconds < 10 ? 0 : ""}${
          element.time.seconds
        }`
      );
      const round = this.createElement("td", `${index + 1}`);
      this._appendChild(row, round, kills, time);
      table.appendChild(row);
    });

    // add to DOM
    this.domElement.appendChild(table);
  }
  toggleVisible(option) {
    this.domElement.style.display = option;
  }
}
