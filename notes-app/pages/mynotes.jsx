import Head from 'next/head'
import Image from 'next/image'
import books from '../public/Blog-cover-10.webp'
import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'

export default function Home({ NoteNames }) {
    const [noteName, setNoteName] = React.useState('')
    const [noteText, setNoteText] = React.useState('')
    const handleName = (event) => {
        setNoteName(event.target.value);
    };

    const handleText = (event) => {
        setNoteText(event.target.value);
    };

    const buttonClicked = async (name) => {
        const session = await getSession()
        console.log('clicked', name)
        /*
        await axios.post('http://localhost:8080/api', {
            noteName: noteName,
            noteAuthor: session.user.email
        }
        )
        */
    }

    async function submitNote() {
        const session = await getSession()
        console.log('clicked')
        console.log(noteName)
        console.log(noteText)
        await axios.post('http://localhost:8080/api', {
            noteName: noteName,
            noteText: noteText,
            noteAuthor: session.user.email
        }
        )

        Router.reload(window.location.pathname)
    }

    return (
        <div className='relative w-mscreen h-screen bg-yellow-100 text-2xl font-bold justify-center'>
            <div className='h-fit w-full flex justify-end'>
                <button onClick={() => signOut()} className='m-4 h-18 w-36 bg-black text-yellow-100 hover:bg-yellow-400 hover:text-black p-4 rounded-lg font-semibold'>Sign Out</button>
            </div>
            <div className='h-fit w-full flex justify-center'>
                <button onClick={() => submitNote()} className='m-4 text-center border-black border-2 rounded-lg p-4 bg-orange-400'>
                    Save New Note
                </button>
            </div>
            <div className='grid grid-flow-col'>
                <div className='border-box h-[550px] w-48 lg:w-64 rounded-2xl border-black border-4 p-8 ml-5'>
                    My Notes
                    <div>
                        <div className='text-yellow-100'> blank</div>
                        {/*
                            NoteNames.map(name => <div key={name}> <button onClick={() => buttonClicked(name)} className='border-b-2 border-black'> {name} </button></div>)
    */}
                    </div>
                </div>
                <div className='border-box  h-[550px] w-[400px] lg:h-[550px] lg:w-[1000px] rounded-2xl border-black border-4 p-8 mr-10'>
                    <span className='text-sm'> Note Title: <input onChange={handleName} placeholder='My New Note Name...' className='p-3 border-black rounded-xl bg-white' /> </span>
                    <div className='mt-2 text-sm'> <textarea onChange={handleText} placeholder='I like to take notes in SimplyNote because...' className=' w-[330px] lg:w-[920px] h-[420px] border-black rounded-xl bg-white' /> </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    let oldNotes = await axios.post('http://localhost:8080/username', {
        username: session.user.email
    })
    console.log('oldNOtes', oldNotes.data)
    let NoteNames = oldNotes.data.message
    console.log(session)
    if (!session) {
        return {
            redirect: {
                destination: '/'
            }
        }
    }
    return {
        props: { session, NoteNames },

    }
}