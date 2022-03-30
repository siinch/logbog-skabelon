class TaskCreater extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style>
        form {
        }
        input {
            box-sizing: border-box;
            width: 70%;
            padding: 10px;
            vertical-align: middle;
        }
        input[type="submit"] {
            padding: 0px;
            width: 20%; 
            font-size: 50px;
            color: #aa9dad; 
            background-color: transparent;
            border: none;
            vertical-align: -12px;
        }
        input[type="submit"]:hover { 
            color: #ff9ebc;
        }
        </style>
        <form id="form">
            <input type="text" name="input" placeholder="Add task">
            <input type="submit" value="+">
        </form>
        `;

        let form = this.shadowRoot.getElementById("form");
        form.onsubmit = function () {
            let handleInput = async function () {
                let task = {
                    title: form.input.value,
                    state: 0 
                }
            
                if(task.title == "" || task.title == null)
                    return;
                
                let response = await postTask(task);
            
                if(!response.ok) {
                    alert (response.status + ": " + response.statusText);
                    return;
                }
            
                let data = await response.json();
                //alert(JSON.stringify(data))
                Channel.publish("update-tasks", {})
            }
            handleInput();
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

customElements.define("task-creater", TaskCreater);