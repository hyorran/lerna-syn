# @syntesis/c-info-table

> A package to create simple tables to show any info

## Install
Add `@syntesis/c-info-table` into package.json dependencies from another package.

## Components

### Button
#### Usage
```jsx
import React from 'react'
import Button from '@syntesis/c-modals/lib/components/Button'
import Badge from '@syntesis/c-badges'

const Example = (props) => {
  return (
    <Badge content={ 3 }>
      <Button onClick={ () => console.warn('button clicked!') }>
        click me
      </Button>
    </Badge>
  )
}

export default Example
```
#### Props
| name      	| type          	| required 	| default   	| description                                      	|
|-----------	|---------------	|----------	|-----------	|--------------------------------------------------	|
| children  	| element       	| yes      	|           	| Element that will be wrapped with badge          	|
| content   	| number/string 	| yes      	|           	| Badge content that will be rendered inside badge 	|
| color     	| string        	| no       	| `primary` 	| Material UI color name                           	|
| invisible 	| bool          	| no       	| `false`   	| If `true` it will render only the children       	|


## License

MIT © [](https://github.com/)
