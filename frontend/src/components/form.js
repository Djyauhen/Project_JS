// import {CustomHttp} from "../service/custom-http.js";
// import {Auth} from "../service/auth.js";

export class Form {

    constructor(page) {

        // this.agreeElement = null;
        this.processElement = null;
        this.page = page;

        this.fields = [
            {
                name: "email",
                id: "email",
                element: null,
                regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+.[A-Za-z]{2,4}$/,
                valid: false,
            },
            {
                name: "password",
                id: "password",
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ];

        if (this.page === 'signup') {
            this.fields.unshift(
                {
                    name: "name",
                    id: "name",
                    element: null,
                    regex: /^[A-ЯЁ][а-яё]+\s[A-ЯЁ][а-яё]+$/,
                    valid: false,
                })
        }

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm()
        }

        // this.agreeElement = document.getElementById('remember');
        // this.agreeElement.onchange = function () {
        //     that.validateForm();
        // }
    }


    validateField(field, element) {
        if (!element.value
            || !element.value.match(field.regex)
        ) {
            element.style.borderColor = "red";
            field.valid = false;
        } else {
            element.removeAttribute('style');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const valudForm = this.fields.every(item => item.valid);
        const isValid =
            // this.agreeElement.checked &&
            valudForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }

    processForm() {
        if (this.validateForm()) {

            let paramString = '';
            this.fields.forEach(item => {
                paramString += (!paramString ? '?' : "&") + item.name + "=" + item.element.value;
            })

            location.href = '#/main';
        }
    }
}
