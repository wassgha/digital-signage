import React from "react";
import Link from "next/link";
import Router from "next/router";
import DropdownButton from "../components/DropdownButton";

import { getDisplays } from "../actions/display";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displays: props.displays || [],
    };
  }

  static async getInitialProps({ req }) {
    const host =
      req && req.headers && req.headers.host
        ? "http://" + req.headers.host
        : window.location.origin;
    try {
      const displayList = await getDisplays(host);
      // If no displays from API, provide a default display
      const displays = displayList && displayList.length > 0 
        ? displayList 
        : [{ _id: 'default', name: 'Default Display' }];
      return { displays, host: host };
    } catch (error) {
      console.error('Error fetching displays:', error);
      // Provide default display if API fails
      return { displays: [{ _id: 'default', name: 'Default Display' }], host: host };
    }
  }

  navigateToDisplay = (id) => {
    Router.push("/display/" + id);
  };

  render() {
    const { displays = [] } = this.state;
    return (
      <div className="home">
        <p>The Digital Signage server is running in the background.</p>
        <div className="btn-group">
          <Link href="/layout" style={{ margin: 20 }}>
            <div className="btn admin">Admin Home</div>
          </Link>
          <div style={{ margin: 20 }}>
            <DropdownButton
              icon="chevron-down"
              text="Display Home"
              style={styles.btn}
              onSelect={this.navigateToDisplay}
              choices={displays.map((display) => ({
                key: display._id,
                name: display.name,
              }))}
            />
          </div>
        </div>
        <style jsx>
          {`
            .home {
              font-family: "Open Sans", sans-serif;
              padding: 40px;
              max-width: 960px;
              margin: auto;
              text-align: center;
            }
            .home p {
              margin-bottom: 20px;
            }
            .btn-group {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
            }
            .btn {
              background: lightgray;
              padding: 20px;
              text-decoration: none;
              text-transform: uppercase;
              color: white;
              border-radius: 4px;
              margin: 20px;
              font-size: 16;
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
    );
  }
}

const styles = {
  btn: {
    padding: 20,
    textDecoration: "none",
    textTransform: "uppercase",
    borderRadius: 4,
    fontSize: 16,
  },
  btnAdmin: {
    background: "#03a9f4",
  },
};

export default Index;
