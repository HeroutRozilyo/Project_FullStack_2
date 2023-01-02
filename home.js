var UserNow = JSON.parse(window.localStorage.getItem('CurrenUser'));
function openForm() {
    document.getElementById("myForm").style.display = "block";
    var UserNow = JSON.parse(window.localStorage.getItem('CurrenUser'));
    nameNow = UserNow.name;
    totalscore = UserNow.Score;
    allgamenow = UserNow.allGame;
    //popUp page
    document.getElementById('name').innerHTML = "Hello " + nameNow + "!";
    document.getElementById('TotalScore').innerHTML = "Your Total Score is " + totalscore + " good job!";
    document.getElementById('numPlay').innerHTML = "You played in " + allgamenow + " game, keep going!";
    document.getElementById('place').innerHTML = "Your Place is " + place();
    var one = placebyIndex(0);
    var two = placebyIndex(1);
    var three = placebyIndex(2);
    if (one === "It's empty!") {
        document.getElementById('one').innerHTML = one;

    }
    else {
        document.getElementById('one').innerHTML = one.name;
        document.getElementById('oneScore').innerHTML = one.Score;
       
    }

    if (two === "It's empty!") {
        document.getElementById('two').innerHTML = two;
    }
    else {
        document.getElementById('two').innerHTML = two.name;
        document.getElementById('twoScore').innerHTML = two.Score;

    }
    if (three === "It's empty!") {
        document.getElementById('three').innerHTML = three;

    }
    else {
        document.getElementById('three').innerHTML = three.name;
        document.getElementById('threeScore').innerHTML = three.Score;
      
    }




}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
function place() {
    var users = JSON.parse(localStorage.getItem("users")) ?? [];
    
    var res = users.sort(({Score:a}, {Score:b}) => b-a);
    
    var index = res.findIndex(x => x.email === UserNow.email);
    index += 1;
    return index;
}

function placebyIndex(index) {
    var users = JSON.parse(localStorage.getItem("users")) ?? [];

    var res = users.sort(({Score:a}, {Score:b}) => b-a);
    if (index < res.length)
        return res[index];
    else
        return "It's empty!"
}

function signOut(){
    window.localStorage.removeItem('CurrenUser');
    window.location.href = "signIn.html";
}