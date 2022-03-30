class UserSignupForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style> 
        <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
        }

        h2 {
            font-size: 20px
        }

        .outer-wrapper {
            text-align: center;
            padding: 15vh 35vw;
        }
        @media screen and (max-width: 600px) {
            .outer-wrapper {
                padding: 5vw;
            }
        }
        .inner-wrapper {
            box-sizing: border-box;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            background-color: white;
        }
        #login {
            color: #aa9dad;
        }
        #login:hover {
            color: #ff9ebc;
        }
        input {
            box-sizing: border-box;
            width: 100%;
            padding: 20px;
        }
        input[type="submit"] { 
            font-size: 20px;
            color: #f2f2f2; 
            background-color: #181213;
        }
        input[type="submit"]:hover { 
            background-color: #ffffe1;
            color: black;
        }
        </style>
        
        <div class="outer-wrapper">
        <div class="inner-wrapper">
            <h2>Pleased to meet you</h2>
            <form name="signup" id="signup-form">
                <input name="username" type="text" placeholder="Username"><br><br>
                <input name="password" type="password" placeholder="Password"><br><br>
                <input name="passwordControl" type="password" placeholder="Repeat password"><br><br>
                <input type="submit" value="SIGN UP">
            </form> 
        </div>
        <p id="login">Log in instead</p>
        </div>
        `;

        let form = this.shadowRoot.getElementById("signup-form");
        form.onsubmit = function () {
            // wrap function to avoid redirection
            let handleForm = async function () {
                let user = {
                    username: form.username.value,
                    password: form.password.value,
                    passwordControl: form.passwordControl.value
                }

                let response = await signUpUser(user);

                if(!response.ok) {
                    alert (response.status + ": " + response.statusText);
                    return;
                }

                let data = await response.json();
                localStorage.setItem("token", data.token);
                Channel.publish("switch-page", "task-board");
            }
            handleForm();
            // return false to prevent redirection
            return false;
        }

        let login = this.shadowRoot.getElementById("login");
        login.onclick = function () {
            Channel.publish("switch-page", "user-login-form");
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

customElements.define("user-signup-form", UserSignupForm);