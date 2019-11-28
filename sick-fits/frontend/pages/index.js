// import React from 'react'; <-- dont need to do this as next.js looks after this
import Items from '../components/Items.js';

const Home = props => (
	<div>
		<Items page={parseFloat(props.query.page) || 1} />
	</div>
)

export default Home 