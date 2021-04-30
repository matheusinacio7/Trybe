function wakeUp() {
  console.log('Acordando!!');
}

function eatBreakfast() {
  console.log('Bora tomar café!!');
}

function goToBed() {
  console.log('Partiu dormir!!!');
}

function doThing(task) {
  task();
}

doThing(wakeUp);
doThing(eatBreakfast);
doThing(goToBed);
