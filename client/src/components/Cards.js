var React = require("react");
//var PropTypes = require("prop-types");

const Cards = props => {
  const cards = props.response[0].map(card => {
    return (
      <div className="col-md-4">
        <div className="card mb-4 box-shadow">
          <img
            className="card-img-top"
            data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
            alt="Card image cap"
          />
          <div className="card-body">
            <p className="card-text">{card.method}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group" />
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        {" "}
        <div className="row">{cards}</div>{" "}
      </div>
    </div>
  );
};

module.exports = Cards;
