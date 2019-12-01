import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const navItems = [
	{link:'/items', title:'Shop'},
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
			<User>
				{({data: {me}}) => {
					console.log(me)
					if(me) return<p>{me.name}</p>
					return null
				}}
			</User>
			{links}
		</NavStyles>

	)
};

export default Nav;