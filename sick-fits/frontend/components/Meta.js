import Head from 'next/head';

const Meta = () => (
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		{/* this allows us to have responsive design */}
		<meta charSet="utf-8" />
		{/* utf-8 character encoding that we are using */}
		<link rel="shortcut icon" href="/static/favicon.png" />
		<link rel="stylesheet" type="text/css" href="/static/nprogress.css"/>
		<title>Sick Fits!</title>
	</Head>
)

export default Meta;