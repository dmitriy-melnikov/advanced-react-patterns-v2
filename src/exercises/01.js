import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {
    on: false
  };
/*
  onToggle = () => {
    this.setState(({on}) => ({
      on: !on
    }))
  };*/
  toggle = () => {
    this.setState(currentState => {
      return {
        on: !currentState.on
			}
    }, () => {
      this.props.onToggle(this.state.on)
    })
  };

	/*toggle = () => {
		this.setState({on: !this.state.on}/!*,
      () => {
			this.props.onToggle(this.state.on)
		}*!/
		)};*/

  render() {
    const {on} = this.state;
    return(
      <Switch
        on={on}
        onClick={this.toggle}
      />
    )
  }
}


function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle';

export {Toggle, Usage as default}
