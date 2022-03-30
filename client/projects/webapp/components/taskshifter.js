class TaskShifter extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback () {
        this.render();        
    }

    render () {
        let symbol = "&#129094";
        let color = "#aa9dad";
        let hoverColor = "#ff9ebc";
        let inactiveColor = "rgb(100, 100, 100);";

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
            symbol = "&#129092";

        if(this.direction == "left" && this.task.state == 0) {
            color = inactiveColor;
            hoverColor = inactiveColor;
            this.onclick = () => {};
        }

        if(this.direction == "right" && this.task.state == 3) {
            color = inactiveColor;
            hoverColor = inactiveColor;
            this.onclick = () => {}
        }

        this.shadowRoot.innerHTML = `
        <style>
            button {
                color: ${color};
                font-size: 20px; 
                background-color: transparent;
                border: none;
                float: ${this.direction};
            }
            button:hover { 
                color: ${hoverColor};
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