import { useState, useEffect } from 'react';
import { Download, Sun, Moon } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { langMap, languages } from './constants/constant.js';

function CodeSnippet() {
  const [theme, setTheme] = useState('dark');
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const loadLanguage = async () => {



      const lang = langMap[language];

      if (lang && !Prism.languages[lang]) {
        try {
          await import(`prismjs/components/prism-${lang}`);
        } catch (e) {
          console.log('Language not loaded', lang);
        }
      }

      Prism.highlightAll();
    };

    loadLanguage();
  }, [code, theme, language]);

  const downloadAsImage = async () => {
    const codeElement = document.getElementById('code-preview');
    const headerElement = document.getElementById('code-header');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const padding = 40;
    const headerHeight = 60;
    const lineHeight = 24;

    const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
    const lines = code.split('\n');

    canvas.width = 800;
    canvas.height = headerHeight + (lines.length * lineHeight) + padding * 2;

    ctx.fillStyle = theme === 'dark' ? '#1E1E1E' : '#F5F5F5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = theme === 'dark' ? '#2D2D30' : '#F3F3F3';
    ctx.fillRect(0, 0, canvas.width, headerHeight);

    ctx.fillStyle = theme === 'dark' ? '#CCCCCC' : '#424242';
    ctx.fillRect(padding - 5, 22, 12, 16);
    ctx.fillStyle = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
    ctx.fillRect(padding - 3, 26, 8, 10);

    ctx.fillStyle = theme === 'dark' ? '#CCCCCC' : '#424242';
    ctx.font = '14px -apple-system, sans-serif';
    ctx.fillText('Axon', padding + 15, 33);

    ctx.font = '12px -apple-system, sans-serif';
    ctx.fillStyle = '#858585';
    ctx.fillText('JavaScript', canvas.width - padding - 60, 33);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlightedCode;

    ctx.font = '16px "Fira Code", monospace';

    const colorMap = {
      'keyword': theme === 'dark' ? '#C586C0' : '#AF00DB',
      'function': theme === 'dark' ? '#DCDCAA' : '#795E26',
      'string': theme === 'dark' ? '#CE9178' : '#A31515',
      'comment': theme === 'dark' ? '#6A9955' : '#008000',
      'operator': theme === 'dark' ? '#D4D4D4' : '#000000',
      'punctuation': theme === 'dark' ? '#D4D4D4' : '#000000',
    };

    lines.forEach((line, i) => {
      const y = headerHeight + padding + (i * lineHeight);
      ctx.fillStyle = theme === 'dark' ? '#D4D4D4' : '#000000';

      const tokenizedLine = line.match(/\b\w+\b|[^\w\s]|\s+/g) || [line];
      let x = padding;

      tokenizedLine.forEach(token => {
        let color = theme === 'dark' ? '#D4D4D4' : '#000000';

        if (/^(export|async|function|let|const|await|new|return)$/.test(token)) {
          color = colorMap.keyword;
        } else if (/^".*"|^'.*'/.test(token)) {
          color = colorMap.string;
        } else if (/^[a-zA-Z_][a-zA-Z0-9_]*\(/.test(line.substring(line.indexOf(token)))) {
          color = colorMap.function;
        }

        ctx.fillStyle = color;
        ctx.fillText(token, x, y);
        x += ctx.measureText(token).width;
      });
    });

    const link = document.createElement('a');
    link.download = `code-snippet-${theme}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Code Snippet Downloader</h1>
            <div className="flex gap-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span className="font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
              <button
                onClick={downloadAsImage}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none mb-6"
            placeholder="Paste your code here..."
          />

          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <div id="code-header" className={`${theme === 'dark' ? 'bg-[#2D2D30]' : 'bg-[#F3F3F3]'} px-6 py-4 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'} rounded-sm`}></div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Axon</span>
              </div>
              <span className="text-xs text-gray-500">JavaScript</span>
            </div>
            <div className={`bg-[#D9D9D9] p-6`}>
              {code && <pre id="code-preview" className={`language-${language} !bg-[#191919]`}>
                <code className={`language-${language}`}>{code}</code>
              </pre>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeSnippet