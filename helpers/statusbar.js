import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faRss, faGripVertical, faClock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
library.add(faRss)
library.add(faGripVertical)
library.add(faClock)
library.add(faCalendarAlt)

export const StatusBarElementTypes = {
  time: {
    name: 'time',
    icon: faClock
  },
  date: {
    name: 'date',
    icon: faCalendarAlt
  },
  spacer: {
    name: 'spacer',
    icon: faGripVertical
  },
  connection: {
    name: 'connection',
    icon: faRss
  }
}
