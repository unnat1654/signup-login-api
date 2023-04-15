function showpass() {
    let x = document.getElementById("rep");
    if(x.type=== 'password'){
        x.type = 'text';
    }
    else{
        x.type = 'password';
    }

}