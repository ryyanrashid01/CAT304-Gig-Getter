const newPass = document.querySelector("#newPassword");
const confPass = document.querySelector("#confNewPassword");
const passSubmit = document.querySelector("#passwordSubmit");

let doesPassMatch = false;
let isPassLong = false;

var match = function () {
    if (newPass.value != confPass.value) {
      doesPassMatch = false;
      confPass.classList.add("focus-red");
    } else {
      doesPassMatch = true;
      confPass.classList.remove("focus-red");
    }
  };

  var pass_length = function () {
    if (newPass.value.length < 8) {
      isPassLong = false;
    } else {
      isPassLong = true;
    }
  };

document.addEventListener("keyup", () => {
    if (doesPassMatch && isPassLong) {
        passSubmit.disabled = false;
    } else {
        passSubmit.disabled = true;
    }
});