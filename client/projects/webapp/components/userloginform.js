class UserLoginForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style>
        .outer-wrapper {
            text-align: center;
            padding: 1vh 25vw;
        }
        .inner-wrapper {
            box-sizing: border-box;
            width: 100%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            text-align: center;
            background-color: white;
        }
        #sign-up {
            color: #aa9dad;
        }
        #sign-up:hover {
            color: #ff9ebc;
        }
        input {
            box-sizing: border-box;
            width: 100%;
        }

        input[type="submit"] {
            background-color: green;
        }

        </style>
        
        <div class="outer-wrapper">
        <div class="inner-wrapper">
            <h2>Log In Form:</h2>
            <form name="login" id="login-form">
                <label>Username:</label><br>
                <input name="username" type="text" placeholder="John Doe"><br><br>
                <label>Password:</label><br>
                <input name="password" type="password" placeholder="*********"><br><br>
                <input type="submit" value="Log In">
            </form>
        </div>
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