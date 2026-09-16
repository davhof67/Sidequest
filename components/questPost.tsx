type QuestPostProps = {
    id: string;
    title: string;
    published: boolean;
}

export function QuestPost({ id, title, published}: QuestPostProps) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}