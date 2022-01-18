import Page from "../../components/Page"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/client"

const PostQuery = gql`
  query PostQuery($postId: String!) {
    post(postId: $postId) {
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

const PublishMutation = gql`
  mutation PublishMutation($postId: String!) {
    publish(postId: $postId) {
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

const DeleteMutation = gql`
  mutation DeleteMutation($postId: String!) {
    deletePost(postId: $postId) {
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

function Post() {
  const postId = useRouter().query.id
  const { loading, error, data } = useQuery(PostQuery, {
    variables: { postId },
  })

  const [publish] = useMutation(PublishMutation)
  const [deletePost] = useMutation(DeleteMutation)

  if (loading) {
    console.log("loading")
    return <Page>Loading ...</Page>
  }
  if (error) {
    console.log("error")
    return <div>Error: {error.message}</div>
  }

  console.log(`response`, data)

  let title = data.post.title
  if (!data.post.published) {
    title = `${title} (Draft)`
  }

  const authorName = data.post.author ? data.post.author.name : "Unknown author"
  return (
    <Page>
      <div>
        <h2>{title}</h2>
        <p>By {authorName}</p>
        <p>{data.post.content}</p>
        {!data.post.published && (
          <button
            onClick={async e => {
              await publish({
                variables: {
                  postId,
                },
              })
              Router.push("/")
            }}
          >
            Publish
          </button>
        )}
        <button
          onClick={async e => {
            await deletePost({
              variables: {
                postId,
              },
            })
            Router.push("/")
          }}
        >
          Delete
        </button>
      </div>
    </Page>
  )
}

export default Post
