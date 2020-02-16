import React from 'react'
import { Provider } from 'mobx-react'

const withStores = (stores = {}) => WrappedComponent => props => (
  <Provider { ...stores }>
    <WrappedComponent { ...props } />
  </Provider>
)

export { withStores }
