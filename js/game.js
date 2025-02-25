/* 
Name: Zeshan Bombaywala 
Student Number: 
Description: The javascript behind the functionality of the form, help menu and game.
*/


window.addEventListener("load", function(event){
    let submit = document.getElementById("submit_btn");
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let btn_warn = document.getElementById("warning");
    let form = document.getElementById("form");
    let board = document.getElementById("board");
    let info = document.getElementById("info");
    let help = document.getElementById("help");
    let rules = document.getElementById("rules");
    let score = document.getElementById("score");
    let comp = document.getElementById("computerChoice");
    let WLC = document.getElementById('result');
    let compIMG = document.getElementById("CC"); //computer choices img
    let chall = document.getElementById("challange");
    let rock = document.getElementById("rock");
    let paper = document.getElementById("paper");
    let scissors = document.getElementById("scissors");
    let end_screen = document.getElementById("end");
    let end_msg = document.getElementById("end_msg");
    let exit_btn = document.getElementById("exit");
    let restart_btn = document.getElementById("restart");


    let open = false; // HELP drop down menu

    // Menu Form
    btn_warn.style.visibility = "hidden";
    name.addEventListener("focus", function(event){
        this.style["background-color"] = "lightgrey";
    });
    name.addEventListener("blur", function(event){
        this.style["background-color"] = "";
    });
    age.addEventListener("focus", function(event){
        this.style["background-color"] = "lightgrey";
    });
    age.addEventListener("blur", function(event){
        this.style["background-color"] = "";
    });
    submit.disabled = true;
    checkform();

    /**
     * Validates the Menu Form inputs and enables/disables the submit button.
     * @function checkform
     * @returns {void}
     */

    function checkform(){
        let nameValid = false;
        let ageValid = false;

        /**
         * Updates the submit button's state based on form validation.
         * Disables the button if any field is invalid.
         * Shows a warning message if inputs are incorrect.
         */
        function checkBTN() {
            submit.disabled = !(nameValid && ageValid);
            
            if (!nameValid || !ageValid) {
                btn_warn.style.visibility = "visible";
                btn_warn.style["color"] = "red";
            } else {
                btn_warn.style.visibility = "hidden";
            }
        }

        name.addEventListener("input", function (event) {
            nameValid = this.value.trim() !== "" && isNaN(this.value);
            checkBTN();
        });

        age.addEventListener("input", function (event) {
            ageValid = this.value !== "" && !isNaN(this.value);
            checkBTN();
        });
    }

    submit.addEventListener("click", function(event){
        form.style.display = "none";
        board.style.display = "flex";
        info.style.display = "block";
        score.style.display = "flex";
        chall.style.display = "flex";
    });

    let fav_color = document.getElementById("color");
    board.style.border = `10px solid ${fav_color.value}`;
    
    fav_color.addEventListener("input", function (event) {
        board.style.borderColor = fav_color.value;
    });

    // Game Logic
    let attempts = 0;
    rock.addEventListener("click", function(event) {
        attempts +=1;
        playRound("rock");
    });
    paper.addEventListener("click", function(event) {
        attempts +=1;
        playRound("paper");
    });
    scissors.addEventListener("click", function(event) {
        attempts +=1;
        playRound("scissors");
    });

    /**
     * Runs a round of the game with the given player choice.
     * @param {string} playerChoice - The player's choice ("rock", "paper", or "scissors").
     * @returns
     */

    function playRound(playerChoice) {
        let computerChoice = getComputerChoice();
        let result = Winner(playerChoice, computerChoice);
        displayResult(result);
    }
    
    /**
     * Randomly selects a choice for the computer
     * @returns Randomly chooses between rock, paper or scissors. 
     */

    function getComputerChoice() {
        let choices = ["rock", "paper", "scissors"];
        let randomChoice = Math.floor(Math.random() * choices.length);
        if (randomChoice == 0){
            compIMG.src = "images/rock.png";
        } else if(randomChoice == 1){
            compIMG.src = "images/paper.png";
        } else{
            compIMG.src = "images/scissors.png";
        }
        return choices[randomChoice];
    }

    /**
     * Determines the winner of the game round, updates points, and checks if the game should end.
     * @param {string} player - The player's choice.
     * @param {string} computer - The computer's choice.
     * @returns {string} Message showing the result of the round.
     */

    let points = 0;
    function Winner(player, computer) {
        if (player === computer) {
            let my_age = parseInt(age.value);
            points += my_age;
            score.innerText = points.toString();
            WLC.style["background-color"] = "darkblue";
            end_game();
            return `It's a tie! Both choose ${player}. But you get ${age.value} extra points because of your age!`;
        } else if ((player === 'rock' && computer === 'scissors') || (player === 'paper' && computer === 'rock') || (player === 'scissors' && computer === 'paper')) {
            points += 10;
            score.innerText = points.toString();
            WLC.style["background-color"] = "green";
            end_game();
            return `${name.value} you win! ${player} beats ${computer}.`;
        } else {
            points -= 5;
            score.innerText = points.toString();
            WLC.style["background-color"] = "orange";
            end_game();
            return `${name.value} you lost. ${computer} beats ${player}.`;
        }
    }

    /**
     * Checks if the player has reached 50 points to end the game and displays the end screen.
     */
    function end_game(){
        if(points >= 50){
            board.style.display = "none";
            comp.style.display = "none";
            end_screen.style.display = "flex";
            score.style.display = "none";
            chall.style.display = "none"
            end_msg.innerHTML = `Game Over: It took you ${attempts} tries to reach 50 points.`;
        }
    }

    /**
     * Displays the result of the current game round.
     * @param {string} result - The result message to display.
     */
    
    function displayResult(result) {
        comp.style.display = "block";
        WLC.textContent = result;
        end_game();
    }

    exit_btn.addEventListener("click", function(event) {
        document.location.reload();
    });

    restart_btn.addEventListener("click", function(event) {
        points = 0;
        attempts = 0;
        score.innerText = '0';
        end_screen.style.display = "none";
        board.style.display = "flex";
        comp.style.display = "none";
        WLC.style.backgroundColor = "";
        chall.style.display = "flex";
        score.style.display = "flex";
    });

    // Toggle Help Menu
    help.addEventListener("click", function(event) {
        if (open) {
          rules.style.display = "none";
          open = false;
        } else {
          rules.style.display = "flex";
          open = true;
        }
      })
});

