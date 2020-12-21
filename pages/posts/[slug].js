import fs from "fs"
import path from "path"
import Layout from "../../components/Layout"
import { listContentFiles, readContentFile } from "../../lib/content-loader"

export default function Post(params) {
    return (
        <Layout title={params.title}>
            <div className="post-meta">
                <span>{params.published}</span>
            </div>
            <div className="post-body"
                dangerouslySetInnerHTML={{ __html: params.content }}
            />
        </Layout>
    )
}
/**
 * ページコンポーネントで使用する値を用意する
 */
export async function getStaticProps({ params }) {
    const content = await readContentFile({ fs, slug: params.slug })
    return {
        props: {
            ...content
            // title: content.title,
            // published: content.published,
            // body: content.body,
        }
    }
}
/**
 * 有効な URL パラメータを全件返す
 */
export async function getStaticPaths() {
    const paths = listContentFiles({ fs })
        .map((filename) => ({
            params: {
                slug: path.parse(filename).name,
            }
        }))
    return { paths, fallback: false }
}

// 先ほど作った、ダミー投稿を返す: `listContentFiles()` と `readContentFile()` は削除する

// async function readContentFile({ fs, slug }) {
//     return {
//         title: "タケ物語",
//         published: "2020/12/20",
//         content: "タケ物語の内容",
//     }
// }
// function listContentFiles({ fs }) {
//     return ["take.md"]
// }