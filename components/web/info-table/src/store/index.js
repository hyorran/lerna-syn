import indexOf from 'lodash/indexOf'
import isArray from 'lodash/isArray'
import { action, observable, computed } from 'mobx'

class InfoTableStore {

  static mobxLoggerConfig = {
    methods: {
      isSelected: false
    }
  }

  @observable
  selecteds = []

  @action
  selectItem = (item) => {
    if (isArray(item)) {
      this.selecteds = [...item]
    } else {
      const index = indexOf(this.selecteds, item)
      if (index > -1) {
        const selecteds = [...this.selecteds]
        selecteds.splice(index, 1)
        this.selecteds = selecteds
      } else {
        this.selecteds.push(item)
      }
    }
  }

  @action
  reset = () => {
    this.selecteds = []
  }

  @action
  isSelected = item => indexOf(this.selecteds, item) > -1

  @computed
  get getSelecteds() {
    return this.selecteds
  }
}

const store = new InfoTableStore()
export default store
