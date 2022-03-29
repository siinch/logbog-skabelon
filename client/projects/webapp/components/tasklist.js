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
        * {
            margin 0 auto;
            box-sizing: border-box;
        }
        .outer-wrapper {
            float: left;
            padding: 10px;
            width: 25%;
            height: 70vh;
        }
        .inner-wrapper {
            text-align: center;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            background-color: white;
            padding: 10px;
            width: 100%;
            height: 100%;
            overflow-y: auto;
        }
        </style>
        <div class="outer-wrapper">
        <div class="inner-wrapper">
            <h2>${this.title}</h2>
            ${taskCards}
        </div>
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