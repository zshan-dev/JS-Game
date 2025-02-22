/* 
Name: Zeshan Bombaywala 
Student Number: 
Description: 
*/


window.addEventListener("load", function(event){
    let submit = document.getElementById("submit_btn");
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let color = document.getElementById("color");
    let btn_warn = document.getElementById("warning");
    let form = document.getElementById("form");
    let board = document.getElementById("board");
    let info = document.getElementById("info");
    let help = document.getElementById("help");
    let rules = document.getElementById("rules");
    let score = document.getElementById("score");
    let comp = document.getElementById("computerChoice");
    let WLC = document.getElementById('result');
    let compIMG = document.getElementById("CC");


    let open = false; // HELP drop down menu

    // Menu Form
    btn_warn.style.visibility = "hidden";
    name.addEventListener("focus", function(event){
        this.style["background-color"] = "lightgrey"
    });
    name.addEventListener("blur", function(event){
        this.style["background-color"] = "";
    });
    age.addEventListener("focus", function(event){
        this.style["background-color"] = "lightgrey"
    });
    age.addEventListener("blur", function(event){
        this.style["background-color"] = "";
    });
    submit.disabled = true;
    checkform();


    /**
     * Menu Form
     * @param {Form} Event
     * @returns User Info
     */

    function checkform(){
        let nameValid = false;
        let ageValid = false;

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
    });

    let fav_color = document.getElementById("color");
    board.style.border = `10px solid ${fav_color.value}`;
    
    fav_color.addEventListener("input", function (event) {
        board.style.borderColor = fav_color.value;
    });

    // Game Logic
    document.getElementById('rock').addEventListener('click', function(event) {
        playRound('rock');
    });
    document.getElementById('paper').addEventListener('click', function(event) {
        playRound('paper');
    });
    document.getElementById('scissors').addEventListener('click', function(event) {
        playRound('scissors');
    });

    /**
     * Game
     * @param {playRound} playerChoice
     * @returns The result of who won
     */

    
    function playRound(playerChoice) {
        let computerChoice = getComputerChoice();
        let result = Winner(playerChoice, computerChoice);
        displayResult(result);
    }
    
    /**
     * Game
     * @param {getComputerChoice} 
     * @returns Randomly chooses between rock, paper or scissors. 
     */

    function getComputerChoice() {
        let choices = ['rock', 'paper', 'scissors'];
        let randomChoice = Math.floor(Math.random() * choices.length); //0,1,2
        if (randomChoice == 0){
            compIMG.src = "images/rock.jpg";
        } else if(randomChoice == 1){
            compIMG.src = "images/paper.jpg";
        } else{
            compIMG.src = "images/scissors.png";
        }
        return choices[randomChoice];
    }

    /**
     * Game
     * @param {Winner}
     * @returns Determines the Winner of the game
     */

    let points = 0;
    function Winner(player, computer) {
        if (player === computer) {
            let my_age = parseInt(age.value);
            points += my_age;
            score.innerText = points.toString();
            WLC.style["background-color"] = "darkblue";
            return `It's a tie! Both choose ${player}. But you get ${age.value} extra points because of your age!`;
        } else if ((player === 'rock' && computer === 'scissors') || (player === 'paper' && computer === 'rock') || (player === 'scissors' && computer === 'paper')) {
            points += 10;
            score.innerText = points.toString();
            WLC.style["background-color"] = "green";
            return `${name.value} you win! ${player} beats ${computer}.`;
        } else {
            points -= 5;
            score.innerText = points.toString();
            WLC.style["background-color"] = "orange";
            return `${name.value} you lost. ${computer} beats ${player}.`;
        }
    }

    /**
     * Game
     * @param {displayResult} result
     * @returns Displays the outcome of the game.
     */

    function displayResult(result) {
        comp.style.display = "block";
        WLC.textContent = result;
    }

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