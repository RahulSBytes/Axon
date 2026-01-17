// components/minicomponents/Message.jsx
import { Clipboard, FileText, Volume2, Star, Dot, Ghost, Check } from 'lucide-react';
import { useState } from 'react';
import moment from 'moment';
import MarkdownRenderer from '../minicomponents/MarkdownRenderer';

function Message({ message }) {
  const { message_id, role, content, created_at } = message;
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(message.is_favorite || false);

  // Copy entire message
  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle favorite
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Call API to save favorite
  };

  // USER MESSAGE
  if (role === "user") {
    return (
      <div className="max-w-[70%] bg-zinc-100 rounded-lg p-3 self-end mt-2">
        <div className="flex text-xs items-center font-medium text-zinc-500">
          <span className="text-zinc-800 font-semibold">You</span>
          <Dot />
          {moment(created_at).fromNow()}
        </div>
        <div className="text-zinc-800 mt-1 whitespace-pre-wrap">
          {content}
        </div>
      </div>
    );
  }

  // ASSISTANT MESSAGE
  return (
    <div className="max-w-[70%] rounded-lg p-3 self-start mt-2">
      {/* Header */}
      <div className="flex text-xs items-center font-medium text-zinc-500">
        <span className="text-zinc-800 flex text-base items-center gap-1 font-semibold">
          <Ghost size={16} />
          Axon
        </span>
        <Dot />
        {moment(created_at).fromNow()}
      </div>

      {/* Content with Markdown & Code Highlighting */}
      <div className="text-zinc-800 mt-1">
        <MarkdownRenderer content={content} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Copy message"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
        </button>
        <button
          className="text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Export"
        >
          <FileText size={16} />
        </button>
        <button
          className="text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Read aloud"
        >
          <Volume2 size={16} />
        </button>
        <button
          onClick={handleFavorite}
          className={`transition-colors ${isFavorite ? 'text-amber-500' : 'text-zinc-400 hover:text-amber-500'}`}
          title="Favorite"
        >
          <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}

export default Message;