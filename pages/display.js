/**
 * @fileoverview Preview page (shows the display frame and renders all the
 * widgets inside of it)
 */

import DisplayFrame from '../components/DisplayFrame.js'
import Slideshow from '../components/Slideshow.js'

/* eslint-disable */
// TODO(@wassgha): Replace with dynamic slide data through a call to the API
const MOCK_SLIDES = [
  {
    type: 'photo',
    data:
      'https://compsci.lafayette.edu/wp-content/uploads/sites/66/2010/05/computerSci-homepage.jpg',
    title: 'Welcome to the Computer Science Department',
    desc:
      'Welcome to the fifth floor of the Acopian Engineering Center, home of the Computer Science department!',
    duration: 3, // In seconds
    order: 2
  },
  {
    type: 'photo',
    data:
      'https://news.lafayette.edu/wp-content/blogs.dir/2/files/2018/12/STEM-professors-470x264.jpg',
    title: 'Hidden Figures Week',
    desc:
      'Hidden Figures Week explored issues related to women in STEM through a roundtable faculty discussion.',
    duration: 2, // In seconds
    order: 1
  },
  {
    type: 'web',
    data: 'https://compsci.lafayette.edu/courses/',
    title: 'Classes Website Example',
    desc: '',
    duration: 4, // In seconds
    order: 3
  },

  {
    type: 'youtube',
    data: 'https://www.youtube.com/watch?v=xcs-xnc25-I',
    title: "The President's Challenge: Bring the Best",
    desc:
      "Saeed Malami '20 and Lillian Kennedy '21 talk about the impact Lafayette College has had on their lives and the role donors have played in making this possible.",
    duration: 10, // In seconds
    order: 4
  }
]
/* eslint-enable */

const Display = () => (
  <DisplayFrame>
    <Slideshow slides={MOCK_SLIDES} />
  </DisplayFrame>
)

export default Display
