var React = require("react");
//var PropTypes = require("prop-types");

const Main = props => {
  return (
    <main role="main">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Flashcards</h1>
          <p className="lead text-muted">
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don't simply skip over it entirely.
          </p>
          <p />
        </div>
      </section>
    </main>
  );
};

module.exports = Main;
