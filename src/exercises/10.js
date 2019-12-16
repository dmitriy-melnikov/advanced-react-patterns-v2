import React, { useState } from 'react'
import {Switch} from '../switch'

const  Toggle = (props) => {
  const [on, setOn] = useState(false);

  const isControlled = () => {
    return props.on !== undefined
  }
  const getState = () => {
    return {
      on: isControlled() ? props.on : on
    }
  }

  const toggle = () => {
    if (isControlled()) {
      console.log('is controlled', isControlled())
      props.onToggle(!getState().on);
    } else {
      console.log('is not controlled - state in on ')
      setOn(!on);
      () => props.onToggle(getState().on);
    }
  }

  return <Switch on={getState().on} onClick={toggle} />

}

class Usage extends React.Component {
  state = {bothOn: false}
  handleToggle = on => {
    this.setState({bothOn: on})
  }
  render() {
    const {bothOn} = this.state
    const {toggle1Ref, toggle2Ref} = this.props
    return (
      <div>
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle1Ref}
        />
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle2Ref}
        />
      </div>
    )
  }
}
Usage.title = 'Control Props'

export {Toggle, Usage as default}
