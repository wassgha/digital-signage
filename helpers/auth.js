import Router from 'next/router'
import axios from 'axios'
import React from 'react'

export const login = ({ username, password }) => {
  return axios.post('/api/v1/user/login', { username, password }).then(res => {
    if (res.data && res.data.success) {
      return Router.push('/layout')
    } else {
      return res.data
    }
  })
}

export const protect = Component =>
  class ProtectedPage extends React.Component {
    static async getInitialProps(ctx) {
      const { req, res } = ctx
      if (req && req.user) {
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
