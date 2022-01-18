import React, { useState } from "react"
import Page from "../components/Page"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const CreateDraftMutation = gql`
  mutation CreateDraftMutation(
    $title: String!
    $content: String
    $authorEmail: String!
  ) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
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

function Draft(props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")

  const [createDraft, { loading, error, data }] =
    useMutation(CreateDraftMutation)

  return (
    <Page>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            await createDraft({
              variables: {
                title,
                 content,
                authorEmail,
              },
            })
            Router.push("/drafts")
          }}
        >
          <h3 className="leading-6 font-medium text-xl font-semibold text-zinc-800 dark:text-zinc-200">Create</h3>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Title
              </label>
              <div className="mt-1">
                <input
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  value={title}
                  className="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Author
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  type="text"
                  value={authorEmail}
                  className="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="content" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
              </div>
            </div>
            
            </div>
            <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => Router.push("/")}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                disabled={!content || !title || !authorEmail}
                type="submit"
                value="Create"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </Page>
  )
}

export default Draft
