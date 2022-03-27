class TaskShifter extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback () {
        this.render();        
    }

    render () {
        let symbol = "&gt";

        if(this.direction == "left")
            symbol = "&lt";

        this.shadowRoot.innerHTML = `
        <style> 
        </style>

        <button>${symbol}</button>
        `;
        
        if(this.task.state != 0 && this.task.state != 3)
        this.onclick = async function() {
            let task = this.task;
            if(this.direction == "left")
                task.state--;
            else
                task.state++;
            await updateTask(task);
            reloadTasks();
        };
    }

    get task () {
        return JSON.parse(this.getAttribute("task"));
    }

    set task (newValue) {
        this.setAttribute("task", JSON.stringify(newValue));
    }

    get direction () {
        return this.getAttribute("direction");
    }

    set direction (newValue) {
        this.setAttribute("direction", newValue);
    }

    static get observedAttributes () {
        return ["task", "direction"];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        this.render();
    }
}

customElements.define("task-shifter", TaskShifter);