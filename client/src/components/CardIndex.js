var React = require("react");
//var PropTypes = require("prop-types");

const CardIndex = props => {
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img
                className="card-img-top"
                data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail"
                alt="Card image cap"
              />
              <div className="card-body">
                <p className="card-text">{props.startingCards}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={props.showCardsRoute}
                    >
                      View
                    </button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = CardIndex;