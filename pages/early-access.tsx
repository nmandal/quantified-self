import React, { useState } from "react"
import Page from "../components/Page"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const SignupMutation = gql`
  mutation SignupMutation($name: String, $email: String!) {
    signupUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`

function Draft(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [signup] = useMutation(SignupMutation)

  return (
    <Page>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault()
            console.log("submit", name, email)

            await signup({
              variables: {
                name: name,
                email: email,
              },
            })
            Router.push("/")
          }}
        >
          <h3 className="leading-6 font-medium text-xl font-semibold text-zinc-800 dark:text-zinc-200">Sign up for early access</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
              We'll email you when it's ready.
            </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Name
              </label>
              <div className="mt-1">
                <input
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  className="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                  className="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 sm:text-sm border-gray-300 rounded-md"
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
                disabled={!name || !email}
                type="submit"
                value="Create"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </Page>
  )
}

export default Draft
