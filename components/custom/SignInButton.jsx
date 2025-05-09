"use client"
import React from 'react'
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useUserDetail } from '@/app/provider'
import { revalidatePath } from 'next/cache';

function SignInButton() {

    const CreateUser = useMutation(api.users.CreateUser)
    const router = useRouter();
    const { userDetail, setUserDetail } = useUserDetail();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            const user = userInfo.data;

            //Save to Database
            const result = await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture
            })

            const userDetail = {
                ...user,
                _id: result?._id ?? result
            }

            setUserDetail(userDetail)

            if (typeof window !== undefined) {
                localStorage.setItem('userDetail', JSON.stringify(userDetail));
            }
            router.refresh('/');
            router.push('/');
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div>
            <Button onClick={googleLogin}>Get Started</Button>
        </div>
    )
}

export default SignInButton