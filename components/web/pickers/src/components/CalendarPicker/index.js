import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Flatpickr from 'react-flatpickr'
import { localizeFlatpickr } from '../../utils'

import styles from './styles'

localizeFlatpickr()

const CalendarPicker = props => <Flatpickr { ...props } />

export default withStyles(styles)(CalendarPicker)
