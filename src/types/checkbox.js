var React = require('react');
var uuid = require('uuid');
var inArray = require('in-array');
var clone = require('lodash/clone');
var without = require('lodash/without');
var OptionEditor = require('../OptionEditor');
var reject = require('lodash/reject');

var CheckboxType = React.createClass({
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
      answers: [],
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
    return inArray(this.state.answers, option_id);
  },

  selected: function(option_id) {
    if (!inArray(this.state.answers, option_id)) {
      var answers = clone(this.state.answers);
      answers.push(option_id);
      this.setState({answers: answers});
    }
    else {
      var answers = without(this.state.answers, option_id);
      this.setState({answers: answers});
    }
  },

  addOption: function(option_name) {
    var options = clone(this.state.options);
    options.push({
      id: uuid.v4(),
      name: option_name
    });
    this.setState({options: options});
  },

  removeOption: function(option_id) {
    var options = reject(this.state.options, function(option) {
      return option.id === option_id;
    });
    this.setState({options: options});
  },

  render: function() {
    if (!this.props.editing) {
      var options = this.state.options.map(function(option) {
        return (
          <label className="checkbox-inline">
            <input type="checkbox" onClick={this.selected.bind(this, option.id)} checked={this.isChecked(option.id)}/>{option.name}
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
        <div>
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

          <OptionEditor options={this.state.options} addCallback={this.addOption} removeCallback={this.removeOption} />
        </div>
      );
    }
  }
});

module.exports = CheckboxType;
