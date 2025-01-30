"use client"
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useUserDetail } from '@/app/provider'
import EmailTemplateList from '@/components/custom/EmailTemplateList';
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Dashboard() {

    const { userDetail, setUserDetail } = useUserDetail();
    const createEmailTemplate = useMutation(api.emailTemplate.createEmailTemplate)
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (typeof window !== undefined) {
            setIsClient(true);
        }
    }, []);

    if (!isClient) {
        return null;
    }

    const templateId = uuidv4()

    const onCreate = async () => {
        await createEmailTemplate({
            tid: templateId,
            design: [],
            description: 'Handcrafted template',
            email: userDetail?.email
        })
        router.push('/editor/' + templateId)
    }

    return (
        <div>
            {/* <Header /> */}
            <div className='p-10 md:px-28 lg:px-40 xl:px-56 mt-16'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-3xl'>Hello, {userDetail?.name}</h2>
                    <Link href={'/dashboard/create'}>
                        <Button >+ Create New Email Template</Button>
                    </Link>
                </div>
                <EmailTemplateList />
            </div>
        </div>
    )
}

export default Dashboard