import React, { Component } from 'react'
import { Text } from 'react-native'

class TimerCountdown extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Text style={this.props.style}> {this.props.timer} </Text>
  }
}

export default TimerCountdown
