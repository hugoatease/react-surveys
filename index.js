var React = require('react');
var ReactDOM = require('react-dom');
var types = require('./types');
var example = require('./example.json');
var inArray = require('in-array');
var keys = require('lodash/keys');

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
  },

  render: function() {
    var questions = this.state.questions.map(function(question) {
      if (inArray(keys(types), question.type)) {
        return React.createElement(types[question.type], question);
      }
    }.bind(this));

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
});

module.exports = function(container, props) {
  ReactDOM.render(<Survey {...props} survey={example} />, container);
}
