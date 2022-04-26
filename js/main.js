
(function () {
    "use strict";

    let hangman = window.Hangman;
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");
    let letters = document.getElementsByClassName("letters")[0];
    let underlines = document.getElementsByClassName("underlines")[0];
    let underline = hangman.peekFunction();
    let underline2 = underline.split("");

    for (let i = 0; i < underline2.length; i++) {
        let wordUnderline = document.createElement("div");

        wordUnderline.className = "underline";
        wordUnderline.innerHTML = underline2[i];
        wordUnderline.innerHTML = "_";
        console.log(underline);
        wordUnderline.addEventListener("click", makeGuess);
        underlines.appendChild(wordUnderline);
    }

    for (let i = 0; i < hangman.validParts.length; i++) {
        hangman.hide(hangman.validParts[i]);
    }

    for (let i = 0; i < alphabet.length; i++) {
        let letter = document.createElement("div");

        letter.className = "letter";
        letter.innerHTML = alphabet[i];
        letter.addEventListener("click", makeGuess);
        letters.classList.add("hover");
        letters.appendChild(letter);
    }
    var lives = 10;
    var counter = 0;
    var match = [];

    function allLetters() {
        return document.getElementsByClassName("letter");
    }

    function check() {
        if (match.length == underline.length) {
            console.log("you win");
            let select = allLetters();

            window.alert("you win!");
            for (let i = 0; i < select.length; i++) {
                let checkSelect = select[i];

                if (checkSelect.classList.contains("letter")) {
                    checkSelect.style.pointerEvents = "none";
                }
            }
        }

        if (lives == 0) {
            console.log("you lose");
            let select = allLetters();

            window.alert("you lose!");
            for (let i = 0; i < select.length; i++) {
                let checkSelect = select[i];

                if (checkSelect.classList.contains("letter")) {
                    checkSelect.style.pointerEvents = "none";
                }
                if (checkSelect.classList.contains("underline")) {
                    checkSelect.style.pointerEvents = "none";
                }
            }
        }
    }

    check();

    function makeGuess(event) {
        let chosenLetter = event.target.innerHTML;

        console.log(chosenLetter);
        event.target.classList.remove("hover");
        event.target.classList.add("clicked");
        if (underline.indexOf(chosenLetter) == -1) {
            var livesLeft = document.getElementsByClassName("lives")[0];

            livesLeft.innerHTML = lives - 1;
            lives = lives - 1;
            console.log(livesLeft);
            counter = counter + 1;
            for (let i = 0; i < counter; i++) {
                hangman.show(hangman.validParts[i]);
            }
        } else {
            console.log("Match");
            var word = underline2;

            for (var i = 0; i < word.length; i++) {
                let wordUnderline = document.getElementsByClassName("underline")[i];

                if (word[i] === chosenLetter) {
                    wordUnderline.innerHTML = chosenLetter;
                }
                if (word[i] === chosenLetter) {
                    match.push(chosenLetter);
                }
            }
        }
        check();
    }
})();
