class TaskBoard extends HTMLElement {

    static states = [
        {name: "BACKLOG", code: 0},
        {name: "TO-DO", code: 1},
        {name: "DOING", code: 2},
        {name: "DONE", code: 3}
    ];

    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.updateTasks();
        let taskBoard = this;
        Channel.subscribe("update-tasks", (data) => taskBoard.updateTasks());
    }

    async updateTasks () {
        let response = await getTasks();
        if(response.ok) {
            let data = await response.json();
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
            padding: 0 10vw;
            height: 70vh;
            width: 100%;
            box-sizing: border-box;
        }
        #logout, #delete-user{
            float: right;
        }
        </style>

        <div>
            <h1>Kanban Board</h1>
            <task-creater></task-creater>
            <button id="logout">Log out</button>
            <button id="delete-user">Delete user</button>
            <br>
            ${taskLists}
        </div>
        `;

        let logout = this.shadowRoot.getElementById("logout");
        logout.onclick = function () {
            if(confirm("Are you sure you want to log out?")) {
                Channel.publish("switch-page", "user-login-form");
                userSession = {};
            }
        }

        let deleteUser = this.shadowRoot.getElementById("delete-user");
        deleteUser.onclick = function () {
            if(confirm("Are you sure you want to delete this user?")) {
                Channel.publish("switch-page", "user-delete-form");
            }
        }
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