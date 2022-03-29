class TaskBoard extends HTMLElement {

    static states = [
        {name: "Backlog", code: 0},
        {name: "To-do", code: 1},
        {name: "Doing", code: 2},
        {name: "Done", code: 3}
    ];

    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.updateTasks();
        let taskBoard = this;
        Channel.subscribe("update-tasks", (data) => taskBoard.updateTasks());
    }

    async updateTasks () {
        console.log("updating tasks")
        let response = await getTasks();
        if(response.ok) {
            let data = await response.json();
            console.log(this)
            this.tasks = data.tasks;
        }
    }

    render () {
        
        let taskLists = "";
        for(let state of TaskBoard.states) {
            let tasks = this.tasks.filter(task => task.state == state.code);
            tasks = JSON.stringify({tasks: tasks});
            taskLists += `<task-list title=${state.name} tasks='${tasks}'></task-list>`;
        }
        
        this.shadowRoot.innerHTML = `
        <style>
        div {
            display: inline-block;
        }
        </style>

        <div>
            <h1>Kanban Board</h1>
            <task-creater></task-creater>
            <br>
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