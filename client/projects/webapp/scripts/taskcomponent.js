class TaskComponent extends HTMLElement {
    constructor () {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    }

    connectedCallback () {
        this.render();
    }

    render() {
        this.shadow.innerHTML = "<h3>" + this.task.title + "</h3>";
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