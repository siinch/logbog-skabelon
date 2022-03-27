class TaskBoard extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {

        
        this.shadowRoot.innerHTML = `
        <style>
        div {
            display: inline-block;
        }
        </style>

        <div>
            <h1>Kanban Board</h1>
            <task-list state=0></task-list>
            <task-list state=1></task-list>
            <task-list state=2></task-list>
            <task-list state=3></task-list>
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

    connectedCallback () {
        this.render();        
    }

    static get observedAttributes () {
        return ["tasks"];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        this.render();
    }
}

customElements.define("task-board", TaskBoard);