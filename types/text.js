var React = require('react');
var uuid = require('uuid');

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
    if (!this.props.editing) {
      this.setState({
        id: this.props.id,
        name: this.props.name,
        required: this.props.required,
        description: this.props.description
      });
    }
    else {
      this.setState({
        id: uuid.v4()
      });
    }
  },

  answerChanged: function(ev) {
    this.setState({
      answer: ev.target.value
    });
  },

  nameChanged: function(ev) {
    this.setState({
      name: ev.target.value
    })
  },

  descriptionChanged: function(ev) {
    this.setState({
      description: ev.target.value
    })
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
          <input type="text" className="form-control" placeholder="Question name" onChange={this.nameChanged} value={this.state.name}/>
          <input type="text" className="form-control" placeholder="Question description" onChange={this.descriptionChanged} value={this.state.description}/>
        </form>
      );
    }
  }
});

module.exports = TextType;
