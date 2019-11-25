import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const navItems = [
	{link:'/items', title:'Items'},
	{ link: '/sell', title: 'Sell' },
	{ link: '/signup', title: 'Signup' },
	{ link: '/orders', title: 'Orders' },
	{ link: '/account', title: 'My Account' },
];

const Nav = () => {

	const links = navItems.map((item) => (
		<Link href={item.link} key={item.title}>
			<a>{item.title}</a>
		</Link>
	));

	return (
		<NavStyles>
			{links}
		</NavStyles>

	)
};

export default Nav;