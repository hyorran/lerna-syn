# @syntesis/c-buttons

> A package to create buttons and icon buttons

## Install
Add `@syntesis/c-buttons` into package.json dependencies from another package.

## Components

### Button
#### Usage
```jsx
import React from 'react'
import Button from '@syntesis/c-modals/lib/components/Button'

const Example = (props) => {
  return (
    <Button onClick={ () => console.warn('button clicked!') }>
      click me
    </Button>
  )
}

export default Example
```
#### Props
| name            	| type          	| required 	| default    	| description                                                                            	|
|-----------------	|---------------	|----------	|------------	|----------------------------------------------------------------------------------------	|
| type            	| string        	| no       	| `button`   	| Button type                                                                            	|
| disabled        	| bool          	| no       	| `false`    	| Disable the button                                                                     	|
| loading         	| bool          	| no       	| `false`    	| Insert a loading inside of the button                                                  	|
| asCreate        	| bool          	| no       	| `false`    	| Transform button to create style (primary)                                             	|
| btnClass        	| string        	| no       	| `null`     	| Additional style class that will be merged with default style                          	|
| btnProps        	| object        	| no       	| `{}`       	| Object with any [Material-UI Button props](https://material-ui.com/api/button/#button) 	|
| onClick         	| func          	| no       	| `() => {}` 	| Function that will be fired when button is clicked                                     	|
| debounce        	| number / bool 	| no       	| `200`      	| Time (ms) to debounce click. Set to `false` to disable this                            	|
| debounceReverse 	| bool          	| no       	| `false`    	| Debounce will capture the first click and ignore the next                              	|
| variant         	| string        	| no       	| `outlined` 	| Material-UI variant style                                                              	|
| roleStyle       	| string        	| no       	| `null`     	| A class key name from inside button style                                              	|
| children        	| string        	| no       	| `''`       	| Content                                                                               	|

### IconButton
#### Usage
```jsx
import React from 'react'
import IconButton from '@syntesis/c-buttons/lib/components/IconButton'
import CloseIcon from '@syntesis/c-icons/lib/CloseIcon'

const CloseIconButton = (props) => {
  return (
    <IconButton 
      onClick={ () => console.warn('button click') }
      tooltip="fechar"
    >
      <CloseIcon />
    </Button>
  )
}

export default CloseIconButton
```
#### Props
| name             	| type          	 | required 	| default    	| description                                                                                   	|
|------------------	|----------------- |----------	|------------	|-----------------------------------------------------------------------------------------------	|
| disabled         	| bool          	 | no       	| `false`    	| Disable the button                                                                            	|
| loading          	| bool          	 | no       	| `false`    	| Insert a loading inside of the button                                                         	|
| asCreate         	| bool          	 | no       	| `false`    	| Transform button to create style (primary)                                                    	|
| asLight          	| bool          	 | no       	| `false`    	| Transform button to light style                                                               	|
| onTable          	| bool          	 | no       	| `false`    	| Transform button to table style                                                               	|
| withOpacity      	| bool          	 | no       	| `false`    	| Add opacity when not hover mouse on the button                                                	|
| shadow           	| bool          	 | no       	| `false`    	| Add shadow to button                                                                          	|
| btnClass         	| string        	 | no       	| `null`     	| Additional style class that will be merged with default style                                 	|
| onClick          	| func          	 | no       	| `() => {}` 	| Function that will be fired when button is clicked                                            	|
| popover          	| bool          	 | no       	| `false`    	| Enable popover on button                                                                      	|
| popoverProps     	| object        	 | no       	| `{}`       	| Popover props                                                                                 	|
| tooltip          	| string        	 | no       	| `null`     	| Enable tooltip on button                                                                      	|
| marginVertical   	| bool          	 | no       	| `false`    	| Enable vertical margin                                                                        	|
| marginHorizontal 	| bool          	 | no       	| `true`     	| Enable horizontal margin                                                                      	|
| debounce         	| number / bool 	 | no       	| `200`      	| Time (ms) to debounce click. Set to `false` to disable this                                    	|
| debounceReverse  	| bool          	 | no       	| `false`    	| Debounce will capture the first click and ignore the next                                     	|
| size             	| string        	 | no       	| `normal`   	| Change the button size. Other options: `mini`                                                 	|
| color            	| string        	 | no       	| `default`  	| The color of the component                                                                    	|
| disableRipple    	| bool          	 | no       	| `false`    	| If `true`, the ripple will be disabled                                                        	|
| children        	| element / string | no       	| `''`        | Content (Mounted Icon Component / string)                                                      	|


### Ready Icon Buttons

- AddIconButton
- CloseIconButton
- CopyIconButton
- DeleteIconButton
- DownloadIconButton
- DuplicateIconButton
- EditIconButton
- HelpIconButton
- PrintIconButton
- SaveIconButton
- UncollapseIconButton
- UnselectedIconButton

#### Usage
```jsx
import React from 'react'
import CloseIconButton from '@syntesis/c-buttons/lib/components/IconButton/CloseIconButton'

const Example = () => (
  <CloseIconButton
    onClick={ () => { console.warn('button clicked!') } }
  />
)

export default Example
```

## License

MIT © [](https://github.com/)
