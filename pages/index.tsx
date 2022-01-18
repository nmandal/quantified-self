import Page from "../components/Page"
import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

const FeedQuery = gql`
  query FeedQuery {
    feed {
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

const people = [
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  // More people...
]
const activityItems = [
  { id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
  // More items...
]

const Post = ({ post }) => (
  
  <Link href="/p/[id]" as={`/p/${post.id}`}>
    <a>
    <li className="py-4">
      <div className="flex space-x-3">
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">{post.title} by {post.author.name}</h3>
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

const Blog = () => {
  const { loading, error, data } = useQuery(FeedQuery, {
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
      <h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				We have a lot of data.
			</h2>

			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
          We track our workouts, sleep, and meals, but we don't put the data to work.
          It's time to own our data and leverage it to make better decisions for our health.
				</p>
				<br />
			</div>
        <h3>Posts</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {data.feed.map(post => (
            <div>
              <Post post={post} />
            </div>
          ))}
        </ul>
        <div>
      
        {/* {activityItems.map((activityItem) => (
          
        ))}
      </ul> */}
    </div>
      </div>
    </Page>
  )
}

export default Blog
