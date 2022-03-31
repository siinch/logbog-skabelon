// The main component for switching between other components.
// Effectively makes the app a single page application (SPA).
class PageSwitcher extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: "open"});

        // load the last page or start at the login form
        if(localStorage.page == undefined)
            this.current = "user-login-form";
        else
            this.current = localStorage.page;

        // subscribe to the switch-page event
        Channel.subscribe(
            "switch-page",
            (data) => {
                // switch the page and save the page state
                this.current = data;
                localStorage.setItem("page", data);
            }
        );
    }

    render () {
        // insert the current component into the page
        this.shadowRoot.innerHTML = `
            <${this.current}></${this.current}>
        `;
    }

    // call when getting "current" e.g. this.current
    get current () {
        return this.getAttribute("current");
    }

    // call when setting "current" e.g. this.current = "task-board";
    set current (newValue) {
        this.setAttribute("current", newValue);
    }

    // call when component is put into the page/DOM
    connectedCallback () {
        this.render();        
    }

    // observe when the "current" attribute changes
    static get observedAttributes () {
        return ["current"];
    }

    // call when one of the observed attribute change
    attributeChangedCallback (attribute, oldValue, newValue) {
        if(attribute == "current") this.render();
    }
}
customElements.define("page-switcher", PageSwitcher);