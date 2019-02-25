import Clock from 'react-live-clock'

import Layout from '../components/Layout.js'
import Slideshow from '../components/Slideshow.js'

const Display = props => (
  <div className="display">
    <div className={'status'}>
      <div className={'date'}>
        <Clock ticking={true} format={'dddd, MMMM Mo.'} />
      </div>
      <div className={'time'}>
        <Clock ticking={true} format={'H:mm'} />
      </div>
    </div>
    <Slideshow
      slides={[
        {
          type: 'photo',
          url:
            'https://compsci.lafayette.edu/wp-content/uploads/sites/66/2010/05/computerSci-homepage.jpg',
          title: 'Welcome to the Computer Science Department',
          desc:
            'Welcome to the fifth floor of the Acopian Engineering Center, home of the Computer Science department!',
          duration: 3, // In seconds
          order: 3
        },
        {
          type: 'photo',
          url:
            'https://news.lafayette.edu/wp-content/blogs.dir/2/files/2018/12/STEM-professors-470x264.jpg',
          title: 'Hidden Figures Week',
          desc:
            'Hidden Figures Week explored issues related to women in STEM through a roundtable faculty discussion.',
          duration: 2, // In seconds
          order: 1
        },
        {
          type: 'photo',
          url:
            'https://news.lafayette.edu/wp-content/blogs.dir/2/files/2018/11/Chawne-Kimber-STEM-300x300.jpg',
          title: 'STEM Stars',
          desc:
            'The future of STEM is here: Meet Lafayette’s innovators in science, technology, engineering, and mathematics.',
          duration: 3, // In seconds
          order: 4
        },
        {
          type: 'youtube',
          url: 'https://www.youtube.com/watch?v=xcs-xnc25-I',
          title: "The President's Challenge: Bring the Best",
          desc:
            "Saeed Malami '20 and Lillian Kennedy '21 talk about the impact Lafayette College has had on their lives and the role donors have played in making this possible.",
          duration: 50, // In seconds
          order: 2
        }
      ]}
    />
    <style jsx>
      {`
        .display {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
          background: black;
          font-family: Open Sans, sans-serif;
          color: white;
        }
        .status {
          padding: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .date {
        }
        .time {
        }
      `}
    </style>
  </div>
)

export default Display
