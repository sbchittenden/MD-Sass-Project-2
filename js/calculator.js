((function(window) {

    //////////////////
    //calculator.js //
    //////////////////



    ///////////////////////////////////////////
    // retrieve calculator elements from DOM //
    //////////////////////////////////////////

    // calculator display
    var calculatorDisplay = document.getElementById('display');

    // clear all key
    var allClearKey = document.getElementById('clear');

    // delete key
    var deleteKey = document.getElementById('del');

    // equals key
    var equalsKey = document.getElementById('equals');

    // decimal key
    var decimalKey = document.getElementById('decimal');

    // number keys
    var zeroKey = document.getElementById('0');
    var oneKey = document.getElementById('1');
    var twoKey = document.getElementById('2');
    var threeKey = document.getElementById('3');
    var fourKey = document.getElementById('4');
    var fiveKey = document.getElementById('5');
    var sixKey = document.getElementById('6');
    var sevenKey = document.getElementById('7');
    var eightKey = document.getElementById('8');
    var nineKey = document.getElementById('9');

    // operator keys
    var addKey = document.getElementById('addition');
    var subKey = document.getElementById('subtract');
    var multiKey = document.getElementById('multiply');
    var divideKey = document.getElementById('divide');

    ///////////////////////////////////////////////////////////
    // function for appending key press to calculator screen //
    ///////////////////////////////////////////////////////////

    function appendInput(input) {
        var currentDisplay = calculatorDisplay.innerHTML;
        console.log(currentDisplay);
        calculatorDisplay.innerHTML = currentDisplay + input;
        console.log(calculatorDisplay);
    }

    ///////////////////////////////////////////
    // function to check for blinking cursor //
    ///////////////////////////////////////////

    function blinkRemove() {
        if (calculatorDisplay.innerHTML === '<span id="cursor">_</span>') {
            calculatorDisplay.innerHTML = '';
        }
    }

    //////////////////////////////////////////
    // add event listeners for key presses //
    /////////////////////////////////////////

    /* ------------ decimal key ------------------ */

    decimalKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('.');
    });

    /* ------------ number keys ------------------ */

    zeroKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('0');
    });

    oneKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('1');
    });

    twoKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('2');
    });

    threeKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('3');
    });

    fourKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('4');
    });

    fiveKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('5');
    });

    sixKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('6');
    });

    sevenKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('7');
    });

    eightKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('8');
    });

    nineKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('9');
    });

    /* ------------ operator keys ------------- */

    addKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('+');
    });

    subKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('-');
    });

    multiKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('*');
    });

    divideKey.addEventListener('click', function() {
        blinkRemove();
        appendInput('/');
    });

    /* ----------- clear all key --------------- */

    allClearKey.addEventListener('click', function() {
        if (calculatorDisplay.innerHTML !== '<span id="cursor">_</span>') {
            calculatorDisplay.innerHTML = '<span id="cursor">_</span>';
        }
    });

    /* ----------- delete key --------------- */

    deleteKey.addEventListener('click', function() {
        var deleted = calculatorDisplay.innerHTML.slice(0, -1);
        calculatorDisplay.innerHTML = deleted;
    });

    /* ----------- equals key --------------- */

    equalsKey.addEventListener('click', function() {
        var calcDisplayString = calculatorDisplay.innerHTML;
        var evaluatedInput = eval(calcDisplayString);
        var evalString = evaluatedInput.toString();
        
        if (evalString.slice(evalString.indexOf('.')).length > 8) {
            calculatorDisplay.innerHTML = evaluatedInput.toPrecision(4)
        } else {
            calculatorDisplay.innerHTML = evaluatedInput;
        }
    });








})(window));
