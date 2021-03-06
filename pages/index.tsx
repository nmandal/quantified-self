import Page from "../components/Page"
import Link from "next/link"
import gql from "graphql-tag"
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import Router, { useRouter } from "next/router"


const Home = () => {
  return (
    <Page>
      <div>
      <h2 className='text-xl font-semibold text-zinc-800 dark:text-zinc-200'>
				We have a lot of data.
			</h2>

			<div className='mt-2'>
				<p className='text-zinc-600 dark:text-zinc-400'>
          We track our workouts, sleep, and meals, but we don't put the data to work.
          It's time to own our data and use it to make better decisions for our health.
				</p>
				<br />
        <p className='text-zinc-600 dark:text-zinc-400'>
          Quantified Self leverages data aggregators such as {' '}
          <a href='https://www.apple.com/ios/health/' className='underline'>Apple Health</a>,{' '}
          <a href='https://ouraring.com' className='underline'>Oura</a>, and {' '}
          <a href='https://www.levelshealth.com' className='underline'>Levels</a> {' '}
          to paint a more holistic picture of your healthspan.
				</p>
        <br />
        <p className='text-zinc-600 dark:text-zinc-400'>
          Read more about how we're thinking about health and longevity <a href='https://www.nickmandal.com/writing/health-framework' className='underline'>here</a>.
        </p>
			</div>

      <br />

      <div>
        <div className="max-w-2xl mx-auto text-center ">
        <Link href="/early-access">
          <a
            className="mt-2 w-full inline-flex items-center justify-center px-5 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
          >
            Get early access
          </a>
          </Link>
        </div>
      </div>

      </div>
    </Page>
  )
}

export default Home
