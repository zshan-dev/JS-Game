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

    let open = false; // help drop down menu

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
        board.style.display = "flex"
        info.style.display = "block"
        score.style.display = "flex"
    });

    let fav_color = document.getElementById("color");
    board.style.border = `10px solid ${fav_color.value}`;
    
    fav_color.addEventListener("input", function (event) {
        board.style.borderColor = fav_color.value;
    });

    // Game Logic

    let x = score;

    document.getElementById('rock').addEventListener('click', function(event) {
        playRound('rock');
    });
    
    document.getElementById('paper').addEventListener('click', function(event) {
        playRound('paper');
    });
    
    document.getElementById('scissors').addEventListener('click', function(event) {
        playRound('scissors');
    });
    
    function playRound(playerChoice) {
        let computerChoice = getComputerChoice();
        let result = Winner(playerChoice, computerChoice);
        displayResult(result);
    }
    
    function getComputerChoice() {
        let choices = ['rock', 'paper', 'scissors'];
        let randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    }
    
    function Winner(player, computer) {
        if (player === computer) {
            return `It's a tie! Both chose ${player}.`;
        } else if ((player === 'rock' && computer === 'scissors') ||
                   (player === 'paper' && computer === 'rock') ||
                   (player === 'scissors' && computer === 'paper')) {
            return `You win! ${player} beats ${computer}.`;
        } else {
            return `You lose! ${computer} beats ${player}.`;
        }
    }
    
    function displayResult(result) {
        document.getElementById("result").style.display = "flex"
        document.getElementById('result').textContent = result;
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