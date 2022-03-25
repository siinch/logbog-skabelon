class TaskComponent extends HTMLElement {
    constructor () {
        super();
        let shadow = this.attachShadow({mode: "open"});

        shadow.innerHTML = `
        <style>
        div {
            background-color: cornflowerblue;
            width: 100%;
        }
        </style>

        <div>
        <h3></h3>
            <button>&#128465</button>
            <button>&lt</button>
            <button>&gt</button>
        </div>
        `;
    }

    connectedCallback () {
        this.render();        
    }

    render () {
       let title = this.shadowRoot.querySelector("h3");
       title.innerHTML = this.task.title;
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
        if(attribute == "task") this.render();
    }
}

customElements.define("task-component", TaskComponent);