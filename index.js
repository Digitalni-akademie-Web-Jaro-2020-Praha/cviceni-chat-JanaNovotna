'use strict';

/* ========== PŘIJÍMÁNÍ ZPRÁV ========== */

const messagesElement = document.querySelector('#messages');

const renderMessage = (name, message, date) => {
  // @TODO: funkce vracející HTML zprávy
  return `
 <div class="card mt-3 mb-3">
					<div class="card-body">
						<h5 class="card-title">
							${name}
							<small class="text-muted">${date}</small>
						</h5>
						<p class="card-text">${message}</p>
					</div>
				</div>
 `
};

const renderMessages = (messages) => {
  // @TODO: funkce vypisující zprávy na stránku
  messagesElement.innerHTML = '';

  for (let i = 0; i < messages.length; i++) {
    messagesElement.innerHTML += renderMessage(messages[i].name, messages[i].message, messages[i].date)
  }
};

const updateMessages = () => {
  // @TODO: funkce stahující zprávy ze server a přidávající je na stránku
  fetch('https://czechichat.herokuapp.com/api/list-messages')
    .then(response => response.json())
    .then(data => renderMessages(data.messages))
};

setInterval(updateMessages, 2000); // Každé dvě sekundy zavolá updateMessages

/* ========== ODESÍLÁNÍ ZPRÁV ========== */

const nameInputElement = document.querySelector('#name-input');
const messageInputElement = document.querySelector('#message-input');

const onSubmit = (event) => {
  event.preventDefault(); // Zamezí přesměrování na jinou stránku při odesílání formuláře

  // console.log(
  //   'Data:',
  //   JSON.stringify({
  //     name: nameInputElement.value,
  //     message: messageInputElement.value,
  //   }),
  // );  Jak vím, že v klíči body mám použít zrovna tohle??

  // @TODO: odešli zprávu na server

  fetch('https://czechichat.herokuapp.com/api/send-message', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInputElement.value,
      message: messageInputElement.value,
    }),
  })
};

document.querySelector('#send-form').addEventListener('submit', onSubmit);
