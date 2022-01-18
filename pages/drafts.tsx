import Page from "../components/Page"
import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`

const Post = ({ post }) => (
  
  <Link href="/p/[id]" as={`/p/${post.id}`}>
    <a>
    <li className="py-4">
      <div className="flex space-x-3">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{post.title} by {post.author ? post.author.name : "Unknown Author"}</h3>
          </div>
          <p className="text-sm text-gray-500">
            {post.content}
          </p>
        </div>
      </div>
    </li>
    </a>    
  </Link>
)

const Drafts = () => {
  const { loading, error, data } = useQuery(DraftsQuery, {
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <Page>Loading ...</Page>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Page>
      <div>
      <h3 className="leading-6 font-medium text-xl font-semibold text-zinc-800 dark:text-zinc-200">Drafts</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {data.drafts.map(post => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))}
        </ul>
      </div>
    </Page>
  )
}

export default Drafts
