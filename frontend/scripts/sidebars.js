const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdown = document.getElementsByClassName('dropdown')[0];
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownBtn = document.getElementById('dropdown-button');
const mainBtn = document.getElementById('mainBtn');

if (dropdown.classList.value.split(' ').find(item => item === 'active')) {
  dropdownMenu.style.display = 'flex';
  dropdownBtn.style.transform = 'rotate(0deg)';
}


function minimize() {
  if (dropdownMenu.style.display === 'flex') {
    dropdownMenu.style.display = 'none';
    dropdownBtn.style.transform = 'rotate(-90deg)';
  } else {
    dropdownMenu.style.display = 'flex';
    dropdownBtn.style.transform = 'rotate(0deg)';
  }
}

dropdownToggle.addEventListener("click", minimize);

