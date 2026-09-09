import { prisma } from '@/lib/prisma'
import { createPost } from '@/actions/post-actions'

export default async function PostsPage() {
    const posts = await prisma.post.findMany({
        include: { author: true },
        orderBy: { createdAt: 'desc' },
    })

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">Community Board</h1>

            <form action={createPost} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold">Neuen Eintrag erstellen</h2>
                <div>
                    <label className="block text-sm font-medium mb-1">E-Mail</label>
                    <input
                        name="email"
                        type="email"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="max@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Titel</label>
                    <input
                        name="title"
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Titel des Eintrags"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Inhalt</label>
                    <textarea
                        name="content"
                        className="w-full p-2 border rounded"
                        placeholder="Beschreibung..."
                        rows={3}
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Absenden
                </button>
            </form>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Aktuelle Einträge</h2>
                {posts.length === 0 ? (
                    <p className="text-gray-500">Noch keine Einträge vorhanden.</p>
                ) : (
                    posts.map((post) => (
                        <article key={post.id} className="p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-bold">{post.title}</h3>
                            <p className="text-gray-700 mt-1">{post.content}</p>
                            <span className="text-xs text-gray-400 block mt-2">
                Von {post.author.email} am {new Date(post.createdAt).toLocaleDateString()}
              </span>
                        </article>
                    ))
                )}
            </div>
        </main>
    )
}