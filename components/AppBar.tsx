import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [
	{ label: 'Drafts', href: '/drafts' },
  { label: 'Create', href: '/create' },
]

const AppBar = () => {
	const router = useRouter()

	return (
		<div className='pt-safe w-full bg-zinc-900 fixed top-0 left-0'>
			<header className='px-safe bg-zinc-100 border-b dark:bg-zinc-900 dark:border-zinc-800'>
				<div className='mx-auto px-6 max-w-screen-md h-20 flex items-center justify-between'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>Quantified Self</h1>
						</a>
					</Link>

					<nav className='space-x-6 flex items-center'>
						<div className='hidden sm:block'>
							<div className='space-x-6 flex items-center'>
								{links.map(({ label, href }) => (
									<Link key={label} href={href}>
										<a
											className={`text-sm ${
												router.pathname === href
													? 'text-indigo-500 dark:text-indigo-400'
													: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
											}`}
										>
											{label}
										</a>
									</Link>
								))}
							</div>
						</div>

            		<Link href="/sign-in">
						<span
							title=''
							className='inline-block rounded-full overflow-hidden w-8 h-8 bg-zinc-200 dark:bg-zinc-800 bg-cover bg-center rounded-full shadow-inner'>
							<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						</span>
            		</Link>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default AppBar;