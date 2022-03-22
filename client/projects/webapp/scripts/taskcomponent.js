class TaskComponent extends HTMLElement {
    constructor () {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.addEventListener("click", () => this.title = Math.random());
    }

    connectedCallback () {
        this.render();
    }

    render() {
        this.shadow.innerHTML = "<p>" + this.title + "</p>";
    }

    get title () {
        return this.getAttribute("title");
    }

    set title (newValue) {
        this.setAttribute("title", newValue);
    }

    static get observedAttributes () {
        return ["title"];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        if(attribute == "title") this.render();
    }
}

customElements.define("task-component", TaskComponent);