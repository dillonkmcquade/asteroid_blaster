class Text {
    constructor(root) {
        this.root = root;
        this.domElement = document.createElement('div');
        this.domElement.style.position = 'absolute';
        this.domElement.style.fontSize = '2em';
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
    displayScores(scores) {
        const table = document.createElement("table");
        const row = document.createElement("tr");
        const rounds = document.createElement("th");
        const kills = document.createElement("th");
        const time = document.createElement("th");
        kills.innerText = "Asteroids destroyed";
        time.innerText = "Time Elapsed";
        rounds.innerText = "Round"
        row.appendChild(rounds)
        row.appendChild(kills);
        row.appendChild(time);
        table.style.textAlign = 'center';
        table.appendChild(row)


        scores.forEach((element, index) => {
            const row = document.createElement('tr');
            const kills = document.createElement('td');
            const time = document.createElement('td');
            const round = document.createElement('td');
            kills.innerText = `${element.kills}`;
            time.innerText = `0${element.time.minutes}:${element.time.seconds < 10 ? 0 : ''}${element.time.seconds}`;
            round.innerText = `${index + 1}`
            row.appendChild(round)
            row.appendChild(kills);
            row.appendChild(time);
            table.appendChild(row);

        })
        this.domElement.appendChild(table);
    }
    toggleVisible(option) {
        this.domElement.style.display = option;
    }
}
