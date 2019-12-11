import React, {useEffect, useState} from 'react'
import {Switch} from '../switch'

const Toggle = (props) => {
  const [on, setOn] = useState(false);
  useEffect(() => props.onToggle(on));
  const toggle = () => setOn(!on);
  return (
  this.props.render({on, toggle})
  )
}


const OriginalToggle = (props) => {
  return (
    <Toggle {...props}>
      {({on, toggle}) => <Switch on={on} onClick={toggle} />}
    </Toggle>
  )
};

const ToggleChild = ({on, toggle}) => (
  <div>
		{on ? 'The button is on' : 'The button is off'}
    <Switch on={on} onClick={toggle} />
    <hr />
    <button aria-label="custom-button" onClick={toggle}>
			{on ? 'on' : 'off'}
    </button>
  </div>
);

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <div>
      {/*<OriginalToggle onToggle={onToggle}/>*/}
			{/*<Toggle onToggle={onToggle}>
        {props => <ToggleChild {...props} />}
    </Toggle>*/}
      <Toggle onToggle={onToggle}  render={props => <ToggleChild {...props} />} />
    </div>

  )
}
Usage.title = 'Render Props';

export {Toggle, Usage as default}
