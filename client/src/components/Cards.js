var React = require("react");
//var PropTypes = require("prop-types");
var Notes = require("./Notes");

const Cards = props => {
  const cards = props.response[props.cardIndex].map(card => {
    const cardText = (
      <div>
        <h1 className="card-text">{card.method}</h1>
        <hr />
        {props.hideAnswer ? "" : card.description}
        <div className="d-flex justify-content-between align-items-center">
          <center>
            <br />
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={props.flipCard}
            >
              {props.hideAnswer ? "Reveal Answer" : "Hide Answer"}
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={props.toggleNotes}
            >
              Notes
            </button>
          </center>
        </div>
      </div>
    );
    return (
      <div className="col-md-4 offset-md-4" key={card.id}>
        <div
          className={
            "card mb-4 box-shadow " + (props.hideAnswer ? "" : "flipped")
          }
        >
          <div className={props.hideAnswer ? "card-body" : "card-body back"}>
            {cardText}
          </div>
        </div>
      </div>
    );
  });

  const navButtons = (
    <div className="col-md-4 offset-md-4" key="{card.id}">
      <center>
        <div className="btn-group" role="group">
          <button
            className="btn btn-outline-secondary"
            onClick={props.previousCard}
          >
            <i className="fa fa-angle-left fa-3x" />
          </button>
          <button className="btn btn-outline-primary" onClick={props.goBack}>
            Home
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={props.nextCard}
          >
            <i className="fa fa-angle-right fa-3x" />
          </button>
        </div>
      </center>
    </div>
  );

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        {" "}
        <div className="row">
          {props.showNotes ? (
            <Notes
              response={props.response}
              cardIndex={props.cardIndex}
              cardId={props.cardId}
              toggleNotes={props.toggleNotes}
            />
          ) : (
            cards[props.cardId]
          )}
          {navButtons}
        </div>
      </div>
    </div>
  );
};

module.exports = Cards;
