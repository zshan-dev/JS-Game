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
    let game_board = document.getElementById("board");

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

    submit.addEventListener("click", function(){
        form.style.display = "none";
        game_board.style.visibility = "visible"
    });

    let fav_color = document.getElementById("color");
    let board = document.getElementById("board");
    board.style.border = `10px solid ${fav_color.value}`;
    
    fav_color.addEventListener("input", function () {
        board.style.borderColor = fav_color.value;
    });
    

});