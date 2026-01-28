
import {
  Clipboard,
  Volume2,
  Square,
  Star,
  Dot,
  Ghost,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useTypingEffect } from '../../hooks/useTypingEffect.js';
import MarkdownRenderer from '../minicomponents/MarkdownRenderer';
import axios from 'axios';

function Message({ message, setChats, chatId, onTyping }) {
  const { _id, role, text, createdAt, isSaved, metadata = {}, isNew = null } = message;

  // States
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  // ===========

  const shouldAnimate = role === 'assistant' && isNew === true;
  const displayedText = useTypingEffect(shouldAnimate ? text : null);
  const textToShow = shouldAnimate ? displayedText : text;


  // Call onTyping whenever displayedText changes during animation
  useEffect(() => {
    if (shouldAnimate && displayedText && onTyping) {
      onTyping();
    }
  }, [displayedText, shouldAnimate, onTyping]);

  // ===============


  // Load voices on mount
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter((voice) =>
        voice.lang.startsWith('en')
      );
      setVoices(englishVoices);

      // Set default voice
      if (!selectedVoice && englishVoices.length > 0) {
        const defaultVoice =
          englishVoices.find(
            (v) => v.name.includes('Google') || v.default
          ) || englishVoices[0];
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setShowVoiceMenu(false);
    if (showVoiceMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showVoiceMenu]);

  // Strip markdown for cleaner speech
  const stripMarkdown = (text) => {
    return text
      .replace(/```[\s\S]*?```/g, ' code block ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      .replace(/>\s?/g, '')
      .replace(/---/g, '')
      .replace(/[-*+]\s/g, '')
      .replace(/\d+\.\s/g, '')
      .replace(/\|.*\|/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Copy handler
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleSave(conversationId, messageId, isSaved) {
    try {
      const { data } =
        isSaved
          ? await axios.delete(`${import.meta.env.VITE_API_URL}/api/saved/${messageId}`)
          : await axios.patch(`${import.meta.env.VITE_API_URL}/api/saved`, { conversationId, messageId })
      if (data.success && data.info) {
        setChats(prev => prev.map((message) =>
          message._id === data.info.messageId
            ? { ...message, isSaved: data.info.isSaved }
            : message
        ));
      }
    } catch (error) {
      console.log("error saving message", error);
    }
  };

  // async function handleUnsave(messageId) {
  //   console.log("hahaha handleUnsave:: called")
  //   try {
  //     const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/saved/${messageId}`)
  //     console.log("dutaaa handleUnsave::", data)
  //     if (data.success) {
  //       setChats(prev => prev.map((message) => messageId == data.messageId ? { ...message, isSaved: false } : message))
  //     }
  //   } catch (error) {
  //     console.log("error unsaving message", error);
  //   }
  // };


  const handleReadAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Sorry, your browser does not support text-to-speech.');
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = stripMarkdown(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);

    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };


  // USER MESSAGE
  if (role === 'user') {
    return (
      <div className="max-w-[70%] bg-zinc-100 rounded-lg p-3 self-end mt-2">
        <div className="flex text-xs items-center font-medium text-zinc-500">
          <span className="text-zinc-800 font-semibold">You</span>
          <Dot />
          {moment(
            createdAt).fromNow()}
        </div>
        <div className="text-zinc-800 mt-1 whitespace-pre-wrap">{text}</div>
      </div>
    );
  }

  // ASSISTANT MESSAGE
  return (
    <div className="max-w-[85%] rounded-lg p-3 self-start mt-2">
      {/* Header */}
      <div className="flex text-xs items-center font-medium text-zinc-500">
        <span className="text-zinc-800 flex text-base items-center gap-1 font-semibold">
          <Ghost size={16} />
          Axon
        </span>
        <Dot />
        {moment(
          createdAt).fromNow()}
      </div>

      {/* text */}
      <div className="text-zinc-800 mt-1 ">
        <MarkdownRenderer text={textToShow} />
      </div>

      <div className="flex items-center gap-3 mt-3">
        {/* Copy */}
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Copy message"
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Clipboard size={16} />
          )}
        </button>

        <div className="relative flex items-center">
          <button
            onClick={handleReadAloud}
            className={`transition-colors ${isSpeaking
              ? 'text-blue-500 hover:text-blue-600'
              : 'text-zinc-400 hover:text-zinc-600'
              }`}
            title={isSpeaking ? 'Stop reading' : 'Read aloud'}
          >
            {isSpeaking ? (
              <Square size={16} fill="currentColor" />
            ) : (
              <Volume2 size={16} />
            )}
          </button>

          {/* Voice Selection Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowVoiceMenu(!showVoiceMenu);
            }}
            className="text-zinc-400 hover:text-zinc-600 ml-0.5"
            title="Voice settings"
          >
            <ChevronDown size={12} />
          </button>

          {/* Voice Menu Dropdown */}
          {showVoiceMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-8 left-0 bg-white border border-zinc-200 rounded-lg shadow-lg p-3 min-w-[220px] z-20"
            >
              {/* Speed Control */}
              <div className="mb-3">
                <p className="text-xs text-zinc-500 mb-2">Speed</p>
                <div className="flex gap-1">
                  {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${speechRate === rate
                        ? 'bg-blue-500 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Selection */}
              <div>
                <p className="text-xs text-zinc-500 mb-2">Voice</p>
                <div className="max-h-[150px] overflow-y-auto scrollbar-thin">
                  {voices.length > 0 ? (
                    voices.map((voice) => (
                      <button
                        key={voice.name}
                        onClick={() => {
                          setSelectedVoice(voice);
                          setShowVoiceMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 text-xs rounded transition-colors ${selectedVoice?.name === voice.name
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-zinc-600 hover:bg-zinc-100'
                          }`}
                      >
                        {voice.name
                          .replace('Microsoft ', '')
                          .replace('Google ', '')}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-zinc-400 px-2">
                      No voices available
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>


        <button onClick={() => handleSave(chatId, _id, isSaved)}
          className={`transition-colors ${isSaved ? 'text-amber-500' : 'text-zinc-400 hover:text-amber-500'
            }`}
          title="Save"
        >
          <Star size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}

export default Message;