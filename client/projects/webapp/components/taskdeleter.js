class TaskDeleter extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback () {
        this.render();        
    }

    render () {
         this.shadowRoot.innerHTML = `
        <style>
        button {
            color: #aa9dad;
            font-size: 20px; 
            background-color: transparent;
            border: none;
        }
        button:hover { 
            color: red;
        }
        </style>

        <button>&#10006;</button>
        `;
        
        this.onclick = async function() {
            await deleteTask(this.task);
            Channel.publish("update-tasks", {});
        };
    }

    get task () {
        return JSON.parse(this.getAttribute("task"));
    }

    set task (newValue) {
        this.setAttribute("task", JSON.stringify(newValue));
    }

    static get observedAttributes () {
        return ["task"];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        this.render();
    }
}

customElements.define("task-deleter", TaskDeleter);