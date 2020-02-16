# @syntesis/c-styles

> A simple library to keep same styles on synsuite components and features

## Install
Add `@syntesis/c-styles` into package.json dependencies from another package.

## Usage

### Colors

```jsx
import React from 'react'
import { Colors } from '@syntesis/c-styles'

const Component = () => (
  <h1 style={ { color: Colors.primary } }>
    test
  </h1>
)

export default Component
```

### Fonts

```jsx
import React from 'react'
import { Fonts } from '@syntesis/c-styles'

const Component = () => (
  <h1 
    style={ { 
      fontSize: Fonts.fontSize.M,
      fontWeight: Fonts.fontWeight.bold
    } }
  >
    test
  </h1>
)

export default Component
```

## License

MIT © [](https://github.com/)
