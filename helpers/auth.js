import Router from 'next/router'
import axios from 'axios'
import React from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const login = ({ username, password }, host = '') => {
  return axios.post(host + '/api/v1/user/login', { username, password }).then(res => {
    if (res && res.data && res.data.success) {
      Router.push('/layout')
      window.location.href = '/layout'
    }
    return res.data
  })
}

export const logout = (host = '') => {
  return axios.get(host + '/api/v1/user/logout').then(res => {
    if (res && res.data) {
      destroyCookie({}, 'loggedIn')
      Router.push('/login')
      window.location.href = '/login'
    }
    return res.data
  })
}

export const protect = Component =>
  class ProtectedPage extends React.Component {
    static async getInitialProps(ctx) {
      const { req, res } = ctx
      const alreadyLoggedIn = parseCookies(ctx).loggedIn
      if ((req && req.user) || alreadyLoggedIn) {
        if (!alreadyLoggedIn) {
          setCookie(ctx, 'loggedIn', true, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          })
        }
        const props = Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}
        return {
          ...props,
          loggedIn: true
        }
      } else {
        if (req) {
          res.writeHead(302, { Location: '/login' })
          res.end()
        } else {
          Router.push('/login')
        }
        return {}
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
