// const fName = document.querySelector("#inputfName");
const gigTitle = document.querySelector("#gigTitle");
const gigDesc = document.querySelector("#gigDesc");
const minBid = document.querySelector("#minBid");
const gigPoster = document.querySelector("#gigPoster");
const bidStart = document.querySelector("#bidStart");
const bidEnd = document.querySelector("#bidEnd");
const createGig_btn = document.querySelector("#createGig-btn");

var bidAmtValid = function () {
    if (minBid.value <=0 ) {
        alert("The minimum bidding should not be less than RM1");
            return false;
    }
    else  {
        function clicked() {
        if (confirm('Do you want to submit?')) {
            yourformelement.submit();
        } else {
            return false;
            }
        }
    }
};

// var dateValid = function () {
//     bidEnd.min = new Date().toLocaleDateString('en-ca');
//     bidStart.min = new Date().toLocaleDateString('en-ca');
// };


function dateValid() {
    var selectedText = bidStart.value;
    var selectedDate = new Date(selectedText);
    var now = new Date();
    if (selectedDate < now) {
     alert("Date must be in the future");
    }
  }

document.addEventListener("keyup", () => {
    if (gigTitle && gigDesc && minBid && gigPoster && bidStart && bidEnd) {
      createGig_btn.disabled = false;
    } else {
        createGig_btn.disabled = true;
    }
  });