var React = require('react');
var ReactDOM = require('react-dom');
var Survey = require('./src');
var example = require('./example');

module.exports = function(container, props) {
  ReactDOM.render(<Survey survey={example} {...props} />, container);
}
