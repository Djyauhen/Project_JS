export class Popup {
    constructor() {
        const popup = document.getElementById('popup');
        const agree = document.getElementById('agree');
        const disagree = document.getElementById('disagree');
        const openBtns = document.getElementsByClassName('delete-category');

        function openPopup() {
            popup.style.display = 'flex'
        }
        function closePopup() {
            popup.style.display = 'none';
        }

        for (let i = 0; i < openBtns.length; i++) {
            openBtns[i].addEventListener("click", openPopup);
        }

        agree.addEventListener("click", closePopup);
        disagree.addEventListener("click", closePopup);
    }
}



