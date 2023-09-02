import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-0 lg:p-6 lg:pb-6 pb-6 mb-8">
      <div className="relative overflow-hidden shadow-md lg:pb-80 pb-40 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-center absolute lg:h-80 h-40 w-full object-cover shadow-lg rounded-t-2xl lg:rounded-2xl"
        />
      </div>

      {/* title */}
      <h1
        className="transition duration-700 text-center mb-4 cursor-pointer
      hover:text-orange-500 lg:text-3xl text-2xl font-semibold px-2"
      >
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>

      <div className="block lg:flex text-center items-center justify-center lg:mb-4 mb-2 w-full gap-6">
        {/* author */}
        <div className="flex items-center justify-center mb-2 lg:mb-0 w-full lg:w-auto ">
          <img
            src={post.author.photo.url}
            alt={post.author.name}
            className="align-middle rounded-full"
            height="30px"
            width="30px"
          />
          <p className="inline align-middle ml-2 text-gray-800 lg:text-lg text-sm">
            {post.author.name}
          </p>
        </div>

        {/* date */}
        <div className="font-medium text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline text-blue-600"
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
          <span className="align-middle ml-2 lg:text-base text-sm">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>

      <p className="text-center lg:text-lg text-sm text-gray-700 font-normal px-4 lg:px-8 mb-4">
        {post.excerpt}
      </p>

      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:translate-y-1.5 inline-block bg-orange-500 font-normal rounded-full text-white px-6 py-2 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );};

export default PostCard;