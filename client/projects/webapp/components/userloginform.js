class UserLoginForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style> 

        </style>
        
        <div>
            <h2>Log In Form:</h2>
            <form name="login" id="login-form">
                <label>Username:</label><br>
                <input name="username" type="text" placeholder="John Doe"><br>
                <label>Password:</label><br>
                <input name="password" type="password" placeholder="*********"><br><br>
                <input type="submit" value="Log In">
            </form>

            <br>
            <p id="sign-up">Sign up instead</p>
        </div>
        `;

        let form = this.shadowRoot.getElementById("login-form");
        form.onsubmit = function () {
            // wrap function to avoid redirection
            let handleForm = async function () {
                let user = {
                    username: form.username.value,
                    password: form.password.value
                }

                let response = await logInUser(user);

                if(!response.ok) {
                    alert (response.status + ": " + response.statusText);
                    return;
                }

                let data = await response.json();
                alert("Logged in user: " + JSON.stringify(data))
                userSession = data;
                Channel.publish("switch-page", "task-board");
            }
            handleForm();
            // return false to prevent redirection
            return false;
        }

        let signup = this.shadowRoot.getElementById("sign-up");
        signup.onclick = function () {
            Channel.publish("switch-page", "user-signup-form");
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