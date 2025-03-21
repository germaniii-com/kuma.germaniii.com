import { KEYBOARD_LAYOUTS } from '../../shared/constants/keyboardLayouts';

const Header = () => {
	return (
		<div>
			<h2>
				ku/m-a
				<span>by germaniii.com</span>
			</h2>
			<select>
				{KEYBOARD_LAYOUTS.map((kl) => (
					<option key={kl}>{kl}</option>
				))}
			</select>
		</div>
	);
};

export default Header;
