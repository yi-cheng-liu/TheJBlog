import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl mb-8">
      <div className="relative overflow-hidden shadow-md 2xl:pb-180 xl:pb-100 pb-60">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-center absolute 2xl:h-180 xl:h-100 h-60 w-full object-cover shadow-lg rounded-t-2xl"
        />
      </div>

      <div className="flex flex-col text-center gap-4 p-4">
        <h1 className="text-2xl lg:text-3xl font-semibold transition duration-700 cursor-pointer hover:text-orange-500">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>

        <div className="flex flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-2">
            <img
              src={post.author.photo.url}
              alt={post.author.name}
              className="rounded-full"
              height="30px"
              width="30px"
            />
            <p className="text-sm lg:text-lg text-gray-800">
              {post.author.name}
            </p>
          </div>

          <div className="font-medium text-gray-700 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm lg:text-base">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>

        <p className="text-sm lg:text-lg text-gray-700">{post.excerpt}</p>

        <div>
          <Link href={`/post/${post.slug}`}>
            <span className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full cursor-pointer transition duration-500 transform hover:translate-y-1.5">
              Continue Reading
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
