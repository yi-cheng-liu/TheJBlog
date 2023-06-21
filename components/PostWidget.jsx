import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';

import {getRecentPosts, getSimilarPosts} from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug)
      .then((result) => setRelatedPosts(result))
    }
    else {
      getRecentPosts()
        .then((result) => setRelatedPosts(result)
      );
    }
  }, [slug])
  
  console.log(relatedPosts)

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 mb-8">
      <h3 className="text-xl mb-4 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-3">
          {/* image */}
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-lg"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md font-normal hover:text-red-500"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostWidget