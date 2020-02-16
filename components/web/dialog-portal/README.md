# @syntesis/c-dialog-portal

> A package to manage dialogs with a MobX store, inside a React Portal

## Install
Add `@syntesis/c-dialog-portal` into package.json peerDependencies from another package.

### Usage
- `window.openDialog` exposed to open dialog
- `window.closeDialog` exposed to close dialog
```jsx
import React from 'react'
import Modal from '@syntesis/c-modals/src/containers/Modal'
import Snackbar from '@syntesis/c-snackbars/src/components/Snackbar'

const firstDialogId = window.openDialog({
  component: ({ dialogId, open }) => (
    <Modal 
      open={ open } 
      dialogId={ dialogId } 
    />
  )
})

const secondDialogId = window.openDialog({
  component: ({ dialogId, open }) => (
    <Snackbar 
      open={ open } 
      dialogId={ dialogId } 
    />
  )
})

onUserInteracted(() => {
  window.closeDialog(firstDialogId)
  window.closeDialog(secondDialogId)
}, 5000)
```
### Parameters
| name      	| type 	| required 	| default 	| description                                             	|
|-----------	|------	|----------	|---------	|---------------------------------------------------------	|
| component 	| func 	| yes      	|         	| React Component that will be rendered on dialog portal  	|

## License

MIT © [](https://github.com/)
