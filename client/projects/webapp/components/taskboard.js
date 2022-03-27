class TaskBoard extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
        
        let taskLists = "";
        for(let i = 0; i < 4; i++) {
            let tasks = this.tasks.filter(task => task.state == i);
            tasks = JSON.stringify({tasks: tasks});
            taskLists += `<task-list state=${i} tasks='${tasks}'></task-list>`;
        }
        
        this.shadowRoot.innerHTML = `
        <style>
        div {
            display: inline-block;
        }
        </style>

        <div>
            <h1>Kanban Board</h1>
            ${taskLists}
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