window.onload = function () {
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  var categories; // Array of categories
  var lives; // Lives
  var chosenCategory; // Selected catagory
  var getHint; // pull hint string
  var geusses = []; // Stored geusses
  var guess; // user input
  var counter; // Count correct geusses
  var space; // Number of spaces in word '-'
  var word; // Selected word

  // declare variables...
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet buttons! HARDEST...PART...TO...LEARN!
  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Category: Innocent!";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Category: Weaponry!";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Category: Guilty!";
    }
  }

  // Create geusses list
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Guilty by the Sword!";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "I'm free! Now, run for it!";
      }
    }
  };
  var stickFight = document.getElementById("stickfight")
  //if lose..
  winlose = function () {
    if (lives < 1) {
      stickFight.setAttribute("src", 'assets/images/lose.gif');
    };
    //if win!
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        stickFight.setAttribute("src", "assets/images/stickrun.gif");
      }
    }
  };


  // OnClick Function
  check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        winlose();
      } else {
        comments();
        winlose();
      }
    }
  }


  // Play
  play = function () {
    categories = [
      ["innocent", "freedom", "escape", "justice", "savior", "egress", "cleared"],
      ["excalibur", "lance", "axe", "sword", "flail"],
      ["guilty", "evil", "deserved", "just", "corrupt"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();
    stickFight.setAttribute("src", "assets/images/stickfight.gif");
    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();

  // Hint

  hint.onclick = function () {

    hints = [
      ["proven by a jury of peers", "Braveheart's catch-phrase", "looking for an . . .", "best served while still alive.", "another name for a hero", "Another term for leave", "All of the charges have been . . ."],
      ["The sword in the stone", "Weapon of mounted duelists.", "Viking's first choice!", "Most common weapon in the middle-ages.", "Spiked ball on a chain."],
      ["Not innocent!", "Beyond bad!", "The punishment is well . . .", "The ruling was . . .", "Shady government dealings."]
    ];
    // get a clue!
    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
  };

  // Reset
  document.getElementById("reset").onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    play();
  }
}