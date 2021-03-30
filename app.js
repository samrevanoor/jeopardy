$(document).ready(function () {

    // variables
    const background = $(".container");
    const landingPage = $(".splash");
    const gamePage = $(".post-splash");
    const playerName = $("#player-name").val();
    const cardClick = $(".card-click");
    const cardQuestion = $(".card-body h5");
    const playerAnswer = $("#player-answer").val().trim().toLowerCase();

    let currentPoints = 0;

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
        landingPage
            .css({
                display: "grid"
            })
        gamePage
            .css({
                display: "none"
            })
        cardClick
            .css({
                display: "none"
            })
    }

    // event listeners
    $(".start-game").on("click", letTheGamesBegin)

    $(".question").on("click", renderCard)

    $("#submit-answer").on("click", checkAnswer)

    // event handlers
    function letTheGamesBegin() {
        if ($("#player-name").val() !== "") {
            landingPage
                .css({
                    display: "none"
                });
            gamePage
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

    function renderCard(evt) {
        background
            .css({
                display: "none",
            });
        cardClick
            .css({
                display: "block"
            })
        generateQuestion(evt);
        answeredQuestion(evt);
    }

    function renderBoard() {
        background
            .css({
                display: "block",
            });
        cardClick
            .css({
                display: "none"
            })
        $("#player-answer").val("");
    }

    function generateQuestion(evt) {
        const questionNumber = evt.target.dataset.indexNumber;
        const questionCategory = evt.target.classList;
        if (questionCategory.contains("names")) {
            cardQuestion.html(game.names[questionNumber].question);
        };
        if (questionCategory.contains("deaths")) {
            cardQuestion.html(game.deaths[questionNumber].question);
        };
        if (questionCategory.contains("houses")) {
            cardQuestion.html(game.houses[questionNumber].question);
        };
        if (questionCategory.contains("images")) {
            cardQuestion.html(game.images[questionNumber].question);
            cardClick
                .css({
                    padding: "5px 10px 5px 10px",
                    margin: "75px"
                });
        };
        if (questionCategory.contains("castles")) {
            cardQuestion.html(game.castles[questionNumber].question);
            cardClick
                .css({
                    padding: "5px 10px 5px 10px",
                    margin: "75px"
                });
        };
    }

    function answeredQuestion(evt) {
        // evt.target.innerHTML = "<img src='Images/check.png' width='110px' height='60px' padding='0'>";
        // evt.target.style.backgroundColor = "gray";
    }

    function checkAnswer(evt) {
        const questionNumber = evt.target.dataset.indexNumber;
        console.log($("#player-answer").val().trim().toLowerCase());
        console.log(this);
        if(isAnswerCorrect() === true){
            console.log("hey")
        }
        setTimeout(renderBoard, 2000);
    }

    function isAnswerCorrect(){
        return true;
    }

    initGame();
})