import Link from "next/link";
import {QuestPost} from "@/components/questPost";
import {prisma} from "@/lib/prisma";

export default async function Home() {

    const quests = await prisma.quest.findMany();

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold flex align-middle">Welcome to Sidequest</h1>
            <Link href="/quests">View Quests</Link>
            <QuestPost id="1" title="Sample Quest" published={true}/>
            <ul>
                {quests.map((quest) => (
                    <QuestPost key={quest.id} {...quest}/>
                ))}
            </ul>
        </main>
    );
}