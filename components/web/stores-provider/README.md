# @syntesis/c-stores-provider

> A Package to provide MobX stores from a High Order Component

## Install
Add `@syntesis/c-stores-provider` into package.json dependencies from another package.

## Usage

```jsx
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStores } from '@syntesis/c-stores-provider'
import someStore from './someStore'

@inject('someStore')
@observer
class Example extends Component {
  render () {
    const {
      someStore: {
        someComputed
      }
    } = this.props
    
    return (
      <h2>{ someComputed }</h2>
    )
  }
}

export default withStores({ someStore })(Example)
```

## License

MIT © [](https://github.com/)
