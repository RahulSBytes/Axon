import { Plus } from 'lucide-react';

const NewChatButton = ({ onClick, className = "" }) => {
  const circles = [
    "-translate-x-[3.3em] -translate-y-[4em]",
    "-translate-x-[6em] translate-y-[1.3em]",
    "-translate-x-[0.2em] translate-y-[1.8em]",
    "translate-x-[3.5em] translate-y-[1.4em]",
    "translate-x-[3.5em] -translate-y-[3.8em]",
  ];

  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        flex
        gap-2
        items-center
        justify-center
        w-full
        py-2
        px-3
        bg-zinc-50
        text-zinc-800
        font-semibold
        border
        border-zinc-400
        rounded-full
        cursor-pointer
        overflow-hidden
        hover:text-white
        transition-colors
        duration-500
        ${className}
      `}
    >
      {/* Animated Black Circles */}
      {circles.map((position, index) => (
        <span
          key={index}
          className={`
            absolute 
            left-1/2 
            top-1/2 
            h-8 
            w-8 
            ${position}
            rounded-full 
            bg-zinc-700
            transition-all 
            duration-[1s] 
            ease-out 
            group-hover:scale-[4] 
            group-hover:-translate-x-1/2 
            group-hover:-translate-y-1/2
          `}
          style={{ transitionDelay: `${index * 30}ms` }}
        />
      ))}

      {/* Button Content */}
      <Plus size={20} className="relative z-10" />
      <span className="relative z-10">New Chat</span>
    </button>
  );
};

export default NewChatButton;