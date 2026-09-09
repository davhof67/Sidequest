'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const authorEmail = formData.get('email') as string

    if (!title || !authorEmail) {
        throw new Error('Titel und E-Mail sind erforderlich.')
    }

    const user = await prisma.user.upsert({
        where: { email: authorEmail },
        update: {},
        create: { email: authorEmail },
    })

    await prisma.post.create({
        data: {
            title,
            content,
            authorId: user.id,
            published: true,
        },
    })

    revalidatePath('/posts')
}