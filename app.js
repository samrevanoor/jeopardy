$(document).ready(function () {

    // variables
    const $background = $(".container");
    const $landingPage = $(".splash");
    const $gamePage = $(".post-splash");
    const $playerName = $("#player-name").val();
    const $cardClick = $(".card-click");
    const $cardQuestion = $(".card-body h5");
    let $playerPoints = $(".current-points");

    let playerAnswer = "";
    let currentPoints = 0;
    let currentQuestion;
    let currentCategory;

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
            answer: ["baratheon", "barathion", "bartheon"],
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
        $landingPage
            .css({
                display: "grid"
            })
        $gamePage
            .css({
                display: "none"
            })
        $cardClick
            .css({
                display: "none"
            })
    }

    // event listeners
    $(".start-game").on("click", letTheGamesBegin)

    $(".question").on("click", handleCardClick)

    $("#submit-answer").on("click", checkAnswer)

    // event handlers
    function letTheGamesBegin() {
        if ($("#player-name").val() !== "") {
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
                .html($("#player-name").val().trim().toLowerCase())
        } return;
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
    }

    function answeredQuestion(evt) {
        evt.target.classList.add("disabled");
        checkGameStatus();
    }

    function checkGameStatus() {
        if (Array.from($(".question")).every(el => $(el).hasClass("disabled"))) {
            isGameOver = true;
            endGame();
            return true;
        } else {
            isGameOver = false;
            return false;
        }
    }

    function endGame() {
        if (currentPoints < 150) {
            console.log("uh oh try again");
        } else if (currentPoints < 200) {
            console.log("not bad! you can do better")
        } else if (currentPoints < 300){
            console.log("really good job!")
        } else {
            console.log("you really know your stuff!")
        };
    }

    function checkAnswer(evt) {
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
        setTimeout(renderBoard, 2000);
        setTimeout(confetti.stop, 2000);
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
    }

    function isAnswerCorrect(category) {
        currentPoints += category;
        console.log(currentPoints);
        $playerPoints.html(currentPoints);
        confetti.start();
        $("#submit-answer").html("nice job!");
    }

    // function to do stuff if answer is incorrect
    function isAnswerWrong() {
    }

    initGame();
})