let eye_button =document.getElementById("showpassword-button");
let password = document.getElementById("pass");
function showpass() {
    if(password.value != ""){
        eye_button.innerHTML = `<i class="fa fa-eye" style="color:rgb(98, 30, 162);"></i>`;
        password.type = 'text';
    }
}
function hidepass() {
    eye_button.innerHTML = `<i class="fa fa-eye-slash" style="color:rgb(98, 30, 162);"></i>`;
    password.type = 'password';
}
