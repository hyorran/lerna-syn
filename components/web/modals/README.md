# @syntesis/c-modals

> A package to create modals

## Install
Add `@syntesis/c-modals` into package.json dependencies from another package.

## Containers

### Modal
#### Usage
```jsx
import React from 'react'
import Modal from '@syntesis/c-modals/lib/containers/Modal'
import HeaderTitleClose from '@syntesis/c-modals/lib/components/HeaderTitleClose'
import FooterButtons from '@syntesis/c-modals/lib/components/FooterButtons'

const Example = (props) => {
  const {
    dialogId,
    open,
    withButtonConfirm,
    buttonConfirm,
    withButtonCancel,
    buttonCancel,
    modalLoading
  } = props

  const footerButtons = []

  if (withButtonConfirm) {
    footerButtons.push({
      ...buttonConfirm,
      btnProps: {
        color: 'primary',
        variant: 'contained',
        ...buttonConfirm.btnProps
      }
    })
  }

  return (
    <Modal
      open={ open }
      dialogId={ dialogId }
      HeaderComponent={
        headerProps => (
          <HeaderTitleClose
            { ...headerProps }
          />
        )
      }
      FooterComponent={
        footerProps => (
          <FooterButtons
            { ...footerProps }
            buttons={ footerButtons }
            withButtonCancel={ withButtonCancel }
            buttonCancel={ buttonCancel }
            modalLoading={ modalLoading }
          />
        )
      }
    />
  )
}

export default Example
```
#### Props
| name                  	| type          	| required 	| default      	| description                                                                                   	|
|-----------------------	|---------------	|----------	|--------------	|-----------------------------------------------------------------------------------------------	|
| open                  	| bool          	| yes      	|              	| Modal is opened/closed                                                                         	|
| dialogId              	| string        	| yes      	|              	| Id from @syntesis/c-dialog-portal                                                             	|
| title                 	| string / func 	| no       	| `''`         	| Title of modal (header), or function that receive the item if it exists `(item) => item.name` 	|
| HeaderComponent       	| func          	| no       	| `() => null` 	| React component                                                                               	|
| FooterComponent       	| func          	| no       	| `() => null` 	| React component                                                                               	|
| contentComponent      	| func          	| no       	| `() => null` 	| React component                                                                               	|
| contentComponentProps 	| object        	| no       	| `{}`         	| Props that will be inject on `contentComponent`                                               	|
| contentText           	| string        	| no       	| `null`       	| String that will be render on modal content. It will be render before that `contentComponent` 	|
| escape                	| bool          	| no       	| `true`       	| Enable esc/backdrop click to close modal                                                      	|
| autoClose             	| bool          	| no       	| `true`       	| Close modal immediately after of the operation success                                        	|
| modalLoading          	| bool          	| no       	| `false`      	|  Show the linear loader below of the modal footer                                             	|
| onCancel              	| func          	| no       	| `() => {}`   	| Callback from modal close method if it was canceled                                           	|
| item                  	| object        	| no       	| `{}`         	| Object from API that will be inject in modal                                                  	|

### Confirm
#### Usage
```jsx
import React from 'react'
import Confirm from '@syntesis/c-modals/lib/containers/Confirm'

const Example = (props) => {
  const { open, dialogId } = props

  const buttonConfirm = {
    children: 'my custom button confirm',
    onClick: () => {},
    btnProps: {}
  }

  return (
    <Confirm
      open={ open }
      dialogId={ dialogId }
      title="modal title"
      contentText="modal content text"
      buttonConfirm={ buttonConfirm }
    />
  )
}

export default Example
```
#### Props
Extends all props of [Modal](#modal)

| name              	| type   	| required 	| default                                                      	| description                                   	|
|-------------------	|--------	|----------	|--------------------------------------------------------------	|-----------------------------------------------	|
| open              	| bool   	| yes      	|                                                              	| Modal is opened/closed                         	|
| dialogId          	| string 	| yes      	|                                                              	| Id from @syntesis/c-dialog-portal             	|
| withButtonCancel  	| bool   	| no       	| `true`                                                       	| Enable default cancel button                  	|
| buttonCancel      	| object 	| no       	| `{}`                                                         	| Props that will be injected on cancel button  	|
| withButtonConfirm 	| bool   	| no       	| `true`                                                       	| Enable default confirm button                 	|
| buttonConfirm     	| object 	| no       	| `{ children: 'confirmar', onClick: () => {}, btnProps: {} }` 	| Props that will be injected on confirm button 	|

### DeleteItem
#### Usage
```jsx
import React, { Component } from 'react'
import DeleteItemModal from '@syntesis/c-modals/lib/containers/DeleteItem'

class Example extends Component {
  constructor(props) {
    super(props)
    this.onConfirm = this.onConfirm.bind(this)

    this.state = {
      loading: false
    }
  }

  async onConfirm() {
    const {
      onSuccess,
      dialogId,
      item
    } = this.props

    this.setState(prevState => ({
      ...prevState,
      loading: true
    }))

    try {
      window.closeDialog(dialogId)
      onSuccess()
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        loading: false
      }))
    }
  }

  render() {
    const {
      dialogId,
      open,
      item
    } = this.props

    const { loading } = this.state

    return (
      <DeleteItemModal
        name={ item.id }
        open={ open }
        dialogId={ dialogId }
        item={ item }
        modalLoading={ loading }
        buttonConfirm={ {
          onClick: this.onConfirm
        } }
      />
    )
  }
}

export default Example
```
#### Props
Extends all props of [Confirm](#confirm)

| name          	| type   	| required 	| default                                             	| description                                   	|
|---------------	|--------	|----------	|-----------------------------------------------------	|-----------------------------------------------	|
| open          	| bool   	| yes      	|                                                     	| Modal is open/close                           	|
| dialogId      	| string 	| yes      	|                                                     	| Id from @syntesis/c-dialog-portal             	|
| buttonConfirm 	| object 	| no       	| `{ children: '', onClick: () => {}, btnProps: {} }` 	| Props that will be injected on confirm button 	|
| name          	| string 	| no       	| `null`                                               	| Item name to display on modal title           	|
| item          	| object 	| yes      	|                                                     	| Item object that will be deleted              	|

### UnsafeForm
#### Usage
```jsx
// parentDialog = dialogId from modal parent

window.openDialog({
  component: ({ dialogId, open }) => (
    <UnsafeForm
      open={ open }
      dialogId={ dialogId }
      parentDialog={ parentDialog }
    />
  )
})
```
#### Props
Extends all props of [Confirm](#confirm)

| name     	    | type   	| required 	| default 	| description                       	      |
|--------------	|--------	|----------	|---------	|------------------------------------------ |
| open     	    | bool   	| yes      	|         	| Modal is open/close               	      |
| dialogId 	    | string 	| yes      	|         	| Id from @syntesis/c-dialog-portal 	      |
| parentDialog 	| string 	| yes      	|         	| Id from @syntesis/c-dialog-portal parent 	|

### WithToolbar
#### Usage
```jsx
import React, { Component } from 'react'
import { withStores } from '@syntesis/c-stores-provider/lib'
import ModalWithToolbar from '@syntesis/c-modals/lib/containers/WithToolbar'
import ContentComponent from './ContentComponent'

const Example = () => {
  const {
    dialogId,
    open,
    loading
  } = this.props

  return (
    <ModalWithToolbar
      open={ open }
      dialogId={ dialogId }
      contentComponent={ ContentComponent }
      modalLoading={ loading }
      mode={ { create: true, update: false } }
      autoClose={ false }
      title="Modal title"
      buttonConfirm={ {
        onClick: () => {}
      } }
      onCancel={ () => window.closeDialog(dialogId) }
      onSuccess={ () => {} }
    />
  )
}

export default Example
```
#### Props
Extends all props of [Modal](#modal)

| name     	| type   	| required 	| default 	| description                                   	|
|----------	|--------	|----------	|---------	|-----------------------------------------------	|
| open     	| bool   	| yes      	|         	| Modal is open/close                           	|
| dialogId 	| string 	| yes      	|         	| Id from @syntesis/c-dialog-portal             	|
| mode     	| object 	| yes      	|         	| Object like `{ create: true, update: false }` 	|

## Components

### HeaderTitleClose
#### Usage
```jsx
import React from 'react'
import Modal from '@syntesis/c-modals/lib/containers/Modal'
import HeaderTitleClose from '@syntesis/c-modals/lib/components/HeaderTitleClose'

const Example = (props) => {
  const {
    open,
    dialogId,
  } = props

  return (
    <Modal
      open={ open }
      dialogId={ dialogId }
      HeaderComponent={
        headerProps => (
          <HeaderTitleClose
            { ...headerProps }
          />
        )
      }
    />
  )
}

export default Example
```
#### Props
| name        	| type   	| required 	| default    	| description                                  	|
|-------------	|--------	|----------	|------------	|----------------------------------------------	|
| title       	| string 	| no       	| `null`     	| Modal header title                           	|
| handleClose 	| func   	| no       	| `() => {}` 	| Function that will run on modal close action 	|

### HeaderToolbar
#### Usage
```jsx
import React from 'react'
import Modal from '@syntesis/c-modals/lib/containers/Modal'
import HeaderToolbar from '@syntesis/c-modals/lib/components/HeaderToolbar'

const Example = (props) => {
  return (
    <Modal
      open={ open }
      dialogId={ dialogId }
      HeaderComponent={
        headerProps => (
          <HeaderToolbar
            { ...headerProps }
          />
        )
      }
    />
  )
}

export default Example
```
#### Props
| name  	| type   	| required 	| default 	| description        	|
|-------	|--------	|----------	|---------	|--------------------	|
| title 	| string 	| no       	| `null`  	| Modal header title 	|

### FooterButtons
#### Usage
```jsx
import React from 'react'
import Modal from '@syntesis/c-modals/lib/containers/Modal'
import FooterButtons from '@syntesis/c-modals/lib/components/FooterButtons'

const Example = (props) => {
  const {
    open,
    dialogId,
    withButtonConfirm,
    buttonConfirm,
    withButtonCancel,
    buttonCancel,
    modalLoading
  } = props

  const footerButtons = []

  if (withButtonConfirm) {
    footerButtons.push({
      ...buttonConfirm,
      btnProps: {
        color: 'primary',
        variant: 'contained',
        ...buttonConfirm.btnProps
      }
    })
  }

  return (
    <Modal
      open={ open }
      dialogId={ dialogId }
      FooterComponent={
        footerProps => (
          <FooterButtons
            { ...footerProps }
            buttons={ footerButtons }
            withButtonCancel={ withButtonCancel }
            buttonCancel={ buttonCancel }
          />
        )
      }
    />
  )
}

export default Example
```
#### Props
| name             	| type   	| required 	| default                                  	| description                                                                      	|
|------------------	|--------	|----------	|------------------------------------------	|----------------------------------------------------------------------------------	|
| buttons          	| array  	| yes      	|                                          	| Array of button objects like `{ children: '', btnProps: {}, onClick: () => {} }` 	|
| handleClose      	| func   	| yes      	|                                          	| Function that will run on close modal                                            	|
| withButtonCancel 	| bool   	| no       	| `false`                                  	| Enable default cancel button                                                     	|
| buttonCancel     	| object 	| no       	| `{ children: 'cancelar', btnProps: {} }` 	| Customize the default cancel button                                              	|

## License

MIT © [](https://github.com/)
