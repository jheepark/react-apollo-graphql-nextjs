import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';

const navItems = [
  { link: "/items", title: "Shop", autoShow: true },
  { link: "/sell", title: "Sell", autoShow: false },
  { link: "/orders", title: "Orders", autoShow: false },
  { link: "/account", title: "My Account", autoShow: false },
	{ link: "/signup", title: "SignIn", autoShow: true }
];

const Nav = () => {

	const links = isSignIn => (
		navItems.map(item => {
			if(!isSignIn) {
				if(!!item.autoShow) {
					return (
						<Link href={item.link} key={item.title}>
							<a>{item.title}</a>
						</Link>
					)
				}
				return null;
			}
			return (
				<Link href={item.link} key={item.title}>
					<a>{item.title}</a>
				</Link>
			)
		}));

	return (
		<User>
			{({data: {me}}) => (
				<NavStyles>
					{links(me)}
					{me && <Signout />}
				</NavStyles>
			)}
			</User>

	)
};

export default Nav;