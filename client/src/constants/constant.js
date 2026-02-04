

  const llms = [
  // "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "meta-llama/llama-4-maverick-17b-128e-instruct",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "qwen/qwen3-32b",
  "openai/gpt-oss-safeguard-20b"
]



const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "jsx", label: "JSX/React" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "bash", label: "Bash" },
];


const langMap = {
        'javascript': 'javascript',
        'python': 'python',
        'jsx': 'jsx',
        'typescript': 'typescript',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c',
        'csharp': 'csharp',
        'php': 'php',
        'ruby': 'ruby',
        'go': 'go',
        'rust': 'rust',
        'swift': 'swift',
        'kotlin': 'kotlin',
        'sql': 'sql',
        'html': 'markup',
        'css': 'css',
        'json': 'json',
        'yaml': 'yaml',
        'bash': 'bash'
      };

export { llms, languages, langMap  };
