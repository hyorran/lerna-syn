# @syntesis/c-commons

> A package to create commons component to use in Synsuite components and features

## Install
Add `@syntesis/c-commons` into package.json dependencies from another package.

## Components

### CardHeightFull
Keep a div fixed on screen with height 100% when not is a small screen.
#### Usage
```jsx
import React from 'react'
import CardHeightFull from '@syntesis/c-commons/lib/components/CardHeightFull'
import Content from './Content'

const Example = () => {
  return (
    <CardHeightFull>
      <Content />
    </CardHeightFull>
  )
}

export default Example
```
#### Props
| name               	| type    	| required 	| default 	| description                                               	|
|--------------------	|---------	|----------	|---------	|-----------------------------------------------------------	|
| children           	| element 	| no       	| `null`  	| React Mounted Component that will be rendered as content  	|
| cardContainerClass 	| string  	| no       	| `null`  	| Classname that will be merged with container styles       	|

### HelperPage
#### Usage
```jsx
import React from 'react'
import HelperPage from '@syntesis/c-commons/lib/components/HelperPage'

const Example = () => {
  return (
    <HelperPage
      pageTitle="Formas de pagamento"
      wikiPageId={ 211 }
    />
  )
}

export default Example
```
#### Props
| name       	| type   	| required 	| default 	| description                                              	|
|------------	|--------	|----------	|---------	|----------------------------------------------------------	|
| hide       	| bool   	| no       	| `false` 	| Change to `true` to not render this component            	|
| wikiPageId 	| number 	| no       	| `null`  	| Wiki page id to get the page description from Wiki API   	|
| pageTitle  	| string 	| no       	| `null`  	| Page name to render as a subtitle on PageTitle component 	|

### PageTitle
#### Usage
```jsx
import React from 'react'
import PageTitle from '@syntesis/c-commons/lib/components/PageTitle'
import WalletIcon from '@syntesis/c-icons/lib/WalletIcons'

const Example = () => {
  return (
    <PageTitle
      title="Formas de pagamento"
      subtitle="financeiro / cadastros"
      Icon={ WalletIcon }
      wikiPageId={ 211 }
    />
  )
}

export default Example
```
#### Props
| name                	| type   	| required 	| default      	| description                                               	|
|---------------------	|--------	|----------	|--------------	|-----------------------------------------------------------	|
| title               	| string 	| yes      	|              	| Page title (big)                                          	|
| subtitle            	| string 	| no       	| `''`         	| Page subtitle (small)                                     	|
| Icon                	| func   	| no       	| `() => null` 	| React Component Icon                                      	|
| wikiPageId          	| number 	| no       	| `null`       	| Wiki page id to get the wiki page link from Wiki API        |
| containerTitleClass 	| string 	| no       	| `null`       	| Classname that will be merged with container title styles 	|

## License

MIT © [](https://github.com/)
