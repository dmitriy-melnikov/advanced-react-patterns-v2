import React, { useState, useEffect } from 'react'
import { Switch } from '../switch'


// 💰 Here's a little utility that might come in handy
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));


const Toggle = (props) => {
  const [on, setOn] = useState(false);
  useEffect(() => props.onToggle(on));
  const toggle = () => setOn(!on);

	const getTogglerProps = ({onClick, ...props}) => ({
		  onClick: callAll(onClick, toggle),
			'aria-pressed': on,
      ...props
		});

  const getStateAndHelpers = () => {
    return {
      on,
      toggle,
      getTogglerProps
    }
  };

  return props.children(getStateAndHelpers())

};


function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => console.log('onButtonClick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, getTogglerProps}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button
            {...getTogglerProps({
              'aria-label': 'custom-button',
              onClick: onButtonClick,
              id: 'custom-button-id',
            })}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Prop Getters';

export {Toggle, Usage as default}
