class UserDeleteForm extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style> 

        </style>
        
        <div>
            <h2>Delete User Form:</h2>
            <form name="delete-user" id="form">
                <label>Username:</label><br>
                <input name="username" type="text" placeholder="John Doe"><br>
                <label>Password:</label><br>
                <input name="password" type="password" placeholder="*********"><br>
                <input type="submit" value="Delete user">
            </form> 
        </div>
        <br>
        <p id="back">Go back instead</p>
        `;

        let form = this.shadowRoot.getElementById("form");
        form.onsubmit = function () {
            // wrap function to avoid redirection
            let handleForm = async function () {
                let user = {
                    username: form.username.value,
                    password: form.password.value,
                }

                let response = await deleteUser(user);

                if(!response.ok) {
                    alert (response.status + ": " + response.statusText);
                    return;
                }

                let data = await response.json();
                userSession = {};
                Channel.publish("switch-page", "user-login-form");
            }
            handleForm();
            // return false to prevent redirection
            return false;
        }

        let back = this.shadowRoot.getElementById("back");
        back.onclick = function () {
            Channel.publish("switch-page", "task-board");
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

customElements.define("user-delete-form", UserDeleteForm);