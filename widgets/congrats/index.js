import BaseWidget from '../base_widget'
import CongratsContent from './src/CongratsContent'
import CongratsOptions from './src/CongratsOptions'

export default class Congrats extends BaseWidget {
  constructor() {
    super({
      name: 'Congratulations',
      version: '0.1',
      icon: 'gifts',
      defaultData: {
        animation: 'confetti',
        text: 'Congratulations!',
        color: '#34495e',
        textColor: '#ffffff',
        fontSize: 16
      }
    })
  }

  get Widget() {
    return CongratsContent
  }

  get Options() {
    return CongratsOptions
  }
}
