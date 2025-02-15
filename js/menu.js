window.addEventListener("load", function(event){
    let submit = document.getElementById("submit_btn");
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    let color = document.getElementById("color");
    let btn_warn = document.getElementById("name_warning")
    
    function checks_form(){
        if(name.value && age.value && color.value == "");
            console.log("t")
            btn_warn.style.visibility = visible;
            btn_warn.style.color = "red";


    }
    submit.addEventListener("click", function(){
        checks_form();
    });
});