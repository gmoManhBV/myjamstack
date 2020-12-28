import fs from "fs"
import Link from "next/link"
import Layout from "../components/Layout"
import { readContentFiles } from "../lib/content-loader"


import useSWR from 'swr'
import Person from '../components/Person'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home(props) {
  const { posts, hasArchive } = props
  // call api
  const { data, error } = useSWR('/api/people', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <Layout title="ホーム">
      <div>こんにちは</div>
      <div>Welcome to Next.js! GMO!</div>
      {posts.map((post) =>
        <div
          key={post.slug}
          className="post-teaser"
        >
          <h2><Link href="/posts/[id]" as={`/posts/${post.slug}`}><a>{post.title}</a></Link></h2>
          <div><span>{post.published}</span></div>
        </div>)}

        <ul>
          {data.map((p, i) => (
            <Person key={i} person={p} />
          ))}
        </ul>

      <style jsx>{`
        .post-teaser {
          margin-bottom: 2em;
        }
        .post-teaser h2 a {
          text-decoration: none;
        }
        .home-archive {
          margin: 3em;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </Layout>

  )
}

/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
  const MAX_COUNT = 5
  const posts = await readContentFiles({ fs })
  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
    }
  }
}