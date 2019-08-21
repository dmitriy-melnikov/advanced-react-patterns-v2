import React, { Fragment, cloneElement, Children, Component } from 'react'
import {Switch} from '../switch'

class Toggle extends Component {

	static On = (props) => props.on ? props.children : null;
	static Off = (props) => !props.on ? props.children : null;
	static Button = ({on, toggle}) => <Switch on={on} onClick={toggle}/>;

	state = {on: false};
	toggle = () =>
		this.setState(
			({on}) => ({on: !on}),
			() => this.props.onToggle(this.state.on),
		);

	render() {
		/*const {on} = this.state;
		return (
      <Fragment>
        <Toggle.On on={on} >The button is on</Toggle.On>
        <Toggle.Off on={on} >The button is off</Toggle.Off>
        <Toggle.Button on={on} toggle={this.toggle}/>
      </Fragment>
		  )*/

		// To do this, you can use:
		// 1. React.Children.map: https://reactjs.org/docs/react-api.html#reactchildrenmap
		// 2. React.cloneElement: https://reactjs.org/docs/react-api.html#cloneelement

		console.log(this.props.children);
		console.log(Children);
		return Children.map(this.props.children, (childElement => {
				return cloneElement(childElement, {
					on: this.state.on,
					toggle: this.toggle
				})
			})
		)
	}
}

// 💯 Support rendering non-Toggle components within Toggle without incurring warnings in the console.
// for example, try to render a <span>Hello</span> inside <Toggle />

function Usage({
								 onToggle = (...args) => console.log('onToggle', ...args),
							 }) {
	return (
		<Toggle onToggle={onToggle}>
			<Toggle.On>The button is on</Toggle.On>
			<Toggle.Off>The button is off</Toggle.Off>
			<Toggle.Button/>
		</Toggle>
	)
}

Usage.title = 'Compound Components';

export {Toggle, Usage as default}
