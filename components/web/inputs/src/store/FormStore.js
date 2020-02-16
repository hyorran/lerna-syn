/* eslint-disable no-nested-ternary */
import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'
import mapValues from 'lodash/mapValues'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import trim from 'lodash/trim'
import findKey from 'lodash/findKey'
import reverse from 'lodash/reverse'
import tail from 'lodash/tail'
import set from 'lodash/set'
import get from 'lodash/get'
import find from 'lodash/find'
import difference from 'lodash/difference'
import forEach from 'lodash/forEach'
import indexOf from 'lodash/indexOf'
import remove from 'lodash/remove'
import reduce from 'lodash/reduce'
import toString from 'lodash/toString'
import toArray from 'lodash/toArray'
import uniq from 'lodash/uniq'
import cloneDeep from 'lodash/cloneDeep'
import flow from 'lodash/fp/flow'
import filterFP from 'lodash/fp/filter'
import reduceFP from 'lodash/fp/reduce'
import keyByFP from 'lodash/fp/keyBy'
import mapValuesFP from 'lodash/fp/mapValues'
import applyRulesAndValidate from '../rules'

class FormStore {
  constructor({ initialFormControls }) {
    this.submit = this.submit.bind(this)
    this.execSubmitForm = this.execSubmitForm.bind(this)
    this.getApiControlsData = this.getApiControlsData.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.getDynamicControls = this.getDynamicControls.bind(this)
    this.getDynamicControl = this.getDynamicControl.bind(this)
    this.setInitialControls = this.setInitialControls.bind(this)
    this.init = this.init.bind(this)

    this.init(initialFormControls)
  }

  static mobxLoggerConfig = {
    methods: {
      changeFormControl: false,
      speedFindErrorsOnForm: false
    }
  }

  initialFormStatus = {
    messages: {
      message: '',
      type: '',
    },
    loading: false,
    error: false
  }

  @action
  async init(initialFormControls) {
    await this.setInitialControls(initialFormControls)
    await this.getDynamicControls()
    this.bootstrapControls()
  }

  @action
  bootstrapControls = (setAsOriginal = true, runBootstrap = true) => {
    const { controlsAfterValidation } = this.validateForm({ showError: false })
    this.changeAllFormControls(controlsAfterValidation, setAsOriginal, runBootstrap)
  }

  @action
  setInitialControls = (initialFormControls = {}) => {
    this.initialFormControls = mapValues(initialFormControls, control => ({
      isValid: false,
      showError: false,
      errorText: '',
      ...control
    }))
    // this.formControls = cloneDeep(this.initialFormControls })

    const controls = mapValues(initialFormControls, (control, controlName) => {
      const newControl = {
        isValid: false,
        showError: false,
        errorText: '',
        ...control
      }
      return {
        ...newControl,
        ...this.mountStructData({
          actualControl: {
            ...newControl
          },
          controlPath: controlName,
          path: controlName
        })
      }
    })

    this.initialFormControls = cloneDeep(controls)
    this.formControls = cloneDeep(controls)
    this.original = cloneDeep(controls)
  }

  @action
  setOriginalControls = (initialFormControls = {}) => {
    initialFormControls = cloneDeep(initialFormControls)
    this.formControls = mapValues(initialFormControls, (control, controlName) => ({
      isValid: false,
      showError: false,
      errorText: '',
      ...control,
      ...this.mountStructData({
        actualControl: control,
        controlPath: controlName,
        path: controlName
      })
    }))
    this.original = cloneDeep(this.formControls)
  }

  @observable
  fallback = () => {}

  @observable
  onSubmitSuccess = null

  @persist('object')
  @observable
  formControls = this.initialFormControls

  @persist('object')
  @observable
  formMode = {}

  @observable
  formStatus = this.initialFormStatus

  @observable
  services = {}

  @observable
  onSuccess = () => {}

  @action
  resetFormControls = () => {
    this.formControls = { ...this.initialFormControls }
  }

  resetFormStatus = () => {
    this.formStatus = { ...this.initialFormStatus }
  }

  @action
  async getDynamicControls() {
    const promises = map(this.formControls, this.getDynamicControl)
    let controls = await Promise.all(promises)

    controls = flow(
      filterFP(control => control),
      reduceFP((acc, item) => ({ ...acc, ...item }), {})
    )(controls)

    forEach(controls, (subControls, key) => {
      const control = get(this.formControls, key, {})
      this.formControls = {
        ...this.formControls,
        [key]: {
          ...control,
          value: {
            ...get(control, 'value', {}),
            ...subControls
          }
        }
      }
    })

    this.setOriginalControls(this.formControls)
  }

  async getDynamicControl(control, controlName) {
    const getControls = get(control, 'getControls')
    if (getControls) {
      const { response = [] } = await getControls()
      return {
        [controlName]: flow(
          keyByFP('name'),
          mapValuesFP(item => ({
            ...item,
            rules: get(item, 'rules', []),
            value: toString(get(item, 'defaultValue')),
            options: map(get(item, 'options', []), option => ({
              ...option,
              value: toString(get(option, 'value')),
            }))
          }))
        )(response)
      }
    }
    return null
  }

  @action
  changeFormMode = (mode) => {
    this.formMode = mode
  }

  @action
  setOnSuccess = (onSuccess = () => {}) => {
    this.onSuccess = onSuccess
  }

  discoverParentsPath = ({ tempPaths, originalField, customControlPath }) => {
    let parentsPath = uniq([
      ...tempPaths,
      ...get(originalField || {}, 'parentsPath', [])
    ])

    forEach(parentsPath, (parent) => {
      const parentControl = get(this.formControls, parent)
      if (parentControl) {
        const diff = difference(parentControl.parentsPath, parentsPath)
        if (!isEmpty(diff)) {
          parentsPath = [
            ...parentsPath,
            ...diff
          ]
        }
      }
    })

    return uniq([
      ...parentsPath,
      customControlPath
    ])
  }

  mountArrayRepeater = ({
    valueFromApi, controlField, controlValue, controlPath, path
  }) => {
    const tempPaths = [path, controlPath]
    // percorre cada bloco de controls vindo da api para aplicar em um repeater
    const blocks = map(controlValue, (block, index) =>
      // percorre as chaves de cada bloco do repeater
      mapValues(controlField, (field, key) => {
        const customControlPath = `${ controlPath }.value[${ index }].${ key }`
        const originalField = get(this.formControls, `${ controlPath }.value[${ index }].${ key }`)

        const parentsPath = this.discoverParentsPath({
          tempPaths,
          originalField,
          customControlPath
        })

        return {
          ...this.mountStructData({
            valueFromApi: get(valueFromApi, `[${ index }].${ key }`),
            actualControl: originalField || field,
            controlPath: customControlPath,
            path
          }),
          parentsPath
        }
        // return data
      }))

    // console.warn('mounted ArrayRepeater', path, blocks, controlValue)

    return {
      value: blocks
    }
  }

  mountStructData = ({
    valueFromApi, actualControl, controlPath, path, existingControls
  }) => {

    const controlValue = get(actualControl, 'value')
    const controlField = get(actualControl, 'fields')
    const controlRules = get(actualControl, 'rules')

    const value = (valueFromApi !== undefined && valueFromApi !== null)
      ? valueFromApi
      : controlValue

    let response = {
      value
    }

    // if (controlPath === 'stages') {
    //   console.warn('----------------------------------')
    //   console.warn('controlPath', controlPath)
    //   console.warn('actualControl', actualControl)
    //   console.warn('value', value)
    //   console.warn('isArray(value)', isArray(value))
    //   console.warn('valueFromApi', valueFromApi)
    //   console.warn('controlValue', controlValue)
    //   console.warn('----------------------------------')
    // }

    if (!isEmpty(controlField)) {
      response = {
        ...response,
        ...this.mountArrayRepeater({
          controlField,
          controlValue: value,
          controlPath,
          path,
          valueFromApi
        })
      }
    } else if (isObject(value) && !isArray(value)) {
      response = {
        ...response,
        value: this.mountDynamicObject({
          controlValue: value,
          controlPath,
          existingControls
        })
      }
    } else if (value === null) {
      response = {
        ...response,
        value: ''
      }
    } else if (isNumber(value)) {
      response = {
        ...response,
        value: toString(value)
      }
    }

    return {
      isValid: !isArray(controlRules) || (isArray(controlRules) && isEmpty(controlRules)),
      showError: false,
      errorText: '',
      parentsPath: [path],
      ...actualControl,
      ...response
    }
  }

  mountDynamicObject = ({
    controlValue, controlPath, existingControls
  // eslint-disable-next-line arrow-body-style
  }) => {
    // console.warn('----------------------------------')
    // console.warn('controlPath', controlPath)
    // console.warn('controlValue', controlValue)
    // console.warn('existingControls', existingControls)
    // console.warn('----------------------------------')
    // value is a object with subControls
    return mapValues(controlValue, (control, key) => ({
      ...control,
      ...this.mountValue({
        path: `${ controlPath }.value.${ key }`,
        automaticPath: `${ controlPath }.${ key }`,
        existingControls
      })
    }))
  }

  mountValue = ({ path, existingControls, automaticPath }) => {
    const valueFromApi = get(existingControls, automaticPath || path, null)
    const actualControl = get(this.formControls, path)

    // console.warn('----------------------------------')
    // console.warn('this.formControls', this.formControls)
    // console.warn('path', path)
    // console.warn('existingControls', existingControls)
    // console.warn('valueFromApi', valueFromApi)
    // console.warn('actualControl', actualControl)
    // console.warn('to mountStructData', {
    //   valueFromApi,
    //   actualControl,
    //   controlPath: path,
    //   path,
    //   existingControls,
    //   automaticPath
    // })
    // console.warn('----------------------------------')

    return this.mountStructData({
      valueFromApi,
      actualControl,
      controlPath: path,
      path,
      existingControls
    })
  }

  /*
  * recebe um objeto da API para atualizar os controles
  * @params existingControls = { code: 'value', title: 'value', description: 'value' }
  * */
  @action
  injectExistingControls = (existingControls, mode = {}) => {

    // console.warn('existingControls', existingControls)

    const newControls = mapValues(this.formControls, (control, controlName) => ({
      ...control,
      ...this.mountValue({ path: controlName, existingControls })
    }))

    if (mode.update) {
      this.changeAllFormControls(newControls, true, true)
    } else {
      this.original = cloneDeep(this.initialFormControls)
      this.changeAllFormControls(newControls)
    }
  }

  @action
  changeAllFormControls = (newControls, setAsOriginal = false, runBootstrap = false) => {
    this.formControls = {
      ...this.formControls,
      ...mapValues(newControls, (control, controlName) => ({
        ...get(this.formControls, controlName, {}),
        ...control
      }))
    }

    this.speedFindErrorsOnForm()
    if (setAsOriginal) {
      this.setOriginalControls(this.formControls)
    }
    if (runBootstrap) {
      this.bootstrapControls(true, false)
    }
  }

  @action
  checkForInvalidsChildrens = (parentsPath, force = false) => {
    let hasError = false
    let invalidChildrens = []
    let errorText = ''

    const mapForChildrens = (parentControl, parentName) => {
      if (
        isObject(parentControl.value) ||
        (isArray(parentControl.value) && !isEmpty(parentControl.fields))
      ) {
        forEach(parentControl.value, (item, key) => {
          if (isNumber(key)) {
            forEach(item, (blockControl, name) => {
              mapForChildrens(blockControl, name)
            })
          } else {
            // console.warn('is object')
          }
        })
      } else if (!parentControl.isValid) {
        // console.warn('parentControl', parentName, parentControl)
        if (!force && parentControl.showError) {
          hasError = true
          invalidChildrens.push(parentName)
          errorText = get(parentControl, 'errorText')
        }
        if (force) {
          const controlValidated = applyRulesAndValidate(parentControl.rules, parentControl.value)
          if (!controlValidated.isValid) {
            hasError = true
            // console.warn('hasError', parentName)
            invalidChildrens.push(parentName)
            errorText = get(controlValidated, 'errorText')
          }
          forEach(
            reverse(tail(parentControl.parentsPath)),
            (parent) => {
              const grandParentControl = get(this.formControls, parent)
              set(this.formControls, parent, {
                ...grandParentControl,
                ...controlValidated,
                isValid: grandParentControl.fields ? !hasError : controlValidated.isValid,
                showError: true
              })
            }
          )
        }
      }
    }

    forEach(parentsPath, (parent) => {
      invalidChildrens = []
      errorText = ''
      const parentControl = get(this.formControls, parent)
      mapForChildrens(parentControl, parent, [])

      if (invalidChildrens.length) {
        set(this.formControls, parent, {
          ...parentControl,
          isValid: false,
          showError: true,
          errorText
        })
      } else if (!parentControl.isValid) {
        set(this.formControls, parent, {
          ...parentControl,
          isValid: true,
          errorText
        })
      }
    })

    return hasError
  }

  @action
  changeFormControl = (controlName, control, setAsOriginal = false) => {
    const oldControl = get(this.formControls, controlName, null)

    // console.warn(controlName, oldControl, this.formControls)

    if (oldControl) {
      set(this.formControls, controlName, {
        ...oldControl,
        ...control
      })

      const parentsPath = get(oldControl, 'parentsPath')

      if (!isEmpty(parentsPath)) {
        remove(parentsPath, parent => parent === controlName)
        this.checkForInvalidsChildrens(parentsPath)
      }
    }

    if (setAsOriginal) {
      this.setOriginalControls(this.formControls)
    }

    this.speedFindErrorsOnForm()
  }

  @action
  async resetForm() {
    this.resetFormControls()
    this.resetFormStatus()
    await this.getDynamicControls()
    this.bootstrapControls()
  }

  @action
  speedFindErrorsOnForm = (options = {}) => {
    const controlWithError = find(this.formControls, { isValid: false, ...options })
    const errorText = get(controlWithError, 'errorText')

    this.formStatus = {
      ...this.formStatus,
      error: !!controlWithError,
      errorText
    }
  }

  @action
  validateForm = (config = {}) => {
    const { showError = true } = config
    /*
    * cria uma cópia dos controles existentes,
    * aplica validação baseado nas rules
    * e libera a exibição de possíveis mensagens de erro
    * mas ainda sem alterar os controles que estão renderizados
    * */
    const controlsAfterValidation = mapValues(this.formControls, control => ({
      ...control,
      ...applyRulesAndValidate(control.rules, control.value, showError)
    }))

    const hasInvalidControls = findKey(controlsAfterValidation, { isValid: false })

    this.formStatus = {
      ...this.formStatus,
      error: !!hasInvalidControls
    }

    return {
      controlsAfterValidation,
      hasInvalidControls
    }
  }

  @action
  async submit() {
    const {
      controlsAfterValidation,
      hasInvalidControls
    } = this.validateForm()

    if (hasInvalidControls !== undefined) {
      /*
     * caso exista algum controle com erros
     * alteramos a store do formulário
     * para que ele seja renderizado novamente
     * apontando os erros existentes
     * e não submetemos o formulário
     * */
      window.snackbar.warn('Por favor preencha os dados corretamente.')
      this.changeAllFormControls(controlsAfterValidation)
      throw new Error(get(controlsAfterValidation, `${ hasInvalidControls }.errorText`))
    } else {
      /*
      * caso o formulário esteja validado(this.formControls,
      * efetuamos o submit
      * */
      try {
        await this.execSubmitForm()
        this.onSuccess(this.formValues)
      } catch (e) {
        /*
        *  Se der pau no request, roda o fallback
        *  e passa adiante o erro
        * */
        this.fallback()

        throw e
      }
    }
  }

  @action
  registerFallback = (fallback) => {
    this.fallback = fallback
  }

  @action
  async execSubmitForm() {
    try {
      this.resetFormStatus()
      this.formStatus = {
        ...this.formStatus,
        loading: true
      }

      let data = this.formValues
      if (isFunction(this.transformDataToApi)) {
        data = this.transformDataToApi(data)
      }

      if (this.formMode.create && isFunction(this.services.create)) {
        await this.services.create(data)
      } else if (this.formMode.update && isFunction(this.services.update)) {
        await this.services.update({
          ...data,
          id: this.formMode.update
        })
      }

      this.formStatus = {
        ...this.formStatus,
        loading: false
      }
    } catch (e) {
      this.formStatus = {
        ...this.formStatus,
        loading: false
      }
      if (isFunction(this.onSubmitError)) {
        this.onSubmitError(e)
      }
      throw e
    }
  }

  @action
  async getApiControlsData(item, mode) {
    try {
      if (isFunction(get(this.services, 'get'))) {
        this.changeFormMode(mode)

        this.formStatus = {
          ...this.formStatus,
          loading: true
        }

        let { response } = await this.services.get(item)
        if (isFunction(this.transformApiData)) {
          response = this.transformApiData(response)
        }

        this.injectExistingControls({ ...response }, mode)

        this.formStatus = {
          ...this.formStatus,
          loading: false
        }
      }
    } catch (e) {
      this.formStatus = {
        ...this.formStatus,
        loading: false,
        error: true
      }
      this.fallback()
      throw e
    }
  }

  @action
  validateFormFromFilter = () => {
    const {
      controlsAfterValidation,
      hasInvalidControls
    } = this.validateForm()

    if (!hasInvalidControls) {
      this.changeOriginal(controlsAfterValidation)
      if (isFunction(this.transformDataToApi)) {
        return {
          controlsAfterValidation: this.transformDataToApi(controlsAfterValidation),
          hasInvalidControls
        }
      }
      return {
        controlsAfterValidation,
        hasInvalidControls
      }
    }
    return { hasInvalidControls }
  }

  @action
  changeOriginal = (original) => {
    if (isEmpty(original)) {
      original = this.formControls
    }
    this.original = cloneDeep(original)
  }

  @action
  changeControlRules = (controlName, newRules = [], add = true) => {
    let control = get(this.formControls, controlName, {})
    let controlRules = get(control, 'rules', [])

    forEach(newRules, (rule) => {
      if (add) {
        if (indexOf(controlRules, rule) < 0) {
          controlRules = [
            ...controlRules,
            rule
          ]
        }
      } else {
        // remove
        remove(controlRules, oldRule => oldRule === rule)
      }
    })

    control = {
      ...control,
      rules: controlRules
    }
    this.changeFormControl(controlName, control)
    const { controlsAfterValidation } = this.validateForm()
    this.formControls = controlsAfterValidation
  }

  @action
  changeAllControlsRules = (controls, validate = false) => {

    let newControls = map(controls, ({ controlName, newRules, add }) => {
      const control = get(this.formControls, controlName, {})
      let controlRules = get(control, 'rules', [])

      forEach(newRules, (rule) => {
        if (add) {
          if (indexOf(controlRules, rule) < 0) {
            controlRules = [
              ...controlRules,
              rule
            ]
          }
        } else {
          // remove
          remove(controlRules, oldRule => oldRule === rule)
        }
      })

      return {
        [controlName]: {
          ...control,
          rules: controlRules
        }
      }
    })

    newControls = reduce(
      newControls,
      (result, control) => ({ ...result, ...control }),
      {}
    )

    this.changeAllFormControls(newControls)

    if (validate) {
      const { controlsAfterValidation } = this.validateForm()
      this.formControls = controlsAfterValidation
    }
  }

  @action
  addFieldIndex = (controlName) => {
    const control = get(this.formControls, controlName, null)

    if (control) {
      const { fields } = control
      let { value } = control

      value = toArray(value)
      const newControls = this.mountStructData({
        actualControl: {
          ...control,
          value: [
            ...value,
            cloneDeep(fields)
          ]
        },
        controlPath: controlName,
        path: controlName
      })
      set(this.formControls, controlName, newControls)
      this.checkForInvalidsChildrens([controlName])
      return true
    }
    return false
  }

  @action
  removeFieldIndex = (controlName, index) => {
    const control = get(this.formControls, controlName, null)

    if (control) {
      let { value } = control

      value = cloneDeep(toArray(value))
      remove(value, (_, i) => i === index)

      let parents = [...control.parentsPath]
      forEach(control.parentsPath, (parent) => {
        const parentControl = get(this.formControls, parent)
        parents = [
          ...parents,
          ...parentControl.parentsPath
        ]
        // set(this.formControls, parent, {
        //   ...get(this.formControls, parent),
        //   isValid: true
        // })
      })

      set(this.formControls, `${ controlName }.value`, value)
      this.checkForInvalidsChildrens(uniq(parents))
      return true
    }
    return false
  }

  @action
  getControlsValue = (formControls) => {
    const getValue = controls => mapValues(
      controls,
      ({ value, fields }) => {
        if (isArray(value)) {
          return value
        }

        if (isObject(value)) {

          // repeater
          if (!isEmpty(fields)) {
            return map(value, fieldControls => getValue(fieldControls))
          }

          // object
          return getValue(value)
        }
        return value
      }
    )
    return getValue(formControls)
  }

  @computed
  get formValues() {
    return this.getControlsValue(this.formControls)
  }

  @computed
  get getFormControls() {
    return this.formControls
  }

  @computed
  get getFormMode() {
    return this.formMode
  }

  @computed
  get getFormStatus() {
    return this.formStatus
  }

  @computed
  get changed() {
    const getValues = ({ value, checked }) => {

      // caso for um checkbox
      if (isBoolean(checked) || checked === null) {
        return checked
      }

      if (isArray(value)) {
        return value
      } else if (isObject(value)) {
        return mapValues(value, item => getValues(item))
      } else if (!isEmpty(value)) {
        return trim(value)
      } else if (isBoolean(value) || isNumber(value)) {
        return value
      }
      return null
    }

    const currentValues = map(this.formControls, getValues)
    const originalValues = map(this.original, getValues)

    return !isEqual(currentValues, originalValues)
  }
}

export default FormStore
