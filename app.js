let addButton = document.querySelector(".add-btn");
let inputTxt = document.querySelector(".input-text");
let unorderList = document.querySelector(".task-list");

addButton.addEventListener("click", () => {
    if (inputTxt.value.trim() !== "") {
        if (sameTask(inputTxt.value)) {
            alert(`${inputTxt.value} is Present Already.`);
            return;
        }
        addTask(inputTxt.value);
        inputTxt.value = "";
        saveDataLocalStorage();
    }
});

function addTask(taskText) {
    let listItem = document.createElement("li");
    listItem.textContent = taskText;

    let crossIcon = document.createElement("span");
    crossIcon.innerHTML = "\u00d7";
    crossIcon.classList.add("crossElement");
    listItem.appendChild(crossIcon);

    unorderList.append(listItem);
    addEventListeners(listItem);
}

function addEventListeners(listItem) {
    listItem.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            listItem.classList.toggle("checked");
            saveDataLocalStorage();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveDataLocalStorage();
        }
    });
}

function sameTask(taskText) {
    let existingTasks = document.querySelectorAll("li");
    for (let task of existingTasks) {
        
        // we need just name of li to compare
        let taskName = task.childNodes[0].nodeValue.trim();
        if (taskName.toLowerCase() === taskText.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function saveDataLocalStorage() {
    localStorage.setItem("data", unorderList.innerHTML);
}

function getData() {
    if (localStorage.getItem("data")) {
        unorderList.innerHTML = localStorage.getItem("data");
        document.querySelectorAll(".task-list li").forEach(addEventListeners);
    }
}

getData();
