class UserLoginForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        let task = JSON.stringify(this.task);

        this.shadowRoot.innerHTML = `
        <style> 

        </style>
        
        <div>
            <form name="login" id="login">
                <label>Username:</label><br>
                <input name="username" type="text" placeholder="John Doe"><br>
                <label>Password:</label><br>
                <input name="password" type="password" placeholder="*********"><br><br>
                <input type="submit" value="Login">
            </form> 
        </div>
        `;

        let form = this.shadowRoot.getElementById("login");
        form.onsubmit = function () {
            console.log(form.username.value, form.password.value);
            // return false to prevent redirection
            return false;
        } 
    }

    connectedCallback () {
        this.render();        
    }

    static get observedAttributes () {
        return [];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        this.render();
    }
}

customElements.define("user-login-form", UserLoginForm);