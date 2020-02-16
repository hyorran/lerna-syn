import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import { withTextField } from '../TextField'

class CpfCnpjInput extends Component {
  render() {
    const {
      inputRef, // removed from inputProps
      onlyCpf,
      onlyCnpj,
      ...inputProps
    } = this.props

    let mask
    // aqui nao contabiliza a mascara
    if (inputProps.value.length < 12 && !onlyCnpj) {
      // marcara de CPF
      // o digito a mais no final permite que a mascara altere para CNPJ
      mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
    } else if (!onlyCpf) {
      // mascara de CNPJ
      mask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    }

    return (
      <MaskedInput
        mask={ mask }
        { ...inputProps }
      />
    );
  }
}

CpfCnpjInput.propTypes = {
  /** - */
  name: PropTypes.string.isRequired,
  /** Input component's reference */
  inputRef: PropTypes.func.isRequired,
  /** - */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  /** - */
  guide: PropTypes.bool,
  /** unction that will be executed onChange. */
  onChange: PropTypes.func.isRequired,
  /** If 'true' just shows 'CNPJ'. */
  onlyCnpj: PropTypes.bool,
  /** If 'true' just shows 'CPF'. */
  onlyCpf: PropTypes.bool
}

CpfCnpjInput.defaultProps = {
  value: '',
  guide: false,
  onlyCnpj: false,
  onlyCpf: false
}

export default withTextField({
  type: 'tel',
  inputDefault: false
})(CpfCnpjInput)
export { CpfCnpjInput as ComponentWithProps }
