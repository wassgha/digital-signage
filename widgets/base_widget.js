import EmptyWidget from '../components/Widgets/EmptyWidget'
import EmptyWidgetOptions from '../components/Widgets/EmptyWidgetOptions'

const REQUIRED_DEF_FIELDS = ['name', 'version', 'icon']

export default class BaseWidget {
  constructor(definition) {
    for (const defField of REQUIRED_DEF_FIELDS) {
      if (!(defField in definition)) {
        throw new Error(`${defField} is a required property of new widgets.`)
      }
      this[defField] = definition[defField]
    }
  }

  get Widget() {
    return EmptyWidget
  }

  get Options() {
    return EmptyWidgetOptions
  }
}
