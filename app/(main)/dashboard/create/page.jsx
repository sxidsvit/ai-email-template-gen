'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from 'lucide-react'
import AIInputBox from '@/components/custom/AIInputBox'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api';
import { useUserDetail } from '@/app/provider'


function Create() {
    const router = useRouter();
    const { userDetail, setUserDetail } = useUserDetail();

    const createEmailTemplate = useMutation(api.emailTemplate.createEmailTemplate)

    const templateId = uuidv4()

    const onCreate = async () => {
        await createEmailTemplate({
            tid: templateId,
            design: [],
            description: 'Handcrafted with editor',
            email: userDetail?.email
        })
        router.push('/editor/' + templateId)
    }



    return (
        <div className='px-10 md:px-28 lg:px-64 xl:px-72 mt-20'>
            <div className='flex items-center flex-col'>
                <h2 className='font-bold text-3xl text-primary'>CREATE NEW EMAIL TEMPLATE</h2>
                <p className='text-lg text-gray-400s'>Effortlessly design and customize professional AI-powered email templates with ease.</p>
                <Tabs defaultValue="AI" className="w-[500px] mt-10">
                    <TabsList>
                        <TabsTrigger value="AI">Create with AI <Sparkles className='h-5 w-5 ml-2' /> </TabsTrigger>
                        <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
                    </TabsList>
                    <TabsContent value="AI">
                        <AIInputBox />
                    </TabsContent>
                    <TabsContent value="SCRATCH">
                        <Button
                            className="mt-10 ml-[75px]"
                            onClick={onCreate} >
                            Create template
                        </Button>
                    </TabsContent>
                </Tabs>

            </div>
        </div >
    )
}

export default Create