class UserSignupForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style> 

        </style>
        
        <div>
            <h2>Sign Up Form:</h2>
            <form name="signup" id="signup-form">
                <label>Username:</label><br>
                <input name="username" type="text" placeholder="John Doe"><br>
                <label>Password:</label><br>
                <input name="password" type="password" placeholder="*********"><br><br>
                <label>Repeat password:</label><br>
                <input name="passwordControl" type="password" placeholder="*********"><br><br>
                <input type="submit" value="Sign Up">
            </form> 
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
                alert("Signed up user: " + JSON.stringify(data))
                userSession = data;
                reloadTasks();
            }
            handleForm();
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

customElements.define("user-signup-form", UserSignupForm);