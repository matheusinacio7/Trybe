document.getElementById('header-container').style.backgroundColor = '#00B069';

document.getElementsByClassName('emergency-tasks')[0].style.backgroundColor = '#FF9F84';
let emergencyHeaders = document.querySelectorAll('.emergency-tasks h3');
for (let emergencyHeader of emergencyHeaders) {
  emergencyHeader.style.backgroundColor = '#A500F3';
}

document.getElementsByClassName('no-emergency-tasks')[0].style.backgroundColor = '#F9DB5E';
let noEmergencyHeaders = document.querySelectorAll('.no-emergency-tasks h3');
for (let noEmergencyHeader of noEmergencyHeaders) {
  noEmergencyHeader.style.backgroundColor = '#232525';
}

document.getElementById('footer-container').style.backgroundColor = '#003533';