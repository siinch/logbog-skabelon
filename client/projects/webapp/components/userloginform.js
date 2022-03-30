class UserLoginForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
        }

        h2 {
            font-size: 40px
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
        #sign-up {
            color: #aa9dad;
        }
        #sign-up:hover {
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
            <h2>Welcome</h2>
            <form name="login" id="login-form">
                <input name="username" type="text" placeholder="Username"><br><br>
                <input name="password" type="password" placeholder="Password"><br><br>
                <input type="submit" value="LOG IN">
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
                localStorage.setItem("token", data.token);
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