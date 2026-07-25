import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Icon } from './Icon';

type CodeBlockProps = {
  code: string;
  language?: string;
  label?: string;
};

export function CodeBlock({ code, language = 'text', label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <figure className="ds-code">
      <figcaption className="ds-code-header">
        <span>{label || language}</span>
        <button className="ds-code-copy" type="button" onClick={copyCode} aria-label={copied ? 'Code copied' : 'Copy code'}>
          <Icon icon={copied ? Check : Copy} size={14} />
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </figcaption>
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </figure>
  );
}
