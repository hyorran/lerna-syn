const { ipcRenderer } = require('electron')
const map = require('lodash/map')
const trim = require('lodash/trim')

window.addEventListener('load', () => {
  ipcRenderer.on('html-print-receipt', (event, str) => {
    const result = map(str.split('\n'), item => `<p>${ trim(item) }</p>`)
    document.getElementById('receipt').innerHTML = result.join('')
  })
})
