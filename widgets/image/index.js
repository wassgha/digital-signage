import BaseWidget from '../base_widget'
import ImageContent from './src/ImageContent'
import ImageOptions from './src/ImageOptions'

export default class Image extends BaseWidget {
  constructor() {
    super({
      name: 'Image',
      version: '0.1',
      icon: 'image',
      defaultData: {
        title: null,
        url: null,
        fit: 'contain',
        color: '#2d3436'
      }
    })
  }

  get Widget() {
    return ImageContent
  }

  get Options() {
    return ImageOptions
  }
}
