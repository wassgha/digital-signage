import Layout from "../components/Layout.js"
import Markdown from "react-markdown"
import React, { Component } from "react"
import fetch from "isomorphic-unfetch"

const mongoose = require("mongoose")

class MongoTest extends Component {
  //eslint-disable-next-line no-console
  //console.log(this.props)
  render() {
    //eslint-disable-next-line no-console
    console.log(this.props)
    return (
      <Layout>
        <p>This is the about page</p>
      </Layout>
    )
  }
}

export default MongoTest
