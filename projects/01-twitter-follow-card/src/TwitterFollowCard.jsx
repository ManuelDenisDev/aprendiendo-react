// Hooks
import { useState } from 'react';

export function TwitterFollowCard({ children, userName = 'unknown', initialIsFollowing, images }) {
	const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

	const text = isFollowing ? 'Siguiendo' : 'Seguir';
	const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';

	const handleClick = () => {
		setIsFollowing(!isFollowing);
	};

	return (
		<article className="tw-followCard-article">
			<header className="tw-followCard-header">
				<img className="tw-followCard-avatar" src={images} alt={`Avatar de ${children}`} />
				<div className="tw-followCard-info">
					{children}
					<span className="tw-followCard-infoUserName">{`@${userName}`}</span>
				</div>
			</header>
			<aside>
				<button className={buttonClassName} onClick={handleClick}>
					<span className="tw-followCard-text">{text}</span>
					<span className="tw-followCard-stopFollow">Dejar de seguir</span>
				</button>
			</aside>
		</article>
	);
}
