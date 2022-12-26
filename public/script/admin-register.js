const uname = document.querySelector("#inputUsername");
const pass = document.querySelector("#inputPassword");
const conf_pass = document.querySelector("#inputConfirmPassword");
const pass_length_message = document.querySelector(".pass-length");
const reg_btn = document.querySelector("#register-btn");

let isPassLong = false;
let doesPassMatch = false;

var pass_length = function () {
  if (pass.value.length < 8) {
    isPassLong = false;
    pass_length_message.innerHTML = "Password must be at least 8 characters";
  } else {
    isPassLong = true;
    pass_length_message.innerHTML = "";
  }
};

var match = function () {
  if (pass.value != conf_pass.value) {
    doesPassMatch = false;
    conf_pass.classList.add("focus-red");
  } else {
    doesPassMatch = true;
    conf_pass.classList.remove("focus-red");
  }
};

document.addEventListener("keyup", () => {
  if (uname && isPassLong && doesPassMatch) {
    reg_btn.disabled = false;
  } else {
    reg_btn.disabled = true;
  }
});
