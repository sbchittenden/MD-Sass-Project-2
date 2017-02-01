// (function(window) {

    // initialize the validator object
    var validator = {};

    ////////////////////////////
    // .isEmailAddress(input) //
    ////////////////////////////
    validator.isEmailAddress = function(input) {
        // check to see if input exists
        try {
            if (!input) {
                throw "Oops! Looks like you forgot to enter an email address";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // break up input into different strings to use in conditional tests
        var atSymLoc = input.indexOf('@'); // location of '@' symbol
        var atSym = input.slice(atSymLoc, atSymLoc + 1); // '@' symbol string
        var address = input.slice(0, atSymLoc); // portion of input before '@'
        var domain = input.slice(atSymLoc + 1); // portion of input after '@'
        var domainXLoc = domain.lastIndexOf('.'); // location of last '.' in domain portion
        var domainExtension = domain.slice(domainXLoc + 1); // domain extension (without '.')

        // check for existence of '@' symbol
        try {
            if (atSymLoc < 0) {
                throw "Invalid input: Email address must contain '@' symbol";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // check for existence of address portion (before '@')
        try {
            if (address.length === 0) {
                throw "Invalid input: Email address is incomplete (no address)";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // check for existence of domain portion (after '@')
        try {
            if (domain.length === 0) {
                throw "Invalid input: Email address is incomplete (no domain)";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // make sure email address ends with a valid domain
        try {
            if (domainXLoc < 0 || domainExtension.length < 2) {
                throw "Invalid input: Email address domain does not appear to be valid";
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    };

    //////////////////////////
    //.isPhoneNumber(input) //
    //////////////////////////

    validator.isPhoneNumber = function(input) {
        var phoneNum = input;
        // check for and remove any '-' characters from phoneNum
        if (phoneNum.indexOf('-') !== -1) {
            var i;
            for (i = 0; i < phoneNum.length; i++) {
                phoneNum = phoneNum.replace('-', '');
            }
        }

        // check to see if phoneNum contains 10 digits
        try {
            if (phoneNum.length !== 10) {
                if (phoneNum.length === 11 && phoneNum.charAt(0) === '1') {
                    return true;
                }
                throw "Invalid input: The phone number you have entered does not appear to be valid. Please enter your 10-digit phone number (XXX-XXX-XXXX)";
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    };

    ////////////////////////////
    // .withoutSymbols(input) //
    ////////////////////////////

    validator.withoutSymbols = function(input) {
        // comparison array
        var alphaNumeric = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9'
        ];
        var inputArr = input.split('');

        function removeSymbols(arr1, arr2) {
            var modified = [];
            arr1.forEach(function(element) {
                if (arr2.indexOf(element) !== -1) {
                    modified.push(element);
                }
            });
            return modified;
        }

        return removeSymbols(inputArr, alphaNumeric).join('');
    };

    ////////////////////
    // .isDate(input) //
    ////////////////////

    validator.isDate = function(input) {
        var inputDate;
        // convert date input to array and remove either spaces or '_'
        if (input.indexOf('-') !== -1) {
            inputDate = input.split('-');
        } else if (input.indexOf(' ') !== -1) {
            inputDate = input.split(' ');
        } else if (input.indexOf('/') !== -1) {
            inputDate = input.split('/');
        }

        // try parsing Date object from input string
        var dateString = new Date(inputDate).toString();

        try {
            if (dateString === 'Invalid Date') {
                throw "Invalid Date: Please enter a valid date following the format MM-DD-YYYY";
            }
        } catch (error) {
            console.log(error);
            return false;
        }
        // **the following code enforces a date input format of MM-DD-YYYY**

        // make sure input date has only 3 components (mm-dd-yyyy)
        try {
            if (inputDate.length !== 3) {
                throw "Invalid Date: Please include a Month, Day, and Year following the format (MM-DD-YYYY)";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // make sure input year is 4 digits long
        try {
            if (inputDate[2].length !== 4) {
                throw "Invalid Date: Please enter a valid date following the format (MM-DD-YYYY)";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // make sure input month is a valid month
        try {
            if (+(inputDate[0]) > 12 || +(inputDate[0]) < 1) {
                throw "Invalid Date: Please enter a valid 2-digit month following the format (MM-DD-YYYY)";
            }
        } catch (error) {
            console.log(error);
            return false;
        }

        // function to check if input year is a leap year
        function leapFinder(year) {
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                return true;
            } else {
                return false;
            }
        }

        // check to see if input month is February
        if (+(inputDate[0]) === 2) {
            // check to see if input year is a leap year
            var leapYear = leapFinder(+(inputDate[2]));
            // if not a leap year make sure day is not greater than 28
            try {
                if (!leapYear) {
                    if (+(inputDate[1]) > 28) {
                        throw "Invalid Date: Oops! " + inputDate[2] + " is not a leap year. Please enter a corrected date (MM-DD-YYYY)";
                    }
                }
            } catch (error) {
                console.log(error);
                return false;
            }
            // if it is a leap year make sure day is not greater than 29
            try {
                if (leapYear) {
                    if (+(inputDate[1]) > 29) {
                        throw "Invalid Date: Oops! " + inputDate[2] + " is a leap year. Please enter a corrected date (MM-DD-YYYY)";
                    }
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        }

        // check to see if input day is invalid for specified month
        // months with 30 days
        if (+(inputDate[0]) === 4 || +(inputDate[0]) === 6 || +(inputDate[0]) === 9 || +(inputDate[0]) === 11) {
            try {
                if (+(inputDate[1]) > 30 || +(inputDate[1]) < 1) {
                    throw "Invalid Date: Oops! That month doesn't have " + inputDate[1] + " days in it. Please enter a corrected date (MM-DD-YYYY)";
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        }

        // months with 31 days
        if (+inputDate[0] === 1 || +inputDate[0] === 3 || +inputDate[0] === 5 || +inputDate[0] === 7 || +inputDate[0] === 8 || +inputDate[0] === 10 || +inputDate[0] === 12) {
            try {
                if (+(inputDate[1]) > 31 || +(inputDate[1]) < 1) {
                    throw "Invalid Date: Please enter a valid 2-digit day (MM-DD-YYYY)";
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        }

        return true;
    };

    /////////////////////////////////////
    // .isBeforeDate(input, reference) //
    /////////////////////////////////////

    validator.isBeforeDate = function(input, reference) {

        var inputDate, refDate;
        // check to see if input and reference parameters are strings or date objects
        if (typeof input === 'string') {

            // make sure input string is a valid date
            try {
                if (!validator.isDate(input)) {
                    throw "Oops! Your input date is not valid";
                } else {
                    inputDate = new Date(input);
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        } else if (typeof input === 'object') {
            inputDate = input;
        }

        if (typeof reference === 'string') {
            // make sure reference string is a valid date
            try {
                if (!validator.isDate(reference)) {
                    throw "Oops! Your reference date is not valid";
                } else {
                    refDate = new Date(reference);
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        } else if (typeof reference === 'object') {
            refDate = reference;
        }

        // compare input and reference dates
        if (inputDate < refDate) {
            return true;
        } else {
            return false;
        }

    };

    ////////////////////////////////////
    // .isAfterDate(input, reference) //
    ////////////////////////////////////

    validator.isAfterDate = function(input, reference) {
        var inputDate, refDate;
        // check to see if input and reference parameters are strings or date objects
        if (typeof input === 'string') {

            // make sure input string is a valid date
            try {
                if (!validator.isDate(input)) {
                    throw "Oops! Your input date is not valid";
                } else {
                    inputDate = new Date(input);
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        } else if (typeof input === 'object') {
            inputDate = input;
        }

        if (typeof reference === 'string') {
            // make sure reference string is a valid date
            try {
                if (!validator.isDate(reference)) {
                    throw "Oops! Your reference date is not valid";
                } else {
                    refDate = new Date(reference);
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        } else if (typeof reference === 'object') {
            refDate = reference;
        }

        // compare input and reference dates
        if (inputDate > refDate) {
            return true;
        } else {
            return false;
        }
    };

    ///////////////////////////
    // .isBeforeToday(input) //
    ///////////////////////////

    validator.isBeforeToday = function(input) {
        var inputDate;
        var today = new Date();

        // check to see if input parameters is string or date object
        if (typeof input === 'string') {

            // make sure input string is a valid date
            try {
                if (!validator.isDate(input)) {
                    throw "Oops! Your input date is not valid";
                } else {
                    inputDate = new Date(input);
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        } else if (typeof input === 'object') {
            inputDate = input;
        }



        // compare input date and current date
        if (inputDate < today) {
            return true;
        } else {
            return false;
        }
    };

    //////////////////////////
    // .isAfterToday(input) //
    //////////////////////////

    validator.isAfterToday = function(input) {
        var inputDate;
        var today = new Date();

        // check to see if input parameters is string or date object
        if (typeof input === 'string') {

            // make sure input string is a valid date
            try {
                if (!validator.isDate(input)) {
                    throw "Oops! Your input date is not valid";
                } else {
                    inputDate = new Date(input);
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        } else if (typeof input === 'object') {
            inputDate = input;
        }



        // compare input date and current date
        if (inputDate > today) {
            return true;
        } else {
            return false;
        }
    };

    /////////////////////
    // .isEmpty(input) //
    /////////////////////

    validator.isEmpty = function(input) {
        // make sure input is a string
        if (typeof input !== 'string') {
            return false;
        }
        // check if string is empty or only contains whitespace
        for (var i = 0; i < input.length; i++) {
            if (input.charAt(i) !== ' ') {
                return false;
            }
        }
        return true;
    };

    /////////////////////////////
    // .contains(input, words) //
    /////////////////////////////

    validator.contains = function(input, words) {
        var alphaNumeric = [' ', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9'
        ];

        var inputArr = input.split('');

        function removeSymbols(arr1, arr2) {
            var modified = [];
            arr1.forEach(function(element) {
                if (arr2.indexOf(element) !== -1) {
                    modified.push(element);
                }
            });
            return modified.join('');
        }
        // remove all punctuation from input except for '-'
        var inputNoPunct = removeSymbols(inputArr, alphaNumeric);
        // split hyphenated words
        while (inputNoPunct.indexOf('-') > -1) {
            inputNoPunct = inputNoPunct.replace('-', ' ');
        }
        // create array of words in the input string
        var inputWordArray = inputNoPunct.toLowerCase().split(' ');

        // function to compare arrays
        function ifExists(arr1, arr2) {
            var exists = [];
            arr1.forEach(function(item) {
                if (arr2.indexOf(item) !== -1) {
                    exists.push(item);
                }
            });
            return exists.length > 0;
        }

        // ifExists true if there are words in common and false if there are not
        return ifExists(words, inputWordArray);

    };

    //////////////////////////
    // .lacks(input, words) //
    //////////////////////////

    validator.lacks = function(input, words) {
        var alphaNumeric = [' ', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4',
            '5', '6', '7', '8', '9'
        ];

        var inputArr = input.split('');

        function removeSymbols(arr1, arr2) {
            var modified = [];
            arr1.forEach(function(element) {
                if (arr2.indexOf(element) !== -1) {
                    modified.push(element);
                }
            });
            return modified.join('');
        }
        // remove all punctuation from input except for '-'
        var inputNoPunct = removeSymbols(inputArr, alphaNumeric);
        // split hyphenated words
        while (inputNoPunct.indexOf('-') > -1) {
            inputNoPunct = inputNoPunct.replace('-', ' ');
        }
        // create array of words in the input string
        var inputWordArray = inputNoPunct.toLowerCase().split(' ');

        // function to compare arrays
        function ifNoExists(arr1, arr2) {
            var exists = [];
            arr1.forEach(function(item) {
                if (arr2.indexOf(item) !== -1) {
                    exists.push(item);
                }
            });
            return exists.length === 0;
        }

        // ifNoExists returns true if there are no words in common
        return ifNoExists(words, inputWordArray);
    };

    ///////////////////////////////////
    // .isComposedOf(input, strings) //
    ///////////////////////////////////

    validator.isComposedOf = function(input, strings) {
        var results = [];

        // array to remove punctuation
        var alphaNumeric = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9'
        ];

        var inputArr = input.split('');

        // function to remove punctuation from input
        function removeSymbols(arr1, arr2) {
            var modified = [];
            arr1.forEach(function(element) {
                if (arr2.indexOf(element) !== -1) {
                    modified.push(element);
                }
            });
            return modified.join('');
        }

        // remove all punctuation from input
        input = removeSymbols(inputArr, alphaNumeric);

        // function to remove spaces from input
        function removeSpaces(str) {
            var i;
            var newStr = str;
            for (i = 0; i < str.length; i++) {
                newStr = newStr.replace(' ', '');
            }
            return newStr;
        }
        // remove spaces from input
        input = removeSpaces(input);

        // create an array of all words in input that can be made from strings in strings array
        strings.forEach(function(item) {
            var i, k;
            for (i = 0; i <= input.length; i++) {
                for (k = 1; k <= input.length; k++) {
                    if (input.toLowerCase().slice(i, k) === item.toLowerCase()) {
                        results.push(input.slice(i, k));
                    }
                }
            }
        });

        // compare input to results
        if (input.length === results.join('').length) {
            return true;
        } else {
            return false;
        }

    };

    /////////////////////////
    // .isLength(input, n) //
    /////////////////////////

    validator.isLength = function(input, n) {
        if (input.length <= n) {
            return true;
        } else {
            return false;
        }
    };

    ///////////////////////////
    // .isOfLength(input, n) //
    ///////////////////////////

    validator.isOfLength = function(input, n) {
        if (input.length >= n) {
            return true;
        } else {
            return false;
        }
    };

    ////////////////////////
    // .countWords(input) //
    ////////////////////////

    validator.countWords = function(input) {
        var alphaNumeric = [' ', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4',
            '5', '6', '7', '8', '9'
        ];

        var inputArr = input.split('');

        function removeSymbols(arr1, arr2) {
            var modified = [];
            arr1.forEach(function(element) {
                if (arr2.indexOf(element) !== -1) {
                    modified.push(element);
                }
            });
            return modified.join('');
        }

        // remove all punctuation from input except for '-'
        var inputNoPunct = removeSymbols(inputArr, alphaNumeric);

        // split hyphenated words
        while (inputNoPunct.indexOf('-') > -1) {
            inputNoPunct = inputNoPunct.replace('-', ' ');
        }

        // create array of words in the input string
        var inputWordArray = inputNoPunct.toLowerCase().split(' ');

        // check for empty string in an array with length of 1
        if (inputWordArray.length === 1 && inputWordArray[0] === '') {
            return 0;
        }

        return inputWordArray.length;
    };

    //////////////////////////////
    // .lessWordsThan(input, n) //
    //////////////////////////////

    validator.lessWordsThan = function(input, n) {
        var wordCount = validator.countWords(input);
        return wordCount <= n ? true : false;
    };

    //////////////////////////////
    // .moreWordsThan(input, n) //
    //////////////////////////////

    validator.moreWordsThan = function(input, n) {
        var wordCount = validator.countWords(input);
        return wordCount >= n ? true : false;
    };

    ////////////////////////////////////
    // .isBetween(input, floor, ceil) //
    ////////////////////////////////////

    validator.isBetween = function(input, floor, ceil) {
        return (input >= floor && input <= ceil) ? true : false;
    };

    ////////////////////////////
    // .isAlphanumeric(input) //
    ////////////////////////////

    validator.isAlphanumeric = function(input) {
        var aN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9'
        ];

        var inputArr = input.split('');

        var alpha = true;

        inputArr.forEach(function(element) {
            if (aN.indexOf(element) === -1) {
                alpha = false;
            }
        });

        return alpha;
    };

    //////////////////////////
    // .isCreditCard(input) //
    //////////////////////////

    validator.isCreditCard = function(input) {
        var noHyphens = input;

        // remove any hyphens from input
        if (input.indexOf('-') !== -1) {
            noHyphens = input.split('-').join('');
        }

        function isAlphanumeric(str) {
            var aN = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3',
                '4', '5', '6', '7', '8', '9'
            ];

            var inputArr = str.split('');

            var alpha = true;

            inputArr.forEach(function(element) {
                if (aN.indexOf(element) === -1) {
                    alpha = false;
                }
            });

            return alpha;
        };

        // check to see if input is alphanumeric
        var isAlpha = isAlphanumeric(noHyphens);

        // if input with no hyphens is 16 chars long and is alphanumeric return true
        return (noHyphens.length === 16 && isAlpha) ? true : false;
    };

    ///////////////////
    // .isHex(input) //
    ///////////////////

    validator.isHex = function(input) {

        var inputArr = input.split('');

        function isAllowed(str) {
            var input = str.toLowerCase().split('');
            var allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', '#'];
            var allowed = true;

            input.forEach(function(element) {
                if (allowedChars.indexOf(element) === -1) {
                    allowed = false;
                }
            });

            return allowed;
        }

        return (inputArr[0] === '#' && (input.length === 4 || input.length === 7) && isAllowed(input)) ? true : false;

    };

    ///////////////////
    // .isRGB(input) //
    ///////////////////

    validator.isRGB = function(input) {

        var isValidRGB = true;

        // check for correct input format
        if ((input.indexOf("rgb(") !== 0) || (input.indexOf(")") !== input.length - 1)) {
            return false;
        }
        // get comma separated values from within parentheses
        var rgbValues = input.slice(4, input.length - 1).split(',');

        // make sure rgbValues contains all 3 elements
        if (rgbValues.length !== 3) {
            return false;
        }

        // check to see that all rgbValues are within valid range
        rgbValues.forEach(function(element) {
            if (!(+element >= 0 && +element <= 255)) {
                isValidRGB = false;
            }
        });

        return isValidRGB;

    };

    ///////////////////
    // .isHSL(input) //
    ///////////////////

    validator.isHSL = function(input) {
        isValidHSL = true;

        // check for correct input format
        if ((input.indexOf("hsl(") !== 0) || (input.indexOf(")") !== input.length - 1)) {
            return false;
        }
        // get comma separated values from within parentheses
        var hslArr = input.slice(4, input.length - 1).split(',');

        // make sure hslArr contains 3 elements
        if (hslArr.length !== 3) {
            return false;
        }

        var hslValues = [];

        // convert number strings to numbers and push to hslValues array
        hslArr.forEach(function(value) {
            hslValues.push(parseFloat(value));
        });

        // check if Hue value is within range
        if (!(hslValues[0] >= 0 && hslValues[0] <= 360)) {
            isValidHSL = false;
        }

        // check if Saturation and Lightness values are between 0 and 1
        if (!((hslValues[1] >= 0 && hslValues[1] <= 1) && (hslValues[2] >= 0 && hslValues[2] <= 1))) {
            isValidHSL = false;
        }

        return isValidHSL;
    };

    /////////////////////
    // .isColor(input) //
    /////////////////////

    validator.isColor = function(input) {

        if (input.indexOf('#') === 0) {
            return validator.isHex(input);
        }

        if (input.indexOf('rgb(') === 0) {
            return validator.isRGB(input);
        }

        if (input.indexOf('hsl(') === 0) {
            return validator.isHSL(input);
        }

        return false;

    };

    ///////////////////////
    // .isTrimmed(input) //
    ///////////////////////

    validator.isTrimmed = function(input) {
        
        // check for leading or trailing whitespace
        if (input.charAt(0) === ' ' || input.charAt(input.length - 1) === ' ') {
            return false;
        }

        // split input into words
        var words = input.split(' ');

        // check for "empty words" aka extra whitespace in input
        if (words.indexOf('') !== -1) {
            return false;
        }

        return true;
    };

// add the validator object into the global window object for easier access 
// window.validator = validator;

// })(window);
