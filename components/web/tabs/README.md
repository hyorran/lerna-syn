# @syntesis/c-tabs

> A package to create tabs-content navigator

## Install
Add `@syntesis/c-tabs` into package.json dependencies from another package.

## Usage
```jsx
import React from 'react'
import ContentTabs from '@syntesis/c-tabs'
import FirstContent from './FirstContent'

const Component = () => (
  <ContentTabs
    hide={ false } // to show/render or not this component
    tabs={ [
      {
        type: 'details',
        contentComponent: FirstContent,
        contentComponentProps: {
          item: { name: 'my item name' }
        }
      },
      {
        label: 'Logs',
        contentComponent: () => <p>log content</p>
      }
    ] }
  />
)

export default Component
```

### Props
| name 	| type  	| required 	| default 	| description             	|
|------	|-------	|----------	|---------	|-------------------------	|
| hide 	| bool  	| no       	| `true`   	| Hide the tabs component 	|
| tabs 	| array 	| no       	| `[]`     	| Tabs array definitions  	|

### Props for tab
| name                  	| type   	| required 	| default 	| description                                             	|
|-----------------------	|--------	|----------	|---------	|---------------------------------------------------------	|
| type                  	| string 	| no       	| `null`   	| Predefined type. ex: `details`                          	|
| label                 	| string 	| no       	| `null`   	| Tab string name                                         	|
| contentComponent      	| func   	| yes      	|         	| Component Function that will be rendered on tab content 	|
| contentComponentProps 	| object 	| no       	| `{}`     	| Props that will be injected on `contentComponent`       	|
## License

MIT © [](https://github.com/)
