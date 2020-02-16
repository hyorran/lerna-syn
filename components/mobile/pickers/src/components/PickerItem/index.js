import React, { Component } from 'react'
import { Label, Picker, View } from 'native-base'
import PropTypes from 'prop-types'

export default class PickerItem extends Component {
  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange() {
    this.props.onValueChange()
  }

  render() {
    const {
      styles,
      text,
      mode,
      iosHeader,
      placeholder,
      headerBackButtonText,
      selectedValue,
      onValueChange,
      listItem
    } = this.props

    return (
      <View>
        <Label style={ styles.text }>
          {text}
        </Label>
        <Picker
          mode={ mode }
          iosHeader={ iosHeader }
          placeholder={ placeholder }
          placeholderStyle={ styles.placeholder }
          headerBackButtonText={ headerBackButtonText }
          style={ styles.picker }
          selectedValue={ selectedValue }
          onValueChange={ onValueChange }
        >
          {listItem.map(val => (
            <Picker.Item
              label={ val.description ? val.description : val.title }
              value={ val.id }
              key={ val.id }
            />
          ))}
        </Picker>
      </View>
    )
  }
}

PickerItem.propTypes = {
  text: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedValue: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  listItem: PropTypes.array.isRequired,
  mode: PropTypes.string,
  iosHeader: PropTypes.string,
  headerBackButtonText: PropTypes.string,
  // parametro para saber o que será inserido no label do component pickeritem
  typeOfLabel: PropTypes.string
}

PickerItem.defaultProps = {
  mode: 'dropdown',
  iosHeader: 'Selecione',
  headerBackButtonText: 'Voltar',
  selectedValue: null,
  // default title por ser o que é mais utilizado
  typeOfLabel: 'title'
}
