import Head from 'next/head'
import ChatUI from '../components/ChatUI'

export default function Home(){
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4">
      <Head>
        <title>Next-Gen Chat GPT Search Clone</title>
        <meta name="description" content="A next-generation platform with GPTs integration, identical UI to chat GPT search."/>
      </Head>
      <h1 className="text-2xl font-bold mb-4">次世代 GPT Search クローン</h1>
      <p className="mb-4">ChatGPT Searchと同一の見た目・機能を再現 + GPT統合 + 拡張機能対応(将来) </p>
      <ChatUI/>
    </div>
  )
}
