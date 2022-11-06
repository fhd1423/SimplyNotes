import Head from 'next/head'
import Image from 'next/image'
import books from '../public/Blog-cover-10.webp'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div className='relative w-screen h-screen bg-yellow-100 text-2xl font-bold justify-center text-center'>
      <div className='h-fit w-full flex justify-end'>
        <button onClick={() => signIn()} className='m-4 h-18 w-36 bg-black text-yellow-100 hover:bg-yellow-400 hover:text-black p-4 rounded-lg font-semibold'>Sign Up</button>
        <button onClick={() => signIn()} className='m-4 h-18 w-36 bg-black text-yellow-100 hover:bg-yellow-400 hover:text-black p-4 rounded-lg font-semibold'>Login</button>
      </div>
      <div className='font-extrabold text-4xl'> SimplyNotes
      </div>
      <div className='m-10'>
        <div> <span className='text-red-500'> organize</span>,
          <span className='text-green-500'> label</span>,
          and
          <span className='text-blue-500'> track</span>
        </div>
        all of your most important notes in <span className='text-yellow-500'>one</span> place✨
      </div>
      <div className='h-fit w-full flex justify-center'>
        <Image
          alt="Mountains"
          src={books}
          placeholder="blur"
          width={500}
          height={250}
          style={{
            maxWidth: '100%',
            height: 'auto',

          }}
        />
      </div>
      <div className='mt-10'>
        what are you waiting for? sign up using google today!🚀
      </div>

    </div>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  console.log(session)
  if (session) {
    return {
      redirect: {
        destination: '/mynotes'
      }
    }
  }
  return {
    props: { session },
  }
}