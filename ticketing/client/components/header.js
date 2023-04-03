import Link from "next/link";

export default ({ currentUser }) => {

	// A trick to render a collection or list of elements
	const links = [
		!currentUser && { label: 'SignUp', href: '/auth/signup' },
		!currentUser && { label: 'SignIn', href: '/auth/signin' },
		currentUser && { label: 'SignOut', href: '/auth/signout' }
	]
		.filter(linkConfig => linkConfig)
		.map(({ label, href }) => {
			return <li key={href} className="nav-item">
				<Link href={href} passHref={true} legacyBehavior={true}>
					<a className="nav-link">{label}</a>
				</Link>
			</li>
		})

	return <nav className="navbar navbar-light bg-light">
		<Link href="/" passHref={true} legacyBehavior={true}>
			<a className="navbar-brand">GitTix</a>
		</Link>

		<div className="d-flex justify-content-end">
			<ul className="nav d-flex align-items-center">
				{links}
			</ul>
		</div>
	</nav>
};