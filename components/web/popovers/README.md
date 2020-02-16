# @syntesis/c-popovers

> A package to create popovers to components

## Install
Add `@syntesis/c-popovers` into package.json dependencies from another package.

## Usage
```jsx
import React, { Component, createRef } from 'react'
import PopoverOver from '@syntesis/c-popovers/src/components/PopoverOver'

class Example extends Component {
  constructor() {
    super()
    
    this.elementRef = createRef()
    
    this.state = {
      popoverId: Math.floor(Math.random() * 1000).toString()
    }
  }
  
  render() {
    return (
      <div>
        <h3 ref={ this.elementRef }>hover this element</h3>
        <PopoverOver
          anchorEl={ this.elementRef }
          popoverId={ this.state.popoverId }
          content="Hello popover!"
        />
      </div>
    )
  }
}

export default Component
```

### Props
| name      	| type   	| required 	| default 	| description                          	|
|-----------	|--------	|----------	|---------	|--------------------------------------	|
| anchorEl  	| func   	| yes      	|         	| React ref                            	|
| popoverId 	| string 	| yes      	|         	| String as ID                         	|
| content   	| string 	| no       	| `''`     	| Popover string content               	|
| withDelay 	| bool   	| no       	| `true`    | Enable delay to show popover (750ms) 	|

## License

MIT © [](https://github.com/)
