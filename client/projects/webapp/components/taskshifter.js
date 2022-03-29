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
        let color = "black";
        let inactiveColor = "lightgray";

        this.onclick = async function() {
            let task = this.task;
            if(this.direction == "left")
                task.state--;
            else
                task.state++;
            await updateTask(task);
            Channel.publish("update-tasks", {});
        };

        if(this.direction == "left")
            symbol = "&lt";

        if(this.direction == "left" && this.task.state == 0) {
            color = inactiveColor;
            this.onclick = () => {};
        }

        if(this.direction == "right" && this.task.state == 3) {
            color = inactiveColor;
            this.onclick = () => {}
        }

        this.shadowRoot.innerHTML = `
        <style>
            button {
                color: ${color};
            }
        </style>

        <button>${symbol}</button>
        `;
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