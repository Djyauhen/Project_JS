const popup = document.getElementById('popup');
const deleteCategory = document.getElementsByClassName('delete');
const agree = document.getElementById('agree');
const disagree = document.getElementById('disagree');

function openPopup() {
    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
}

for (let i = 0; i < deleteCategory.length; i++) {
    deleteCategory[i].onclick = openPopup;
}

agree.addEventListener("click", closePopup);
disagree.addEventListener("click", closePopup);

