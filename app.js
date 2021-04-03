$(document).ready(function () {

    // variables
    const $background = $(".container");
    const $landingPage = $(".splash");
    const $gamePage = $(".post-splash");
    let $playerName = $("#player-name").val();
    const $cardClick = $(".card-click");
    const $cardQuestion = $(".card-second-body h5");
    const $endGamePage = $(".end-game");
    const $resetGame = $("#reset-game")
    let $playerPoints = $(".current-points");

    let playerAnswer = "";
    let currentPoints = 0;
    let currentQuestion;
    let currentCategory;
    let secondsToAnswer = 29;

    let gameTimer;
    let isGameOver = false;

    const game = {
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
        castles: [{
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

    function initGame() {
        // reset points
        // reset class disabled
        $landingPage
            .css({
                display: "grid",
                backgroundColor: "rgba(72,166,176,255)"
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
    }

    // event listeners
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

    $("#reset-game").on("click", initGame);

    // event handlers
    function letTheGamesBegin() {
        $playerName = $("#player-name").val().trim();
        if ($playerName !== "") {
            $landingPage
                .css({
                    display: "none"
                });
            $gamePage
                .css({
                    display: "block"
                });
            $("body")
                .css({
                    backgroundColor: "navy",
                    backgroundImage: "none"
                })
            $(".player-name")
                .html($("#player-name").val().trim().toLowerCase());
        }
        $("#player-name").val("");
        return;
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
        if (currentCategory.contains("castles")) {
            $cardQuestion.html(game.castles[currentQuestion].question);
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
        if (Array.from($(".question")).every(el => $(el).hasClass("disabled"))) {
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
        if (currentPoints === 0){
            $playerPoints.html(currentPoints);
        };
        if (currentPoints < 150) {
            $(".end-game-result").html("Is that really the best you can do?");
        } else if (currentPoints < 200) {
            $(".end-game-result").html("Not bad! But we think you can do better ...")
        } else if (currentPoints < 300) {
            $(".end-game-result").html("Nice work!")
        } else {
            $(".end-game-result").html("You have won the Game of Thrones!")
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
        if (currentCategory.contains("castles")) {
            if (game.castles[currentQuestion].answer.includes(playerAnswer)) {
                isAnswerCorrect(game.castles[currentQuestion].points)
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