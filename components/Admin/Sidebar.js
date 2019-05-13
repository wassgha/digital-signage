/**
 * @fileoverview Menu sidebar for the administrator pages, used to navigate the
 * admin interface and log out)
 */

import Link from 'next/link'
import { withRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv, faThLarge, faImages, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const MENU = [
  {
    id: 'layout',
    name: 'Layout',
    path: '/layout',
    icon: faThLarge
  },
  {
    id: 'preview',
    name: 'Preview',
    path: '/preview',
    icon: faTv
  },
  {
    id: 'slideshow',
    name: 'Slideshows',
    path: '/slideshows',
    icon: faImages
  }
]

const Sidebar = ({ router }) => (
  <div className='sidebar'>
    <div className='logo'>
      <div className='icon'>
        <FontAwesomeIcon icon={faTv} fixedWidth color='#7bc043' />
      </div>
      <div className='info'>
        <span className='name'>Acopian Fifth Floor</span>
        <span className='status online'>online</span>
      </div>
    </div>
    <ul className='menu'>
      {MENU.map(item => (
        <Link href={item.path} key={item.path}>
          <li className={item.path == router.pathname && 'active'}>
            <a>
              <FontAwesomeIcon icon={item.icon} fixedWidth />
              <span className={'text'}>
                {'   '}
                {item.name}
              </span>
            </a>
          </li>
        </Link>
      ))}
    </ul>
    <Link href={'/'}>
      <div className='logout'>
        <a>
          <FontAwesomeIcon icon={faSignOutAlt} fixedWidth />
          <span className={'text'}>{'   Logout'}</span>
        </a>
      </div>
    </Link>
    <style jsx>
      {`
        .sidebar {
          min-width: 300px;
          max-width: 300px;
          min-height: 100vh;
          background: white;
          display: flex;
          flex-direction: column;
        }
        .menu {
          list-style: none;
          padding: 0px;
          margin: 0px;
          display: flex;
          flex-direction: column;
          flex: 1;
          width: 100%;
        }
        .menu li,
        .logout {
          padding: 20px;
          text-transform: uppercase;
          font-family: 'Open Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #4f4f4f;
        }
        .menu li.active,
        .menu li:hover,
        .logout:hover {
          background: #f0f0f0;
          cursor: pointer;
        }
        .logo {
          display: flex;
          flex-direction: row;
          margin-top: 20px;
          margin-bottom: 20px;
          padding-right: 10px;
          padding-left: 10px;
        }
        .logo .icon {
          min-width: 3em;
          min-height: 3em;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(2);
        }
        .logo .info {
          font-family: 'Open Sans', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          white-space: nowrap;
          overflow: hidden;
        }
        .logo .info .name {
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .logo .info .status.online {
          color: #7bc043;
        }
        .logo .info .status.online::before {
          content: '•';
          color: #7bc043;
          font-size: 32px;
          vertical-align: middle;
          line-height: 16px;
          padding-right: 4px;
        }
        @media only screen and (max-width: 900px) {
          .sidebar {
            min-width: 0px;
          }
          .logo .info {
            display: none;
          }
          .logo .icon {
            min-width: 0px;
            min-height: 0px;
            transform: scale(1);
          }
          .logo {
            margin: 0px;
            padding: 0px;
          }
          .menu li .text,
          .logout .text {
            display: none;
          }
        }
      `}
    </style>
  </div>
)

export default withRouter(Sidebar)
