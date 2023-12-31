import Head from 'next/head'
import { PostCard, PostWidget, Categories } from '../components'
import { getPosts } from '../services'

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-6 mb-8">
      <Head>
        <title>The J Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {[...posts].reverse().map((post) => (
            <PostCard key={post.cursor} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []; 

  return {
    props: {posts}
  }
}
