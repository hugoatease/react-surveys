var React = require('react');
var uuid = require('uuid');

var RadioType = React.createClass({
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
      answer: null,
      options: []
    }
  },

  componentDidMount: function() {
    if (!this.props.editing) {
      this.setState({
        id: this.props.id,
        name: this.props.name,
        required: this.props.required,
        description: this.props.description,
        options: this.props.options
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

  selected: function(option_id) {
    this.setState({
      answer: option_id
    });
  },

  isChecked: function(option_id) {
    return this.state.answer === option_id;
  },

  render: function() {
    if (!this.props.editing) {
      var options = this.state.options.map(function(option) {
        return (
          <label className="radio-inline">
            <input type="radio" onClick={this.selected.bind(this, option.id)} checked={this.isChecked(option.id)}/>{option.name}
          </label>
        )
      }.bind(this));

      return (
        <div>
          <h3>{this.state.name}</h3>
          <h4>{this.state.description}</h4>
          {options}
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

module.exports = RadioType;
