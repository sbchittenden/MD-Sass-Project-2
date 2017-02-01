//////////////////////
// Credit card form //
//////////////////////

// retrieve form element
var ccForm = document.getElementById('cc_form');

// retrieve various form elements
var fullName = document.getElementById('full_name');
var creditCardNumber = document.getElementById('cc_number');
var cvcCode = document.getElementById('cvc');
var expMonth = document.getElementById('expiration_month');
var expYear = document.getElementById('expiry_year');
var error = document.querySelectorAll('.error');

// add event listener for ccForm submission
ccForm.addEventListener('submit', function(event) {

    // stop the event from its default action: submitting the form (for our validation, submission is not desired)
    event.preventDefault();

    /*------------------------------------------
    validation for full_name (Name on Card) input
    --------------------------------------------*/
    // full name should not be empty
    if (validator.isEmpty(fullName.value)) {
        error[0].innerHTML = "Oops! Please enter your full name.";
        error[0].className = "error active";
        fullName.parentNode.classList.add("invalid");
        // full name should not have extra whitespace
    } else if (!validator.isTrimmed(fullName.value)) {
        error[0].innerHTML = "Please don't include any extra whitespace.";
        error[0].className = "error active";
        fullName.parentNode.classList.add("invalid");
    } else {
        fullName.parentNode.classList.remove("invalid");
        ccForm.className = "valid";
    }

    /*-------------------------------------------
    validation for credit card number input field  
    ----------------------------------------------*/

    // cc number field should not be empty
    if (validator.isEmpty(creditCardNumber.value)) {
        error[1].innerHTML = "Oh oh! Please enter a card number.";
        error[1].className = "error active";
        creditCardNumber.parentNode.classList.add("invalid");
        // input should pass isCreditCard validation
    } else if (!validator.isCreditCard(creditCardNumber.value)) {
        error[1].innerHTML = "Doh! Your card number doesn't look right...";
        error[1].className = "error active";
        creditCardNumber.parentNode.classList.add("invalid");
    } else {
        creditCardNumber.parentNode.classList.remove("invalid");
        ccForm.className = "valid";
    }

    /*-------------------------------------------
    validation for cvc code input field  
    ----------------------------------------------*/

    // cvc code should not be empty
    if (validator.isEmpty(cvcCode.value)) {
        error[2].innerHTML = "Whoops. Please enter your CVC code.";
        error[2].className = "error active";
        cvcCode.parentNode.classList.add("invalid");
        // cvc code should be composed of only numbers
    } else if (!validator.isComposedOf(cvcCode.value, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])) {
        error[2].innerHTML = "Ahem... Your CVC code should only contain numbers.";
        error[2].className = "error active";
        cvcCode.parentNode.classList.add("invalid");
    } else {
        cvcCode.parentNode.classList.remove("invalid");
        ccForm.className = "valid";
    }

    /*-------------------------------------------
    validation for expiration date options  
    ----------------------------------------------*/
    var month = expMonth.value;
    var year = expYear.value;

    // expiration date should not be set to 'month' or 'year'
    if (month === "month" || year === "year") {
        error[3].innerHTML = "Please select your expiration date";
        error[3].className = "error active";
        expMonth.parentNode.classList.add("invalid");
        // expiration date should be after today    
    } else if (month !== "month" && year !== "year") {
        if (!validator.isAfterToday(new Date(+year, (+month + 1)))) {
            error[3].innerHTML = "Oops! Looks like that card may be expired";
            error[3].className = "error active";
            expMonth.parentNode.classList.add("invalid");
        }
    } else {
        expMonth.parentNode.classList.remove("invalid");
        ccForm.className = "valid";
    }

});

// add event listener for input on full name field
fullName.addEventListener('input', function(event) {
    // check for and reset error on input
    if (error[0].innerHTML !== "") {
        error[0].innerHTML = "";
        error[0].className = "error";
        fullName.parentNode.classList.remove("invalid");
    }
});

// add event listener for input on cc number field
creditCardNumber.addEventListener('input', function(event) {
    // check for and reset error on input
    if (error[1].innerHTML !== "") {
        error[1].innerHTML = "";
        error[1].className = "error";
        creditCardNumber.parentNode.classList.remove("invalid");
    }
});

// add event listener for input on cvc code field
cvcCode.addEventListener('input', function(event) {
    // check for and reset error on input
    if (error[2].innerHTML !== "") {
        error[2].innerHTML = "";
        error[2].className = "error";
        cvcCode.parentNode.classList.remove("invalid");
    }
});

// add event listener for input on expiry year 
expYear.addEventListener('input', function(event) {
    // check for and reset error on input
    if (error[3].innerHTML !== "") {
        error[3].innerHTML = "";
        error[3].className = "error";
        expYear.parentNode.classList.remove("invalid");
    }
});

// add event listener for input on expiry month 
expMonth.addEventListener('input', function(event) {
    // check for and reset error on input
    if (error[3].innerHTML !== "") {
        error[3].innerHTML = "";
        error[3].className = "error";
        expMonth.parentNode.classList.remove("invalid");
    }
});
