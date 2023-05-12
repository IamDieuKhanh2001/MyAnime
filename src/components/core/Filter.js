// @flow
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import PropTypes from 'prop-types'


export default class Filter extends Component {
  applyProps;
  connectNode;
  context;
  props;
  static propTypes = {
    children: PropTypes.node,
    frequency: PropTypes.number,
    gain: PropTypes.number,
    type: PropTypes.oneOf([
      'lowpass',
      'highpass',
      'bandpass',
      'lowshelf',
      'highshelf',
      'peaking',
      'notch',
      'allpass',
    ]),
  };
  static defaultProps = {
    frequency: 2000,
    gain: 0,
    type: 'lowpass',
  };
  static contextTypes = {
    audioContext: PropTypes.object,
    connectNode: PropTypes.object,
  };
  static childContextTypes = {
    audioContext: PropTypes.object,
    connectNode: PropTypes.object,
  };
  constructor(props, context) {
    super(props);

    this.connectNode = context.audioContext.createBiquadFilter();
    this.connectNode.connect(context.connectNode);

    this.applyProps = this.applyProps.bind(this);
  }
  getChildContext() {
    return {
      ...this.context,
      connectNode: this.connectNode,
    };
  }
  componentDidMount() {
    this.applyProps(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.applyProps(nextProps);
  }
  componentWillUnmount() {
    this.connectNode.disconnect();
  }
  applyProps(props) {
    for (const prop in props) {
      if (this.connectNode[prop]) {
        if (typeof this.connectNode[prop] === 'object') {
          this.connectNode[prop].value = props[prop];
        } else {
          this.connectNode[prop] = props[prop];
        }
      }
    }
  }
  render(){
    return <span>{this.props.children}</span>;
  }
}