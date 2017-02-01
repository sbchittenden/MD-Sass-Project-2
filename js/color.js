///////////////////////
// Color picker form //
///////////////////////

// retrieve form element
var colorBuildForm = document.getElementById('color_form');

// retrieve color window element
var colorWindow = document.getElementById('color-window');

// retrieve input elements
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var alpha = document.getElementById('alpha');

// add event listener for red input slider
red.addEventListener('change', function(event) {
    colorWindow.style.backgroundColor = 'rgba(' + red.value + ',' + green.value + ',' + blue.value + ',' + alpha.value + ')';
});

// add event listener for green input slider
green.addEventListener('change', function(event) {
    colorWindow.style.backgroundColor = 'rgba(' + red.value + ',' + green.value + ',' + blue.value + ',' + alpha.value + ')';
});

// add event listener for blue input slider
blue.addEventListener('change', function(event) {
    colorWindow.style.backgroundColor = 'rgba(' + red.value + ',' + green.value + ',' + blue.value + ',' + alpha.value + ')';
});

// add event listener for alpha input slider
alpha.addEventListener('change', function(event) {
    colorWindow.style.backgroundColor = 'rgba(' + red.value + ',' + green.value + ',' + blue.value + ',' + alpha.value + ')';
});

// add event listener for form submission
colorBuildForm.addEventListener('submit', function(event) {
	event.preventDefault();

	window.alert('Your color is: ' + 'rgba(' + red.value + ',' + green.value + ',' + blue.value + ',' + alpha.value + ')');
});
