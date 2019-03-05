import Link from 'next/link'

const Index = props => (
  <div className="home">
    <p>The Digital Signage server is running in the background.</p>
    <Link href="/layout">
      <a className="btn admin">Admin Home</a>
    </Link>
    <Link href="/display">
      <a className="btn home">Display Home</a>
    </Link>
    <style jsx>
      {`
        .home {
          font-family: 'Open Sans', sans-serif;
          padding: 40px;
          max-width: 960px;
          margin: auto;
          text-align: center;
        }
        .home p {
          margin-bottom: 20px;
        }
        .btn {
          background: lightgray;
          padding: 20px;
          text-decoration: none;
          text-transform: uppercase;
          color: white;
          border-radius: 4px;
          margin: 20px;
          display: inline-block;
        }
        .btn.admin {
          background: #03a9f4;
        }
        .btn.home {
          background: #8bc34a;
        }
      `}
    </style>
  </div>
)

export default Index
