// components/MarkdownRenderer.jsx
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function MarkdownRenderer({ text }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Code blocks & inline code
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          const codeString = String(children).replace(/\n$/, '');

          // Inline code
          if (inline) {
            return (
              <code
                className="bg-zinc-200 text-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }

          // Code block with syntax highlighting
          if (match) {
            return (
              <CodeBlock language={language} code={codeString} {...props} />
            );
          }

          // Code block without language
          return (
            <code className="block bg-zinc-800 text-zinc-100 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto">
              {children}
            </code>
          );
        },

        // Headings
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
        ),

        // Paragraph
        p: ({ children }) => (
          <p className="my-3 leading-relaxed">{children}</p>
        ),

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc list-inside my-3 space-y-1 ml-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside my-3 space-y-1 ml-4">
            {children}
          </ol>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {children}
          </a>
        ),

        // Blockquote
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-4 italic text-zinc-600 my-4">
            {children}
          </blockquote>
        ),

        // Table
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-zinc-300 rounded-lg">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-100">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border border-zinc-300 px-4 py-2 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-zinc-300 px-4 py-2">{children}</td>
        ),

        // Bold & Italic
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,

        // Horizontal Rule
        hr: () => <hr className="my-6 border-zinc-300" />,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

// Separate CodeBlock component with copy functionality
function CodeBlock({ language, code, ...props }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Language display names
  const displayNames = {
    js: 'JavaScript',
    javascript: 'JavaScript',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    jsx: 'React JSX',
    tsx: 'React TSX',
    py: 'Python',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    csharp: 'C#',
    cs: 'C#',
    go: 'Go',
    rust: 'Rust',
    rb: 'Ruby',
    ruby: 'Ruby',
    php: 'PHP',
    swift: 'Swift',
    kotlin: 'Kotlin',
    sql: 'SQL',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    bash: 'Bash',
    sh: 'Shell',
    shell: 'Shell',
    md: 'Markdown',
    markdown: 'Markdown',
  };

  const displayName = displayNames[language.toLowerCase()] || language.toUpperCase();

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-zinc-700">
      {/* Header */}
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-400 font-mono">
          {displayName}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        showLineNumbers={code.split('\n').length > 3}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.875rem',
          padding: '1rem',
        }}
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}