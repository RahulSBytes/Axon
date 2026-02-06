const MiniLoader = ({ className = "" }) => {
  return (
    <div className={`flex items-center flex-1 justify-center  h-full ${className}`}>
      {/* Responsive container */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 m-auto relative">
        
        {/* Shadow */}
        <div 
          className="
            absolute 
            w-8 sm:w-10 md:w-12 
            h-1 sm:h-1.5 
            bg-neutral-300 
            top-10 sm:top-12 md:top-14 
            left-0 
            rounded-full 
            animate-[shadow_0.5s_linear_infinite]
          " 
        />
        
        {/* Box */}
        <div 
          className="
            absolute 
            w-full 
            h-full 
            bg-zinc-400 
            top-0 
            left-0 
            rounded 
            animate-[jump_0.5s_linear_infinite]
          " 
        />
      </div>

      <style>{`
        @keyframes jump {
          15% {
            border-bottom-right-radius: 3px;
          }
          25% {
            transform: translateY(9px) rotate(22.5deg);
          }
          50% {
            transform: translateY(18px) scale(1, 0.9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% {
            transform: translateY(9px) rotate(67.5deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }

        @keyframes shadow {
          0%, 100% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1.2, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default MiniLoader;