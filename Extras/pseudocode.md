### **Pseudocode**

*The following is rough pseudocode from the initial planning phase of the game. Please note that a lot of these variables and functions have changed over time, as I came up with new ideas and through trial and error.*

<p>

#### GAME OF THRONES THEMED JEOPARDY GAME

- game will be set up using HTML and CSS (i.e.: the categories will be populated, along with the score options for each question [but NOT the actual question])

- JS will be used from the beginning game board

first screen: blurred background of the game board, and in the foreground:
a modal asking the player for their name

once the player enters something and hits enter, the game begins

player will have x number of categories to choose from, and each category will have y number of cards

player will click on the card they want to start with

the card zooms into focus, and the rest of the game board gets blurred in the background again

a countdown begins for 60 seconds, and the player must answer the question shown

once they type in their answer and hit submit, 
the answer gets checked with the answer I've given the game

the game board comes back into focus, with the already-played cards marked as COMPLETED,
and the points get updated

player clicks again, game continues

at the end of the game, depending on their score, they will receive a customized message, 
with a chance to play again

<br>

#### FLOW

```
const playerName = player's name from the initial input option
this will be used throughout the game for a more personalized feel
```

each category will have its own object, with each question and answer in the object

``` 
game = {
    battles: [{q:'During which battle did Tyrion Lannister get the scar on his face?', 
                    a: ["battle of blackwater, "blackwater", "black water" ], 
                    points:10 }, 
            {q:'', a: ["water", "waters" ], points:10 }    ],
    deaths: [{q: "Who did Arya Stark feed their children to?", 
                    a: ["walder frey", "lord frey", "frey" ], 
                    points:10 },  
            {q:'', a: ["water", "waters" ], points:10 }    ], 
}
```

```
game.battles.forEAch((card, index) => <div class="battles" data-card-index=`${index}`></div>)
```

grab the class text or check if its there and just pass the string

``` 
game.battles[idx].a.includes("")
```

if statement or a switch for the cases based on class names or data-category (for category names)

```
game[el.dataset.category][idx]
```

```
let currentPoints;
```

```
function initGame:
request player's name
all cards haven't been clicked on yet
points = 0
playerName = input.value()
```

addeventlistener to each card ("click", handlePlayerTurn)

```
function handlePlayerTurn:
if player clicks anywhere outside the board: DO NOTHING
if player clicks a category box: DO NOTHING (no event listeners will be added to the cat boxes)
if player clicks a box they have already answered (i.e.: classList includes "selected") DO NOTHING
if all questions have been answered: function endOfGame
if player clicks a box that hasn't been answered yet: 
    trigger function generateQuestion
```

```
function generateQuestion:
each card on the board will have an assigned question (this will not change when you reset/refresh the game)
based on the card that is selected, the question will be linked to an object in the JS
so, if they click on the second question in the Battles category, the data-set-index of the selected card will match
with the index in the game object^ and display the correct one
add class to that selected card "selected"
trigger function renderQuestionCard
```

```
function renderQuestionCard:
    1. blur gameboard
    2. selected question will be in focus (taking up the majority of the screen)
    3. question card will "turn over" to reveal the question
    4. 60 second timer will begin
    5. jeopardy theme music will begin
```

player enters answer and hits submit OR hits their ENTER key
if no answer is given in 60 seconds, the default will be set to "WRONG"

```
function checkAnswer:
their answer will have to match up with any of the answers given for that question in the selected object,
will use input.value().trim().toLowerCase()
if true, function isAnswerCorrect
if false, function isAnswerWrong
```

```
function isAnswerCorrect:
if the answer is a match to any of the options above, add the points to currentPoints accordingly
update the UI for the points
clear the card on screen and display a big green check mark
NICE TO HAVE: confetti ????
return back to gameBoard after 2-3 seconds
```

```
function isAnswerWrong:
if the answer is not a match, do nothing to currentPoints
do nothing to the UI for the points
clear the card on screen and display a big red X
NICE TO HAVE: confetti of sad faces ???
return back to gameBoard after 2-3 seconds
```

```
function endOfGame:
if currentPoints < half of total, display a "try to beat your score" msg
if half < currentPoints < 3/4 total, display a "you did well, can you do better" msg
if currentPoints > 3/4 total, display a congratulations msg
for all three options, offer a chance to play again using a button
```

if "play again" button is clicked, ``` initGame()```
</p>