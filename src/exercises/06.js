import React from 'react'
import {Switch} from '../switch'


// 💰 Here's a little utility that might come in handy
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));


class Toggle extends React.Component {
  state = {on: false};
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    );

	getTogglerProps = ({onClick, ...props}) => ({
		  onClick: callAll(onClick, this.toggle),
			'aria-pressed': this.state.on,
      ...props
		});

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      getTogglerProps: this.getTogglerProps
    }
  }


  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}


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
