import BaseWidget from '../base_widget'
import YoutubeContent from './src/YoutubeContent'
import YoutubeOptions from './src/YoutubeOptions'

export default class Web extends BaseWidget {
  constructor() {
    super({
      name: 'Youtube',
      version: '0.1',
      icon: ['fab', 'youtube'],
      defaultData: {
        title: null,
        url: 'https://www.youtube.com/watch?v=9xwazD5SyVg',
        color: '#95a5a6'
      }
    })
  }

  get Widget() {
    return YoutubeContent
  }

  get Options() {
    return YoutubeOptions
  }
}
