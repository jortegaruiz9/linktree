import { Hashtag } from "@/lib/types";

interface HashtagListProps {
  hashtags: Hashtag[];
  className?: string;
}

export default function HashtagList({ hashtags, className }: HashtagListProps) {
  return (
    <ul className={`gap-2 text-xs grid grid-cols-2 text-center ${className}`}>
      {hashtags.map((hashtag, index) => (
        <li
          key={`${hashtag.name}-${index}`}
          className="bg-white/10 rounded-full py-1"
        >
          #{hashtag.name}
        </li>
      ))}
    </ul>
  );
}
