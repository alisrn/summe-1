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

  componentDidUpdate() {
    if (this.state.timer === 100) {
      console.log('-------------------timer count down is leaking')
      clearInterval(this.interval)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <Text style={this.props.style}> {this.state.timer} </Text>
  }
}

export default TimerCountdown
