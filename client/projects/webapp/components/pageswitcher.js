class PageSwitcher extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.current = "user-login-form";
    }

    render () {
        
        this.shadowRoot.innerHTML = `
        <style>
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
        this.render();
    }
}

customElements.define("page-switcher", PageSwitcher);