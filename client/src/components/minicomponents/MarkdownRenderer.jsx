import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';
import { useCopy } from '../../hooks/useCopy.js';



import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';


SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('cs', csharp);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('rb', ruby);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('md', markdown);
SyntaxHighlighter.registerLanguage('markdown', markdown);



export default function MarkdownRenderer({ text }) {

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre({ children }) {
          return <>{children}</>;
        },

        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          const codeString = String(children).replace(/\n$/, '');
          const hasLanguage = Boolean(match);
          const hasNewlines = codeString.includes('\n');
          const isShortCode = codeString.length < 100;
          
          const isInlineCode = inline === true || 
            (!hasLanguage && !hasNewlines && isShortCode);

          if (isInlineCode) {
            return (
              <code
                className="bg-zinc-200 text-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }

          if (hasLanguage) {
            return (
              <CodeBlock language={language} code={codeString} {...props} />
            );
          }

          return (
            <CodeBlock language="text" code={codeString} {...props} />
          );
        },

        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>
        ),

        p: ({ children }) => (
          <p className="my-3 leading-relaxed">{children}</p>
        ),

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

        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-accent pl-4 italic text-zinc-600 my-4">
            {children}
          </blockquote>
        ),

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

        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,

        hr: () => <hr className="my-6 border-zinc-300" />,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function CodeBlock({ language, code, ...props }) {
    const {copied, copyToClipboard} = useCopy()

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
    text: 'Plain Text',
  };

  const displayName = displayNames[language?.toLowerCase()] || language?.toUpperCase() || 'Code';

  return (
    <div className="relative my-4 rounded-lg overflow-hidden border border-zinc-700 max-w-full">
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-400 font-mono">
          {displayName}
        </span>
        <button
          onClick={()=>copyToClipboard(code)}
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
        language={language || 'text'}
        PreTag="div"
        showLineNumbers={code.split('\n').length > 3}
        wrapLongLines={true}
        className="scrollbar-thin"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.875rem',
          padding: '1rem',
          maxWidth: '100%',
        }}
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}