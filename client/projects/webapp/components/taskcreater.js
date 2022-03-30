class TaskCreater extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        this.shadowRoot.innerHTML = `
        <style>
        input {
            box-sizing: border-box;
            width: 100% auto;
            padding: 10px;
        }
        input[type="submit"] {
            width: 20%;
            font-size: 20px;
            color: #f2f2f2; 
            background-color: #181213;
        }
        input[type="submit"]:hover { 
            background-color: #ffffe1;
            color: black;
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