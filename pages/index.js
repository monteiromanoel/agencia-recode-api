import Head from 'next/head'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer'
import Content from './content-index/Content'

export default function Home() {
  return (
    <>
      <Head>
        <title>Recode Viagem - API</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      <Content />

      <Footer />
    </>
  )
}
