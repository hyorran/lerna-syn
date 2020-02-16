const { ipcRenderer } = require('electron')

window.addEventListener('load', () => {
  ipcRenderer.on('message', (event, message) => {
    document.getElementById('messages').innerHTML = `<p>${ message }</p>${ document.getElementById('messages').innerHTML }`
  })
})
