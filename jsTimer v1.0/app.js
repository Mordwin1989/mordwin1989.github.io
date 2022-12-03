console.log('script confirmed running!');

//initialize ui
const timeSelection = document.querySelector('.flex-grid');
// Get the modal
var modal = document.getElementById("myModal");
// get modal content
var modalContent = document.querySelector('.modalContent');
// get modal.p 
const activeTimer = document.querySelector('#activeTimer');

//event listener
timeSelection.addEventListener('mousedown', startTimer);

let idRefNum = 0;
let timeInSeconds = 180;
let intervalId;

function startTimer(e){
	if(e.target.classList.contains('timers')){
		idRefNum = parseInt(e.target.id); //converts id to int 1-4
		adjustTime(idRefNum); //converts idRefNum to seconds
		setInitialTime(timeInSeconds + 1); //adding 1 in the parameter, seem lame, but it works
		intervalId = setInterval(updateCountdown, 1000);
		modal.style.display = "block";
	}
}


function adjustTime(idRefNum){
	let startingMinutes;
	switch(idRefNum){
		case 1:
			startingMinutes = 1;
			break;
		case 2:
			startingMinutes = 1.5;
			break;
		case 3:
			startingMinutes = 2;
			break;
		case 4:
			startingMinutes = 3;
			break;
		default:
			console.log('nahh!');
			break;
	}
	timeInSeconds = (startingMinutes * 60) - 1; // -1 makes sure that the first interval tick is not the full amount
    return timeInSeconds;
}


function setInitialTime(timeInSeconds){
	const minutes = Math.floor(timeInSeconds / 60);
	let seconds = timeInSeconds % 60;
	seconds = seconds <10 ? '0' + seconds : seconds; //add leading zero
	activeTimer.innerHTML = `${minutes}:${seconds}`;
}
function updateCountdown(){
	if(timeInSeconds >0){
		console.log('id reference: ' + idRefNum);
		console.log('tick: ' + timeInSeconds);
		const minutes = Math.floor(timeInSeconds / 60);
		let seconds = timeInSeconds % 60;
		seconds = seconds <10 ? '0' + seconds : seconds; //add leading zero
		activeTimer.innerHTML = `${minutes}:${seconds}`;
		timeInSeconds--;
	}else{
		activeTimer.innerHTML = `0:00`;
		clearInterval(intervalId);
		playSound();
		setTimeout(stopTimer, 2000);
	}
}

function stopTimer(){
	window.location.reload();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
//modal click
modal.onclick = function(e){
    //modal.style.display = "none";
	stopTimer();
}

function playSound(){
	var audio = new Audio('sound/MarioSound.mp3'); //There are other sound files in the folder
	audio.play();
}


/*
done - 1. fix counter tick
done - 2. make modal & counter stop when reaching zero, or reload page
done - 3. play sound when counter ends
done - 4. save return value from setInterval "maybe optional"
done - 5. remove <p> hover styling related to curser
done - 6. remove <p> text selection
done - 7. find better sound/sounds
. polish colors
*/