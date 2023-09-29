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
      const doc = document.createElement(element);
      doc.innerText = innerText;
      return doc;
    }
    return document.createElement(element);
  }
  _appendChild(element, ...args) {
    for (let i = 0; i < args.length; i++) {
      element.appendChild(args[i]);
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
    scores.forEach((score, index) => {
      const row = document.createElement("tr");
      const kills = this.createElementWithText("td", `${score.kills}`);
      const time = this.createElementWithText("td", `${score.time}`);
      const round = this.createElementWithText("td", `${index + 1}`);
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
