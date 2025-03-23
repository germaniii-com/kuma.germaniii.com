import { useEffect, useState } from 'react';
import './index.css';
import { MOVIE_QUOTES } from '../../shared/constants/quotes';

const Screen = () => {
	const [quote] = useState(MOVIE_QUOTES[Math.ceil(Math.random() * 10)]);
	const [key, setKey] = useState('');

	useEffect(() => {
		const eventListener = (kpe) => {
			kpe.preventDefault();
			console.log(kpe.code);
			console.log(kpe.key);

			switch (kpe.key) {
				case 'Backspace':
					setKey((prev) => prev.slice(0, -1));
					return;
				case 'Alt':
				case 'Tab':
				case 'Control':
				case 'Meta':
				case 'Shift':
				case 'Escape':
				case 'Enter':
				case 'CapsLock':
				case 'ArrowLeft':
				case 'ArrowRight':
				case 'ArrowUp':
				case 'ArrowDown':
				case 'Delete':
					// noop
					return;
			}

			setKey((prev) => prev + kpe.key);
		};

		document.addEventListener('keydown', eventListener);

		return () => {
			document.removeEventListener('keydown', eventListener);
		};
	}, []);

	return (
		<div class="base-screen">
			<p>
				{quote.quote.split('').map((c, index) => (
					<>
						<span
							className={
								key.length === index
									? 'cursor'
									: key.length <= index
										? 'pending'
										: c === key[index]
											? 'correct'
											: 'wrong'
							}
						>
							{c}
						</span>
					</>
				))}
			</p>
		</div>
	);
};

export default Screen;
