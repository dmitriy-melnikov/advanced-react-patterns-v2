import React, { useState, useEffect } from 'react'
import { Switch } from '../switch'

const Toggle = ({onToggle}) => {
  const [on, setOn] = useState(false);
  useEffect(() => {onToggle(on)})
  const toggle = () => setOn(!on);
  return (
    <Switch on={on} onClick={toggle} />
  )
}

function Usage({
                 onToggle = (...args) => console.log('onToggle', ...args),
               }) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}