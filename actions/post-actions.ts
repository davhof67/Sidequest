'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createQuest(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const authorEmail = formData.get('email') as string

    if (!title || !authorEmail) {
        throw new Error('Titel und E-Mail sind erforderlich.')
    }

    const user = await prisma.user.upsert({
        where: { email: authorEmail },
        update: {},
        create: { email: authorEmail,
            displayName: '',
            passwordHash: '',
        },
    })

    await prisma.quest.create({
        data: {
            title,
            description,
            authorId: user.id,
            published: true,
            maxParicipants: 10,
        },
    })

    revalidatePath('/quest')
}