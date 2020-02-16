import React, { Fragment } from 'react'
import { render } from 'react-dom'
import ScreenRouter from './router'
import DialogPortal from '@syntesis/c-dialog-portal'
import { enableLogging } from 'mobx-logger'
import 'moment/locale/pt-br'

if (process.env.NODE_ENV === 'development') {
  console.groupCollapsed = console.group // fix mobx logger to birth opened
  enableLogging({
    action: true,
    reaction: false,
    compute: false
  })
  // eslint-disable-next-line global-require
  window._ = require('lodash')
}
render(
  (
    <Fragment>
      <ScreenRouter />
      <DialogPortal />
    </Fragment>
  ),
  document.getElementById('react-root')
)
