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
        </style>

        <button>&#128465</button>
        `;
        
        this.onclick = async function() {
            await deleteTask(this.task);
            reloadTasks();
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