import BaseWidget from '../base_widget'
import ListContent from './src/ListContent'
import ListOptions from './src/ListOptions'

export default class List extends BaseWidget {
  constructor() {
    super({
      name: 'List',
      version: '0.1',
      icon: 'list',
      defaultData: {
        title: null,
        color: '#34495e',
        textColor: '#ffffff',
        list: [{ text: '', label: null }]
      }
    })
  }

  get Widget() {
    return ListContent
  }

  get Options() {
    return ListOptions
  }
}
