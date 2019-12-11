import React, {useEffect, useState} from 'react'
import {Switch} from '../switch'

const Toggle = (props) => {
	const [on, setOn] = useState(false);
	useEffect(() => props.onToggle(on));
	const toggle = () => setOn(!on);

	const getStateAndHelpers = () => {
		return {
			on,
			toggle,
			togglerProps: {
				'aria-expanded': on,
				onClick: toggle
			}
		}
	};
	return (props.children(getStateAndHelpers()));

};

const renderToogle = ({on, togglerProps}) => (
	<div>
		<Switch on={on} {...togglerProps} />
		<hr />
		<button
			aria-label="custom-button"
			{...togglerProps}
			/*onClick={
				(...args) => {
					togglerProps.onClick(...args);
					console.log('clicked')
				}
			}*/
		>
			{on ? 'on' : 'off'}
		</button>
	</div>
);
/*<div>
		<Switch on={on} {...togglerProps}  />
		<hr/>
		<button
			aria-label="custom-button"
			{...togglerProps}
			onClick={(...args) => {
				togglerProps.onClick(...args);
				console.log('clicked!')
			}}
		>
			{on ? 'on' : 'off'}
		</button>
	</div>*/

function Usage({
								 onToggle = (...args) => console.log('onToggle', ...args),
							 }) {
	return (
		<Toggle onToggle={onToggle}>
			{renderToogle}
		</Toggle>
	)
}

Usage.title = 'Prop Collections';

export {Toggle, Usage as default}
