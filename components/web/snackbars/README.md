# @syntesis/c-snackbars

> A Package to show Snackbars as messages (notifications)

## Install
Add `@syntesis/c-snackbars` into package.json dependencies from another package.

## Usage

```jsx
import React from 'react'
import { Snackbar } from '@syntesis/c-snackbars'

window.openDialog({
  component: ({ open, dialogId }) => (
    <Snackbar
      open={ open }
      dialogId={ dialogId }
      content={ {
        type: 'Success',
        message: 'Snackbar message test'
      } }
    />
  )
})
```

### Props
| name     	| type   	| required 	| default                        	| description                     	|
|----------	|--------	|----------	|--------------------------------	|---------------------------------	|
| open     	| bool   	| yes      	|                                	| Open snackbar                   	|
| dialogId 	| string 	| yes      	|                                	| Id from dialog to manipulate it 	|
| content  	| object 	| no       	| `{ type: null, message: '' }` 	| Object that extract infos       	|

### Content Props
| name    	| type   	| required 	| default   	| description                                            	|
|---------	|--------	|----------	|-----------	|--------------------------------------------------------	|
| type    	| string 	| no       	| `Generic` 	| One of types: `Generic`, `Success`, `Warning`, `Error` 	|
| message 	| string 	| no       	| `''`       	| Message that will be inject on snackbar content        	|

## License

MIT © [](https://github.com/)
