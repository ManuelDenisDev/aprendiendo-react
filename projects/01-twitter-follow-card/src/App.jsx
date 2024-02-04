// Styles
import './App.css';
// Components
import { TwitterFollowCard } from './TwitterFollowCard';
// Data
import { users } from './App.data';

export function App() {
	return (
		<section className="App">
			{users.map(({ userName, name, isFollowing, images }) => (
				<TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing} images={images}>
					{name}
				</TwitterFollowCard>
			))}
		</section>
	);
}
