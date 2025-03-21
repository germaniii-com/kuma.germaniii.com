import { KEYBOARD_LAYOUTS } from '../../shared/constants/keyboardLayouts';
import './index.css';

const Header = () => {
	return (
		<div class="header">
			<span>Keyboard Utility/Manager-Application</span>
			<select>
				{KEYBOARD_LAYOUTS.map((kl) => (
					<option key={kl}>{kl}</option>
				))}
			</select>
		</div>
	);
};

export default Header;
