import Head from 'next/head'
import AppBar from './AppBar'
import BottomNav from './BottomNav'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => (
	<>
		{title ? (
			<Head>
				<title>Quantified Self | {title}</title>
			</Head>
		) : null}

		<AppBar />

		<main
			className='mx-auto px-safe pt-20 pb-16 sm:pb-0 max-w-screen-md'
		>
			<div className='p-6'>{children}</div>
		</main>

		<BottomNav />
	</>
)

export default Page