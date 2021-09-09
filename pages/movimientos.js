import Head from 'next/head';
import Movimientos from '../components/Movimientos';
import { app, db } from '../firebase/client';

export default function Trade(props) {
    console.log(props)
    return (
        <>
            <Head>
                <title>Movimientos | Crypto</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="px-3 md:px-8 h-auto mt-10">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <Movimientos {...props} />
                    </div>
                </div>
            </div>
        </>
    );
}
export async function getServerSideProps(ctx) {

  
    const rst = await db.collection(ctx.req.cookies.token).doc('movimientos').collection('order').get()
    const docs = rst.docs.map((doc) => ({...doc.data()}))


  
    if (!docs) {
      return {
        props: {}
      }
    }
  
    return {
      props: {
        tradeFb: JSON.stringify(docs),
        userUid: ctx.req.cookies.token,
      }, // will be passed to the page component as props
    }
  }