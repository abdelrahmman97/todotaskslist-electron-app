class LocalStorage {
    constructor() {
        // if item by key `tasks` is not defined JSON.parse return null, so I use `or empty array`
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // create task
    create(data) {
        data.token = this.token;
        this.tasks.push(data);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getIndexByToken(token) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].token === token) {
                return i;
            }
        }
        return -1;
    }

    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    update(data) {
        let index = this.getIndexByToken(data.token);
        if (index !== -1) {
            this.tasks[index] = data;
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

    delete(data) {
        let index = this.getIndexByToken(data.token);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }

}

const storage = new LocalStorage();

const tasks = storage.tasks;

const container = document.querySelector('.tasks');
const template = document.querySelector('#task');

const createTaskForm = document.querySelector('.create-task');
const createTaskField = document.querySelector('.create-task__textarea');
const createTaskButton = document.querySelector('.create-task__submit');

const para = document.createElement("P");
para.innerText = "Task list is empty!";
para.setAttribute("id", "EmptyListText");
para.setAttribute("class", "alert-heading text-capitalize text-center text-danger");

(tasks == null || tasks == "") ? container.appendChild(para) : "";

function onCreateTask({ data }) {
    var elementPara = document.getElementById("EmptyListText");
    if (elementPara != null) {
        elementPara.parentNode.removeChild(elementPara);
    }

    const clone = template.content.cloneNode(true);

    const task = clone.querySelector('.task');
    const checkbox = clone.querySelector('.task__checkbox');
    const title = clone.querySelector('.task__text');
    const del = clone.querySelector('.task__delete');
    const blank = clone.querySelector('.blank');

    var id = halfmoon.makeId(5);
    checkbox.setAttribute("id", id);
    blank.setAttribute("for", id);
    
    // alert(id);

    title.value = data.value;
    checkbox.checked = data.checked;

    toggleTaskStatusClass({
        checked: data.checked,
        task,
        title
    });

    checkbox.addEventListener('input', () => {
        data.checked = checkbox.checked;
        toggleTaskStatusClass({
            checked: data.checked,
            task,
            title
        });
        storage.update(data);
    });

    title.addEventListener('input', () => {
        data.value = title.innerHTML;
        storage.update(data);
    });

    del.addEventListener('click', (e) => {
        storage.delete(data);

        $(task).removeClass("animate__flipInX", $(task).addClass("animate__bounceOutLeft"));
        setTimeout( function() {
            task.remove();
        }, 1000);

        (tasks == null || tasks == "") ? container.appendChild(para) : "";
    });

    container.appendChild(clone);
}

function toggleTaskStatusClass({ checked, task, title }) {
    task.classList[checked ? 'add' : 'remove']('task--done');
    checked ? title.setAttribute("disabled", 'disabled'): title.removeAttribute("disabled");
}

tasks.forEach((data) => {
    onCreateTask({
        data
    });
});

createTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = createTaskField.value;
    if (value) {
        const data = {
            value,
            checked: false
        };
        storage.create(data);
        onCreateTask({
            data
        });
        createTaskForm.reset();
    }
});