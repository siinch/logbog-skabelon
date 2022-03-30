class TaskCard extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback () {
        this.render();        
    }

    render () {
        let task = JSON.stringify(this.task);
        this.shadowRoot.innerHTML = `
        <style> 
        h3 {
            color: white;
            margin: 0;
        }
        .outer-wrapper {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -ms-box-sizing: border-box;
            -o-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            padding: 10px;
        }
        .inner-wrapper {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            background-color: rgb(60, 60, 60);
            padding: 10px;
        }
        </style>

        <div class="outer-wrapper">
        <div class="inner-wrapper">
        <h3>${this.task.title}</h3>
            <task-deleter task='${task}'></task-deleter>
            <task-shifter direction="left" task='${task}'></task-shifter>
            <task-shifter direction="right" task='${task}'></task-shifter>
        </div>
        </div>
        `;
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

customElements.define("task-card", TaskCard);