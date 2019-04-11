import BaseWidget from '../base_widget'
import SlideshowRenderer from './src/SlideshowRenderer.js'

export default class Slideshow extends BaseWidget {
  constructor() {
    super({
      name: 'Slideshow',
      version: '0.1',
      icon: 'play'
    })
  }

  get Widget() {
    return SlideshowRenderer
  }
}
