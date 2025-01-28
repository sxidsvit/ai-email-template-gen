'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import SignInButton from './SignInButton'
import { useRouter } from 'next/navigation';
import { useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid';

function Hero() {
    const router = useRouter();
    const tid = uuidv4()
    const onCreate = () => { router.push('/editor/' + tid) }
    const { userDetail, setUserDetail } = useUserDetail();


    return (
        <div className='px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center  mt-24 '>
            <h2 className='font-extrabold text-5xl text-center '>
                Email Templates
                <span className='text-primary'> Enhanced with AI </span>
            </h2>

            <p className='text-center mt-4'>Want to wow your clients with AI-driven emails but lack the time to create them yourself?</p>
            <p className='text-center'> Try our AI-powered email templates, complete with AI-generated visuals and text — streamline your email creation process with us.</p>

            <div className='flex gap-5 mt-6'>

                {userDetail?.email ?
                    <Button onClick={onCreate}>
                        Create template
                    </Button> :
                    <SignInButton />
                }
            </div>

            <Image src={'/landing.png'} alt='landing'
                width={1000}
                height={800}
                className='mt-12 rounded-xl'
            />
        </div>
    )
}

export default Hero