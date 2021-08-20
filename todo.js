let toDoData = localStorage.getItem("toDoList") ? JSON.parse(localStorage.getItem("toDoList")) : [];

const myFunction = (event) => {
    event.preventDefault()
    if (event.target.children[0].value) {

        toDoData.push({ text: event.target.children[0].value, id: Date.now(), checked: false })
        console.log(toDoData);
        localStorage.setItem("toDoList", JSON.stringify(toDoData))
        render()
        event.target.children[0].value = ''
    }
}

const removeItem = (event) => {
    const deletedItem = toDoData.filter((element) => +event.target.parentNode.previousElementSibling.dataset.id !== +element.id)
    console.log(deletedItem);
    event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode)
    localStorage.setItem("toDoList", JSON.stringify(deletedItem))
}

const checkItem = (event) => {
    toDoData.forEach((element) => {
        if (+event.target.parentNode.previousElementSibling.dataset.id === +element.id) {
            element.checked = !element.checked
            console.log(element.checked);
            event.target.setAttribute('checked', element.checked)
        }
    })
    localStorage.setItem("toDoList", JSON.stringify(toDoData))
}


const render = () => {
    document.querySelector(".main-content").innerHTML = ""
    toDoData.map((element) => {
        let listItem = document.createElement('div')
        listItem.innerHTML = `
        <span data-id=${element.id}>${element.text}</span>
        <div class='actions-block'>
            <input type="checkbox" class='check-btn' onchange="checkItem(event)">
            <button class="btn" onclick='removeItem(event)'>✗</button>
        </div>`

        document.querySelector(".main-content").appendChild(listItem)
        if (element.checked) {
            document.querySelector('.check-btn').setAttribute('checked', true)
        } else {
            document.querySelector('.check-btn').removeAttribute('checked')
        }
    })
}


document.addEventListener('DOMContentLoaded', function () {
    render()
})

