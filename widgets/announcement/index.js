import BaseWidget from '../base_widget'
import AnnouncementContent from './src/AnnouncementContent'
import AnnouncementOptions from './src/AnnouncementOptions'

export default class Announcement extends BaseWidget {
  constructor() {
    super({
      name: 'Announcement',
      version: '0.1',
      icon: 'exclamation-triangle',
      defaultData: {
        text: '',
        color: '#708090',
        textColor: '#ffffff',
        titleColor: '#fff0f0',
        accentColor: '#EDC951'
      }
    })
  }

  get Widget() {
    return AnnouncementContent
  }

  get Options() {
    return AnnouncementOptions
  }
}
