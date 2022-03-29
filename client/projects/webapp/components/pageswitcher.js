class PageSwitcher extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.current = "user-login-form";
        Channel.subscribe("switch-page", (data) => this.current = data);
    }

    render () {
        
        this.shadowRoot.innerHTML = `
        <style>
        * {
            width: 100%;
        }
        </style>

            <${this.current}></${this.current}>
        `;
    }

    get current () {
        return this.getAttribute("current");
    }

    set current (newValue) {
        this.setAttribute("current", newValue);
    }

    connectedCallback () {
        this.render();        
    }

    static get observedAttributes () {
        return ["current"];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        if(attribute == "current") this.render();
    }
}

customElements.define("page-switcher", PageSwitcher);