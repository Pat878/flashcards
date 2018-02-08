var React = require("react");
var HashRouter = require("react-router-dom").HashRouter;
var Route = require("react-router-dom").Route;
var Switch = require("react-router-dom").Switch;
//var PropTypes = require("prop-types");

var Navbar = require("./Navbar");
var Main = require("./Main");
var Footer = require("./Footer");

class Routes extends React.Component {
  render() {
    const IndexRoute = props => {
      return (
        <div>
          <Navbar toggleHeader={this.props.toggleHeader} collapsed={this.props.collapsed}/>
          <Main />
          <Footer />
        </div>
      );
    };

    return (
      <div>
        <HashRouter>
          <div>
            <Switch>
              <Route exact path={"/"} render={IndexRoute} />
              <Route
                render={function() {
                  return <p>Not Found</p>;
                }}
              />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

module.exports = Routes;
