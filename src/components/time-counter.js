import React, { Component } from 'react'
import { Text } from 'react-native'

class TimerCountdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer + 1 })),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  reset() {
    clearInterval(this.interval)
    this.setState({ timer: 0 })
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer + 1 })),
      1000
    )
  }

  render() {
    return (
      <Text style={this.props.style}>
        {' '}
        {this.state.timer > this.props.countFrom
          ? 0
          : this.props.countFrom - this.state.timer}{' '}
      </Text>
    )
  }
}

export default TimerCountdown
