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
        .outer-wrapper {
            text-align: center;
            padding: 0 10vw;
        }
        .inner-wrapper {
            display: inline-block;
            height: 70vh;
            width: 100%;
            box-sizing: border-box;
        }

        h1 {
            margin: 0;
            padding-bottom: 0px;
            padding-top: 50px;
        }

        p {
            padding: 20px;
            padding-bottom: 50px;
            padding-top: 0px;
            color: #aa9dad;
            display: inline-block;
        }
        p:hover {
            color: #ff9ebc;
        }
        </style>

        <div class="outer-wrapper">
            <h1>Kanban Board</h1>
            <p id="logout">Log out</p>
            <p id="delete-user">Delete user</p>
            <br>
            <div class="inner-wrapper">
                ${taskLists}
            </div>
            <br>
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