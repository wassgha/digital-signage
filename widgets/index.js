// Import all widgets statically to avoid async issues in components
import slideshowWidget from './slideshow/index.js'
import weatherWidget from './weather/index.js'
import congratsWidget from './congrats/index.js'
import youtubeWidget from './youtube/index.js'
import webWidget from './web/index.js'
import imageWidget from './image/index.js'
import listWidget from './list/index.js'
import announcementWidget from './announcement/index.js'

const widgets = {
  slideshow: new slideshowWidget(),
  weather: new weatherWidget(),
  congrats: new congratsWidget(),
  youtube: new youtubeWidget(),
  web: new webWidget(),
  image: new imageWidget(),
  list: new listWidget(),
  announcement: new announcementWidget()
}

export default widgets
