class TaskComponent extends HTMLElement {
    constructor () {
        super();
        let shadow = this.attachShadow({mode: "open"});
        
        let div = document.createElement("div");
        let style = document.createElement("style");
        let title = document.createElement("h3");
        div.appendChild(title);
        shadow.appendChild(div);
        shadow.appendChild(style);
    }

    connectedCallback () {
        let style = this.shadowRoot.querySelector("style");
        style.textContent = `
        div {
            background-color: cornflowerblue;
            padding: 10px;
            margin: 10px;
            width: 20%;
            float: left;
        }
        `;
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