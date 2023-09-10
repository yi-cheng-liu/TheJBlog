import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { getPosts, getPostDetails } from '../../services'

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Loader
} from '../../components'

const PostDetails = ({ post }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }

  useEffect(() => {
    document.title = post.title
  }, [])

  return (
    <div className="container mx-auto px-6 mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <PostWidget
            slug={post.slug}
            categories={post.categories.map((category) => category.slug)}
          />
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default PostDetails

// Runs at Build time to pre-render page
export async function getStaticPaths({ params }) {
  const posts = await getPosts()

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)

  return {
    props: { post: data }
  }
}

