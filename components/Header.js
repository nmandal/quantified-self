import Link from "next/link"
import { useRouter } from "next/router"

function isActive(pathname) {
  return (
    typeof document !== "undefined" && document.location.pathname === pathname
  )
}

const Header = () => {
  const router = useRouter()

  function isActive(pathname) {
    return router.pathname === pathname
  }

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Blog
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>Drafts</a>
        </Link>
      </div>
      <div className="right">
        <Link href="/signup">
          <a data-active={isActive("/signup")}>Signup</a>
        </Link>
        <Link href="/create">
          <a data-active={isActive("/create")}>+ Create draft</a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
