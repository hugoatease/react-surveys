var React = require('react');
var uuid = require('uuid');
var assign = require('lodash/assign');

var TextType = React.createClass({
  getDefaultProps: function() {
    return {
      editing: false,
      answerCallback: null,
      editCallback: null
    };
  },

  getInitialState: function() {
    return {
      id: null,
      name: null,
      required: false,
      description: null,
      answer: null
    }
  },

  componentDidMount: function() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      required: this.props.required,
      description: this.props.description
    });
  },

  answerChanged: function(ev) {
    this.setState({
      answer: ev.target.value
    });
    this.editAnswer(ev.target.value);
  },

  editUpdate: function(updates) {
    if (this.props.editCallback) {
      this.props.editCallback(assign({
        id: this.state.id,
        name: this.state.name,
        required: this.state.required,
        description: this.state.description
      }, updates))
    }
  },

  editAnswer: function(answer) {
    if (this.props.answerCallback) {
      this.props.answerCallback({
        id: this.state.id,
        answer: answer
      });
    }
  },

  nameChanged: function(ev) {
    this.setState({name: ev.target.value});
    this.editUpdate({name: ev.target.value});
  },

  descriptionChanged: function(ev) {
    this.setState({description: ev.target.value});
    this.editUpdate({description: ev.target.value});
  },

  render: function() {
    if (!this.props.editing) {
      return (
        <div>
          <h3>{this.state.name}</h3>
          <h4>{this.state.description}</h4>
          <textarea className="form-control" rows="3" onChange={this.answerChanged}>{this.state.answer}</textarea>
        </div>
      );
    }
    else {
      return (
        <form>
          <div className="form-group">
            <label>Question name</label>
            <input type="text" className="form-control" placeholder="Question name" onChange={this.nameChanged} value={this.state.name}/>
          </div>
          <div className="form-group">
            <label>Question description</label>
            <input type="text" className="form-control" placeholder="Question description" onChange={this.descriptionChanged} value={this.state.description}/>
          </div>
        </form>
      );
    }
  }
});

module.exports = TextType;
