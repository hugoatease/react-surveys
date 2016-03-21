var React = require('react');
var ReactDOM = require('react-dom');
var types = require('./types');
var example = require('../example.json');
var inArray = require('in-array');
var keys = require('lodash/keys');
var uuid = require('uuid');
var clone = require('lodash/clone');
var merge = require('lodash/merge');

var Survey = React.createClass({
  getDefaultProps: function() {
    return {
      editing: false
    }
  },

  getInitialState: function() {
    return {
      id: null,
      name: null,
      description: null,
      author: null,
      questions: []
    }
  },

  componentDidMount: function() {
    if (!this.props.editing) {
      this.setState(this.props.survey);
    }
    else {
      this.setState({
        id: uuid.v4()
      });
    }
  },

  nameChanged: function(ev) {
    this.setState({
      name: ev.target.value
    });
  },

  descriptionChanged: function(ev) {
    this.setState({
      description: ev.target.value
    });
  },

  createQuestion: function() {
    var type = ReactDOM.findDOMNode(this.refs.creation_type).value;
    var questions = clone(this.state.questions);
    questions.push({
      id: uuid.v4(),
      name: null,
      description: null,
      required: false,
      type: type
    });
    this.setState({
      questions: questions
    });
  },

  render: function() {
    var questions = this.state.questions.map(function(question) {
      if (inArray(keys(types), question.type)) {
        return React.createElement(types[question.type], merge(question, {
          editing: this.props.editing
        }));
      }
    }.bind(this));

    if (!this.props.editing) {
      return (
        <div>
          <h2>{this.state.name}</h2>
          <h3>{this.state.description}</h3>
          <h4>{this.state.author}</h4>
          <hr />
          {questions}
        </div>
      );
    }
    else {
      return (
        <div>
          <h3>Create survey</h3><hr />
          <div className="row">
            <div className="col-md-9">
              <div className="form-group">
                <label>Survey name</label>
                <input type="text" className="form-control" placeholder="Survey name" value={this.state.name} onChange={this.nameChanged}/>
              </div>
              <div className="form-group">
                <label>Survey description</label>
                <textarea rows="3" onChange={this.descriptionChanged} className="form-control">{this.state.description}</textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="panel panel-primary">
                <div className="panel-heading">Create question</div>
                <div className="panel-body">
                  <select className="form-control" ref="creation_type">
                    {keys(types).map(function(type) {
                      return <option value={type}>{type}</option>;
                    })}
                  </select>
                  <br />
                  <button className="btn btn-primary" onClick={this.createQuestion}>Create question</button>
                </div>
              </div>
            </div>
          </div>
          {questions}
        </div>
      );
    }
  }
});

module.exports = function(container, props) {
  ReactDOM.render(<Survey {...props} editing={true} />, container);
}
