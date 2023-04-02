'use strict';

console.log(`start script`);

// собрать данные из формы и отравить её на сервер

const form = document.forms[0];
const form_message = form.querySelector(`input[name="message"]`);
form.message.value = "test";
form_message.classList.add("noshow");


form.addEventListener('submit', formSubmit);

function formSubmit(event) {

    console.log(`form submit`, event);
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target);

    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });

    sendJsonData(server_url, obj)
        .then(json => {
            console.log(`got response from server:`, json);
        })
        .catch(error => {
            console.log(`got an error:`, error.message);
        });
}

const server_url = "http://minini.ru:22841/post/";

async function sendJsonData(url, object) {
    console.log(`semd to ${url}`, JSON.stringify(object));
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {'Content-type': 'application/json'},
    });

    if (!response.ok) {
        console.log(response);
        const error = new Error(`cant get data from server ${url}. response.status = ${response.status}`);
        throw error;
    }

    return await response.json();
}


