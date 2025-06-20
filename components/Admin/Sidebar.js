/**
 * @fileoverview Menu sidebar for the administrator pages, used to navigate the
 * admin interface and log out)
 */

import Link from 'next/link'
import { Component } from 'react'
import Router, { withRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faKey,
  faTv,
  faEye,
  faThLarge,
  faImages,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
import DropdownButton from '../DropdownButton'
import { view } from '@risingstack/react-easy-state'

import { logout } from '../../helpers/auth'
import { display } from '../../stores'
import { getDisplays } from '../../actions/display'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displays: props.displays || []
    }
  }

  componentDidMount() {
    const host = window.location.origin
    getDisplays(host).then(displays => {
      this.setState({ displays })
    })
  }

  navigateToAdmin = id => {
    Router.push('/layout?display=' + id)
    display.setId(id)
  }

  render() {
    const { router, loggedIn } = this.props
    const { displays } = this.state
    const menu = loggedIn
      ? [
          {
            id: 'screen',
            name: 'Screens',
            path: '/screens?display=' + display.id,
            icon: faTv
          },
          {
            id: 'layout',
            name: 'Layout',
            path: '/layout?display=' + display.id,
            icon: faThLarge
          },
          {
            id: 'preview',
            name: 'Preview',
            path: '/preview?display=' + display.id,
            icon: faEye
          },
          {
            id: 'slideshow',
            name: 'Slideshows',
            path: '/slideshows?display=' + display.id,
            icon: faImages
          }
        ]
      : [
          {
            id: 'login',
            name: 'Login',
            path: '/login?display=' + display.id,
            icon: faKey
          }
        ]
    return (
      <div className='sidebar'>
        {loggedIn && (
          <DropdownButton
            onSelect={this.navigateToAdmin}
            choices={displays.map(display => ({
              key: display._id,
              name: display.name
            }))}
            style={{ marginTop: 20, marginBottom: 20 }}
            menuStyle={{ left: 20, top: '70%' }}
          >
            <div className='logo'>
              <div className='icon'>
                <FontAwesomeIcon icon={faTv} fixedWidth color='#7bc043' />
              </div>
              <div className='info'>
                <span className='name'>{display.name}</span>
                <span className='status online'>online</span>
              </div>
              <div className='caret'>
                <FontAwesomeIcon icon={'caret-down'} fixedWidth />
              </div>
            </div>
          </DropdownButton>
        )}
        <ul className='menu'>
          {menu.map(item => (
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
        {loggedIn && (
          <div className='logout' onClick={() => logout()}>
            <a>
              <FontAwesomeIcon icon={faSignOutAlt} fixedWidth />
              <span className={'text'}>{'   Logout'}</span>
            </a>
          </div>
        )}
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
            .menu li .text {
              margin-left: 8px;
            }
            .logo {
              display: flex;
              flex-direction: row;
              padding-right: 10px;
              padding-left: 10px;
              position: relative;
              cursor: pointer;
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
            .logo .caret {
              position: absolute;
              top: 50%;
              margin-top: -8px;
              right: 16px;
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
  }
}

export default withRouter(view(Sidebar))
