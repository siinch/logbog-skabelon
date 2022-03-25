class TaskComponent extends HTMLElement {
    constructor () {
        super();
        let shadow = this.attachShadow({mode: "open"});

        shadow.innerHTML = `
        <style> 
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
            background-color: cornflowerblue;
            padding: 10px;
        }
        </style>

        <div class="outer-wrapper">
        <div class="inner-wrapper">
        <h3></h3>
            <button>&#128465</button>
            <button>&lt</button>
            <button>&gt</button>
        </div>
        </div>
        `;
    }

    connectedCallback () {
        this.render();        
    }

    render () {
       let title = this.shadowRoot.querySelector("h3");
       title.innerHTML = this.task.title;
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

customElements.define("task-component", TaskComponent);