import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import { withStyles } from '@material-ui/core/styles'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import styles from './styles'

class RadioButtonsGroup extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = debounce(this.handleChange.bind(this), 200, {
      'leading': true,
      'trailing': false
    })

    this.state = {
      value: props.initialValue
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value.toString()
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  render() {
    const {
      classes,
      legend,
      name,
      children,
      visible,
      containerClass,
      label,
      labelClass,
      groupClass,
      inline
    } = this.props

    if (!visible) {
      return null
    }

    return (
      <div className={ classes.root }>
        <FormControl
          component="fieldset"
          className={ [
            classes.formControl,
            inline ? classes.inlineRadioButtonGroup : null,
            containerClass
          ].join(' ') }
          label={ label }
        >
          {
            !isEmpty(legend || label)
              ? (
                <FormLabel
                  className={ [
                    labelClass, inline ? classes.inlineRadioButtonGroupLabel : null
                  ].join(' ') }
                  component="legend"
                >
                  { legend || label }
                </FormLabel>
              )
              : null
          }
          <RadioGroup
            name={ name }
            className={ [
              classes.group,
              labelClass, inline ? classes.inlineRadioButtonGroupGroup : null,
              groupClass
            ].join(' ') }
            value={ this.state.value }
            onChange={ this.handleChange }
          >
            { children }
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

RadioButtonsGroup.propTypes = {
  /** Provided by material-ui. */
  classes: PropTypes.object.isRequired,
  /** - */
  name: PropTypes.string.isRequired,
  /** - */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /** - */
  label: PropTypes.string,
  /** - */
  initialValue: PropTypes.string,
  /** - */
  onChange: PropTypes.func,
  /** - */
  visible: PropTypes.bool,
  /** - */
  legend: PropTypes.string,
  /** - */
  containerClass: PropTypes.string,
  /** - */
  labelClass: PropTypes.string,
  /** - */
  groupClass: PropTypes.string,
  /** If 'true' displays all children's inline */
  inline: PropTypes.bool
};

RadioButtonsGroup.defaultProps = {
  onChange: () => {},
  legend: '',
  visible: true,
  initialValue: '1',
  containerClass: null,
  labelClass: null,
  groupClass: null,
  label: undefined,
  inline: false
}

export default withStyles(styles)(RadioButtonsGroup)
export { RadioButtonsGroup as ComponentWithProps }
