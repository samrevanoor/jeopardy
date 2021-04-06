$(document).ready(function () {

    // variables
    const $background = $(".container");
    const $landingPage = $(".splash");
    const $gamePage = $(".post-splash");
    let $playerName = $("#player-name").val();
    const $cardClick = $(".card-click");
    const $cardQuestion = $(".card-second-body h5");
    const $endGamePage = $(".end-game");
    const $resetGame = $(".reset-game")
    let $playerPoints = $(".current-points");

    let playerAnswer;
    let currentPoints;
    let currentQuestion;
    let currentCategory;
    let secondsToAnswer = 29;

    let gameTimer;
    let isGameOver = false;
    let gameLevel;

    const levelEasy = {
        names: [{
            question: "Cersei's children are named Joffrey, Myrcella and ...",
            answer: ["tommen", "tommen baratheon", "tommen lannister", "tommin"],
            points: 10
        }, {
            question: "He is also known as the 'Spider' or the 'Master of Whisperers'.",
            answer: ["varys", "varis"],
            points: 20
        }, {
            question: "This blacksmith was the illegitimate son of King Robert, born and raised in Flea Bottom.",
            answer: ["gendry", "gendry baratheon"],
            points: 30
        }],
        deaths: [{
            question: "This 'dancing master' was killed by Meryn Trant.",
            answer: ["syrio", "syrio forel", "sirio", "cyrio"],
            points: 10
        }, {
            question: "This Northerner was beheaded by King Joffrey at the end of season one.",
            answer: ["ned", "ned stark", "eddard stark", "eddard"],
            points: 20
        }, {
            question: "The name of Sansa Stark's direwolf, who was sentenced to death by King Robert.",
            answer: ["lady", "lady stark"],
            points: 30
        }],
        houses: [{
            question: "The Rains of Castamere is associated with this house.",
            answer: ["house lannister", "lannister"],
            points: 10
        }, {
            question: "This house's motto is 'Growing Strong'",
            answer: ["house tyrell", "tyrell"],
            points: 20
        }, {
            question: "This house rules over the Iron Islands.",
            answer: ["house greyjoy", "greyjoy"],
            points: 30
        }],
        images: [{
            question: '<h5>Who is this?</h5><img src="Images/missandei.gif">',
            answer: ["missandei", "misandei", "missandei of narth"],
            points: 10
        }, {
            question: '<h5>Who is this?</h5><img src="Images/littlefinger.gif">',
            answer: ["littlefinger", "petyr baelish", "lord baelish", "petyr", "peter baelish", "little finger"],
            points: 20
        }, {
            question: '<h5>Who is this?</h5><img src="Images/margaery.gif">',
            answer: ["margaery", "margaery tyrell", "margery"],
            points: 30
        }],
        other: [{
            question: '<h5>Which hand did this man lose?</h5><img src="Images/jaime.gif">',
            answer: ["right"],
            points: 10
        }, {
            question: "<h5>This man volunteers to be Tyrion's champion in the Eyrie.</h5><img src='Images/bronnimage2.gif'>",
            answer: ["bronn", "ser bronn", "bron"],
            points: 20
        }, {
            question: '<h5>What is the wedding of Edmure & Roslin Tully commonly called?</h5><img src="Images/red-wedding.png">',
            answer: ["red wedding", "the red wedding"],
            points: 30
        }]
    }

    const levelHard = {
        names: [{
            question: "The Hound's real name is ...",
            answer: ["sandor", "sandor clegane"],
            points: 10
        }, {
            question: "Daenerys' dragons were named Drogon, Viserion and ...",
            answer: ["rhaegal"],
            points: 20
        }, {
            question: "Olenna Tyrell is also known as ...",
            answer: ["the queen of thorns", "queen of thorns"],
            points: 30
        }],
        deaths: [{
            question: "Arya Stark cooked this man's children and fed them to him.",
            answer: ["walder frey", "lord frey", "frey"],
            points: 10
        }, {
            question: "This man's skull was crushed by the Mountain.",
            answer: ["oberyn martell", "prince martell", "oberyn"],
            points: 20
        }, {
            question: "Lysa Arryn died by being pushed through the ...",
            answer: ["moondoor", "moon door"],
            points: 30
        }],
        houses: [{
            question: "Which house has a stag as its sigil?",
            answer: ["baratheon", "barathion", "bartheon", "barratheon"],
            points: 10
        }, {
            question: "Jon Snow is half Stark and half ...",
            answer: ["targaryen", "tagaryen", "targayen"],
            points: 20
        }, {
            question: "What is House Lannister's official saying?",
            answer: ["hear me roar", "hear me roar!"],
            points: 30
        }],
        images: [{
            question: '<h5>Who is this?</h5><img src="Images/pod.gif">',
            answer: ["pod", "podrick", "podrick payne", "ser podrick payne"],
            points: 10
        }, {
            question: '<h5>Who is this?</h5><img src="Images/shireen.gif">',
            answer: ["shireen", "shireen baratheon"],
            points: 20
        }, {
            question: '<h5>Who is this?</h5><img src="Images/tormund.gif">',
            answer: ["tormund giantsbane", "tormund", "tormund giants bane", "tormund giantbane"],
            points: 30
        }],
        other: [{
            question: '<h5>Which castle is this?</h5><img src="Images/castle1.jpeg">',
            answer: ["dragonstone", "dragon stone"],
            points: 10
        }, {
            question: '<h5>Which castle is this?</h5><img src="Images/castle2.png">',
            answer: ["castle black"],
            points: 20
        }, {
            question: "<h5>Jaqen H'ghar helped Arya escape from ...</h5><img src='Images/castle3.jpeg'>",
            answer: ["harrenhal", "harren hal", "harrenhall", "harren hall"],
            points: 30
        }]
    }

    const levelSuperHard = {
        names: [{
            question: "Sansa Stark's first husband is ...",
            answer: ["tyrion", "tyrion lannister"],
            points: 10
        }, {
            question: "What is Jon Snow's birth name?",
            answer: ["aegon targaryen", "aegon"],
            points: 20
        }, {
            question: "What is Daenerys Targaryen's alternate last name?",
            answer: ["stormborn", "storm born"],
            points: 30
        }],
        deaths: [{
            question: "This Lord Commander of the Night's Watch was killed at Craster's Keep.",
            answer: ["mormont", "ser mormont", "jeor mormont", "ser jeor mormont", "lord mormont"],
            points: 10
        }, {
            question: "This Hand of the King was killed by his son while on the toilet.",
            answer: ["tywin lannister", "tywin", "lord tywin"],
            points: 20
        }, {
            question: "This man was chased down and killed by his own hounds.",
            answer: ["ramsay", "ramsay snow", "ramsay bolton"],
            points: 30
        }],
        houses: [{
            question: "Which house is Ser Brienne from?",
            answer: ["house tarth", "tarth"],
            points: 10
        }, {
            question: "This house's sigil is a red sun pierced by a golden spear on an orange field.",
            answer: ["house martell", "martell"],
            points: 20
        }, {
            question: "Where is Lady Talisa originally from?",
            answer: ["volantis", "valantis"],
            points: 30
        }],
        images: [{
            question: '<h5>Who is this?</h5><img src="Images/hot-pie.gif">',
            answer: ["hot pie", "hotpie"],
            points: 10
        }, {
            question: '<h5>Who is this?</h5><img src="Images/lyanna.gif">',
            answer: ["lyanna", "lyanna mormont", "lady mormont", "lady lyanna mormont"],
            points: 20
        }, {
            question: '<h5>Who is this?</h5><img src="Images/daario.gif">',
            answer: ["daario", "dario", "daario naharis", "dario naharis"],
            points: 30
        }],
        other: [{
            question: '<h5>Where is this?</h5><img src="Images/braavos.png">',
            answer: ["braavos"],
            points: 10
        }, {
            question: "<h5>Rickon Stark's direwolf was called ...</h5><img src='Images/shaggydog.gif'>",
            answer: ["shaggydog", "shaggy dog"],
            points: 20
        }, {
            question: "<h5>Widow's Wail and Oathkeeper were forged from this ancestral sword of House Stark.</h5><img src='Images/ice.gif'>",
            answer: ["ice"],
            points: 30
        }]
    }

    function initGame() {
        $landingPage
            .css({
                display: "grid"
            })
        $("body")
            .css({
                backgroundColor: "rgba(72,166,176,255)",
            })
        $("#signature")
            .css({
                display: "block"
            })
        $gamePage
            .css({
                display: "none"
            })
        $cardClick
            .css({
                display: "none"
            })
        $endGamePage
            .css({
                display: "none"
            })
        $("#easy")
            .css({
                backgroundColor: "#ff9b59",
                opacity: "1"
            })
        $("#hard")
            .css({
                backgroundColor: "#ff9b59",
                opacity: "1"
            })
        $("#super-hard")
            .css({
                backgroundColor: "#ff9b59",
                opacity: "1"
            })
        currentPoints = 0;
        $playerPoints.html(currentPoints);
        $(".question").removeClass("disabled");
        gameLevel = "";
        playerAnswer = "";
    }

    // event listeners
    $("#easy").on("click", function () {
        $("#hard")
            .css({
                opacity: "0.5"
            })
        $("#super-hard")
            .css({
                opacity: "0.5"
            })
        $("#easy")
            .css({
                backgroundColor: "#ff9b59",
                opacity: "1"
            })
        gameLevel = "easy";
    })

    $("#hard").on("click", function () {
        $("#easy")
            .css({
                opacity: "0.5"
            })
        $("#super-hard")
            .css({
                opacity: "0.5"
            })
        $("#hard")
            .css({
                backgroundColor: "#ff9b59",
                opacity: "1"
            })
        gameLevel = "hard";
    })

    $("#super-hard").on("click", function () {
        $("#easy")
            .css({
                opacity: "0.5"
            })
        $("#hard")
            .css({
                opacity: "0.5"
            })
        $("#super-hard")
            .css({
                backgroundColor: "#ff9b59",
                opacity: "1"
            })
        gameLevel = "super-hard";
    })

    $(".start-game").on("click", letTheGamesBegin)

    $("#player-name").keypress(function (e) {
        if (e.which == '13') {
            letTheGamesBegin();
        }
    })

    $(".question").on("click", handleCardClick)

    $("#submit-answer").on("click", checkAnswer)

    $("#player-answer").keypress(function (e) {
        if (e.which == '13') {
            checkAnswer();
        }
    })

    $resetGame.on("click", initGame);

    // event handlers
    function letTheGamesBegin() {
        $playerName = $("#player-name").val().trim();
        if (!gameLevel) {
            blinkText($(".level"));
        } else if ($playerName === "") {
            blinkText($(".name"));
            blinkText($("#player-name"));
        } else {
            $landingPage.fadeOut(1000)
            $gamePage.fadeIn(5000)
            $("body")
                .fadeIn(4000)
                .css({
                    backgroundColor: "navy",
                    backgroundImage: "none"
                })
            $("#signature")
                .css({
                    display: "none",
                })
            $(".player-name")
                .html($("#player-name").val().trim().toLowerCase());
            $("#player-name").val("");
            whichLevel();
            $("#player-level").html(gameLevel);
            return;
        }
    }

    function blinkText(sel) {
        sel.fadeOut(600);
        sel.fadeIn(600);
    }

    function whichLevel() {
        if (gameLevel === "easy") {
            game = levelEasy;
        } else if (gameLevel === "hard") {
            game = levelHard;
        } else if (gameLevel === "super-hard") {
            game = levelSuperHard;
        }
    }

    function handleCardClick(evt) {
        currentQuestion = this.dataset.indexNumber;
        currentCategory = this.classList;

        if (currentCategory.contains("disabled")) {
            return;
        };
        renderCard();
        generateQuestion(currentQuestion, currentCategory);
        answeredQuestion(evt);
    }

    function renderCard() {
        $background
            .css({
                display: "none",
            });
        $cardClick
            .css({
                display: "block"
            })
    }

    function startTimer() {
        gameTimer = setInterval(function () {
            $("#stopWatch").html(secondsToAnswer);
            secondsToAnswer--;
            if (secondsToAnswer === -2) {
                clearGameTimer();
                noAnswerGiven();
            };
        }, 1000);
    }

    function clearGameTimer() {
        secondsToAnswer = 29;
        $("#stopWatch").html("30");
        clearInterval(gameTimer);
    }

    function generateQuestion(currentQuestion, currentCategory) {
        if (currentCategory.contains("names")) {
            $cardQuestion.html(game.names[currentQuestion].question);
        };
        if (currentCategory.contains("deaths")) {
            $cardQuestion.html(game.deaths[currentQuestion].question);
        };
        if (currentCategory.contains("houses")) {
            $cardQuestion.html(game.houses[currentQuestion].question);
        };
        if (currentCategory.contains("images")) {
            $cardQuestion.html(game.images[currentQuestion].question);
            $cardClick
                .css({
                    padding: "5px 10px 5px 10px",
                    margin: "75px"
                });
        };
        if (currentCategory.contains("other")) {
            $cardQuestion.html(game.other[currentQuestion].question);
            $cardClick
                .css({
                    padding: "5px 10px 5px 10px",
                    margin: "75px"
                });
        };
        startTheme();
        startTimer();
    }

    function startTheme() {
        $(".theme")[0].play();
        $(".theme").prop("volume", 0.3);
    }

    function noAnswerGiven() {
        $(".theme")[0].pause();
        $(".trombone")[0].play();
        $(".trombone").prop("volume", 0.3);
        renderBoard();
        setTimeout(reverseNoAnswerGiven, 4000);
    }

    function reverseNoAnswerGiven() {
        $(".trombone")[0].pause();
        $(".trombone")[0].currentTime = 0;
    }

    function answeredQuestion(evt) {
        evt.target.classList.add("disabled");
        checkGameStatus();
    }

    function checkGameStatus() {
        if (Array.from($(".question")).some(el => $(el).hasClass("disabled"))) {
            isGameOver = true;
        } else {
            isGameOver = false;
        }
    }

    function endGame() {
        $endGamePage
            .css({
                display: "grid"
            })
        $gamePage
            .css({
                display: "none"
            });
        if (currentPoints === 0) {
            $playerPoints.html(currentPoints);
        };
        if (currentPoints < 150) {
            $(".end-game-result").html("Is that really the best you can do?");
        } else if (currentPoints < 200) {
            $(".end-game-result").html("Not bad! But we think you can do better ...")
        } else if (currentPoints < 300) {
            $(".end-game-result").html("Amazing job! You're next in line for the throne ...")
        } else {
            $(".end-game-result").html("Congratulations! You got a perfect score. <br> You have won the Game of Thrones!")
        };
    }

    function checkAnswer() {
        playerAnswer = $("#player-answer").val().trim().toLowerCase();
        if (currentCategory.contains("names")) {
            if (game.names[currentQuestion].answer.includes(playerAnswer)) {
                isAnswerCorrect(game.names[currentQuestion].points)
            } else {
                isAnswerWrong()
            }
        };
        if (currentCategory.contains("deaths")) {
            if (game.deaths[currentQuestion].answer.includes(playerAnswer)) {
                isAnswerCorrect(game.deaths[currentQuestion].points)
            } else {
                isAnswerWrong()
            }
        };
        if (currentCategory.contains("houses")) {
            if (game.houses[currentQuestion].answer.includes(playerAnswer)) {
                isAnswerCorrect(game.houses[currentQuestion].points)
            } else {
                isAnswerWrong()
            }
        };
        if (currentCategory.contains("images")) {
            if (game.images[currentQuestion].answer.includes(playerAnswer)) {
                isAnswerCorrect(game.images[currentQuestion].points)
            } else {
                isAnswerWrong()
            }
        };
        if (currentCategory.contains("other")) {
            if (game.other[currentQuestion].answer.includes(playerAnswer)) {
                isAnswerCorrect(game.other[currentQuestion].points)
            } else {
                isAnswerWrong()
            }
        };
    }

    function renderBoard() {
        $background
            .css({
                display: "block",
            });
        $cardClick
            .css({
                display: "none"
            })
        $("#player-answer").val("");
        $("#submit-answer").html("submit");
        $buttonClicked = false;
        $(".theme")[0].currentTime = 0;
        clearGameTimer();
        if (isGameOver === true) {
            endGame();
        }
    }

    function isAnswerCorrect(category) {
        currentPoints += category;
        $playerPoints.html(currentPoints);
        confetti.start();
        $(".theme")[0].pause();
        $(".cheer")[0].play();
        $("#submit-answer").html("nice job!");
        $("#submit-answer").addClass("disabled");
        setTimeout(correctCard, 2000);
    }

    function correctCard() {
        confetti.stop();
        $(".cheer")[0].pause();
        $(".cheer")[0].currentTime = 0;
        $("#submit-answer").removeClass("disabled");
        renderBoard();
    }

    function isAnswerWrong() {
        wrongCard();
        setTimeout(reverseWrongCard, 2000);
    }

    function wrongCard() {
        $(".loser")
            .css({
                display: "inline",
            });
        $(".card-second-body")
            .css({
                display: "none",
            })
        $(".theme")[0].pause();
        $(".roar")[0].play();
        $(".roar").prop("volume", 0.3);
    }

    function reverseWrongCard() {
        $(".loser")
            .css({
                display: "none",
            });
        $(".card-second-body")
            .css({
                display: "block",
            })
        $(".roar")[0].pause();
        $(".roar")[0].currentTime = 0;
        renderBoard();
    }

    initGame();
})