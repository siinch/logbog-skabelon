class TaskCreater extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    render () {
         this.shadowRoot.innerHTML = `
        <style> 
        </style>

        <button>+</button>
        `;
        
        this.onclick = async function () {
    
            let task = {
                title: prompt("Title of new task:"),
                state: 0 
            }
        
            if(task.title == "" || task.title == null)
                return;
            
            let response = await postTask(task);
        
            if(!response.ok) {
                alert (response.status + ": " + response.statusText);
                return;
            }
        
            let data = await response.json();
            alert(JSON.stringify(data))
            tasks.push(task);
            reloadTasks();
        }        
    }

    connectedCallback () {
        this.render();        
    }

    static get observedAttributes () {
        return [];
    }

    attributeChangedCallback (attribute, oldValue, newValue) {
        this.render();
    }
}

customElements.define("task-creater", TaskCreater);