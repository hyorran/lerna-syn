# @syntesis/c-inputs

> A package to create inputs and form validations

## Install
Add `@syntesis/c-inputs` into package.json dependencies from another package.

## Form

### Store
Create a store inside your package, that extends `FormStore`.
#### Usage
```jsx
import { FormStore } from '@syntesis/c-inputs'
import first from 'lodash/first'
import get from 'lodash/get'
import {
  postPaymentMethod,
  putPaymentMethod,
  getPaymentMethod
} from '@syntesis/s-payment-methods'

class FormPaymentMethodStore extends FormStore {
  constructor() {
    super({
      initialFormControls: {
        code: {
          value: '',
          rules: ['required']
        },
        title: {
          value: '',
          rules: ['required']
        },
        description: {
          value: ''
        },
        jsonField: {
          getControls: getPaymentMethod
        }
      }
    })

    this.onSubmitError = this.onSubmitError.bind(this)

    this.services = {
      get: getPaymentMethod,
      create: postPaymentMethod,
      update: putPaymentMethod
    }
  }
  
  transformApiData(response) {
    return response
  }
  
  transformDataToApi(data) {
    return data
  }

  onSubmitError(e = {}) {
    const { messages } = e
    const msg = first(messages)
    const errorText = get(msg, 'message')

    this.formControls = {
      ...this.formControls,
      code: {
        ...this.formControls.code,
        showError: true,
        isValid: false,
        errorText
      }
    }
  }
}

const store = new FormPaymentMethodStore()
export default store
```

### Métodos
#### constructor.initialFormControls
Initialize fields for this form.
##### getControls
When you have a JSON field from API, use this key to generate an automatic select for each key from it.
The value of ```getControls``` will be the service that receive the parameters to mount selects-enum for each key.
#### transformApiData
Receive the get response from API and manipulate this response to inject on your form store.
#### transformDataToApi
Receive the validated data from form, and manipulate this to send data to API.


## License

MIT © [](https://github.com/)
