class TaskList extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        let taskCards = "";
        for (let task of this.tasks) {
            task = JSON.stringify(task);
            taskCards += `<task-card task='${task}'></task-card>`;
        }

        this.shadowRoot.innerHTML = `
        <style>
        div {
            background-color: lightgray;
            padding: 10px;
            float: left;
            min-width: 300px;
            width: 20%;
            margin: 10px;
            height: 70vh;
            overflow-y: auto;
        }
        </style>

        <div>
            <h2>${this.title}</h2>
            ${taskCards}
        </div>
        `;
    }

    get tasks () {
        if(JSON.parse(this.getAttribute("tasks")) == null) return [];
        return JSON.parse(this.getAttribute("tasks")).tasks;
    }

    set tasks (newValue) {
        this.setAttribute("tasks", JSON.stringify({tasks: newValue}));
    }

    get title () {
        return this.getAttribute("title");
    }

    set title (newValue) {
        this.setAttribute("title", newValue);
    }

    connectedCallback () {
        this.render();        
    }

    static get observedAttributes () {
        return ["tasks", "title"];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        this.render();
    }
}

customElements.define("task-list", TaskList);