import Layout from '../components/Layout.js'
import Markdown from 'react-markdown'
import fetch from 'isomorphic-unfetch'

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <div className="markdown">
      <Markdown source={props.show.summary.replace(/<[/]?[p|b|i]>/g, '')} />
    </div>
    <img src={props.show.image.medium} />
  </Layout>
)

Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
