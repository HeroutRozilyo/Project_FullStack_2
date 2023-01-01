function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });





    window.canBlock = true;

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 5) {
                setInputError(inputElement, "Username must be at least 5 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "emailCreate" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value))) {
                setInputError(inputElement, "emai not in the right format");
            }


        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("keyup", e => {
            var pw = document.getElementById("pass1").value;
            if (e.target.id === "pass2" && !document.getElementById("pass2").value.match(pw)) {

                setInputError(inputElement, "Passwords do not match");


            }



        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});



function OnclickSignIn() {
    //clean();
    var email1 = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //var jUser = JSON.parse(window.localStorage.getItem(email1));
    var users = JSON.parse(localStorage.getItem("users")) ?? [];
    //  users = JSON.parse(users);
    if (users === []) {

        setFormMessage(document.querySelector("#login"), "error", "this user not exits");

    }


    else {

        var jUser = users.find(i => i.email === email1) ?? null;

        if (jUser === null)
            setFormMessage(document.querySelector("#login"), "error", "this user not exits");

        else if (jUser.password === password && parseInt(jUser.tryAccess) > 0) {
            const user = {
                name: jUser.name,
                email: email1,
                password: password,
                Score: jUser.Score,
                allGame: jUser.allGame,
                tryAccess: '3',

            }
            window.localStorage.setItem("CurrenUser", JSON.stringify(user));
            window.location.href = "home.html";

        }

        else {
            //alert("not good!");
            setFormMessage(document.querySelector("#login"), "error", "Invalid username/password combination");
            var access = parseInt(jUser.tryAccess);
            access--;
            jUser.tryAccess = (access).toString();
            users = users.filter(item => item.email !== jUser.email)
            users.push(jUser);
            window.localStorage.removeItem('users');
            window.localStorage.setItem('users', JSON.stringify(users));
            if (access <= 0) {

                setFormMessage(document.querySelector("#login"), "error", "Your user has been blocked! please try gain in few minutes");
                if (window.canBlock) {
                    blockUser(jUser);
                }
            }
            else {

                setFormMessage(document.querySelector("#login"), "error", "Invalid username/password combination");
                setFormMessage(document.querySelector("#login"), "error", "You have more " + jUser.tryAccess + "trys");
            }




        }
    }
}

function blockUser(jUser) {
   
    window.canBlock = false;
    var seconds = 60;
    var mins = 5;
    const myTimeout = setInterval(clickClock, 1000);

    function clickClock() {

        var currentMinutes = mins - 1;
        seconds--;
        // counter.innerHTML = currentMinutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds >= 0) {
            setFormMessage(document.querySelector("#login"), "error", seconds);


        } else {
            setFormMessage(document.querySelector("#login"), "sucsses", "Try Again")
            clearInputError(document.querySelector("#login"));
            restartAccess(jUser);
            window.canBlock = true;
            clearInterval(myTimeout);


        }
    }


}
function restartAccess(jUser) {
    var newaccesee = 3;
    jUser.tryAccess = (newaccesee).toString();
    var users = JSON.parse(localStorage.getItem("users")) ?? [];
    users = users.filter(item => item.email !== jUser.email)
    users.push(jUser);
    window.localStorage.removeItem('users');
    window.localStorage.setItem('users', JSON.stringify(users));
}

function onClickNewUserfunc() {
    var username = document.getElementById("signupUsername").value;
    var email = document.getElementById("emailCreate").value;
    var pass = document.getElementById("pass1").value;
    var pass2 = document.getElementById("pass2").value;
    var users = JSON.parse(localStorage.getItem("users")) ?? [];
    // users = JSON.parse(users);

    //if (users.find(i => i.email === email)) {
    if (users.find(i => i.email === email)) {
        alert("Email address is taking");
        return;
    }

    if (username != "") {
        if (email != "" && pass != "" && pass2 != "") {
            if (pass.match(pass2)) {
                const user = {
                    name: username,
                    email: email,
                    password: pass,
                    Score: '0',
                    allGame: '0',
                    tryAccess: '3',
                }
                users.push(user);
                window.localStorage.setItem("users", JSON.stringify(users));
                alert("Welcome!");
            }
            else alert("check your password");
        }
        else alert("One or more fields are empty!");


    }
}

function clean() {
    localStorage.clear();
}
