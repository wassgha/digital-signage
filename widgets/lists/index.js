import BaseWidget from '../base_widget'
import ListsContent from './src/ListsContent'
import ListsOptions from './src/ListsOptions'

export default class Lists extends BaseWidget {
  constructor() {
    super({
      name: 'List',
      version: '0.1',
      icon: 'list',
      defaultData: {
        text: 'List Stuff',
        color: '#34495e',
        textColor: '#ffffff',
        list: []
      }
    })
  }

  get Widget() {
    return ListsContent
  }

  get Options() {
    return ListsOptions
  }
}
