
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface LatexRendererProps {
  content: string;
  inline?: boolean;
}

export const LatexRenderer = ({ content, inline = true }: LatexRendererProps) => {
  // Regular expression to find LaTeX expressions between $$ or $
  const latexRegex = inline ? /\$(.*?)\$/g : /\$\$(.*?)\$\$/g;
  
  // If no LaTeX expressions are found, return the content as is
  if (!content.match(latexRegex)) {
    return <span>{content}</span>;
  }

  // Split content into parts and render LaTeX where needed
  const parts = [];
  const matches = [];
  let lastIndex = 0;
  let match;
  
  // Use a while loop to properly split the content with regex
  const regex = inline ? /\$(.*?)\$/g : /\$\$(.*?)\$\$/g;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.substring(lastIndex, match.index));
    }
    matches.push(match[1]);
    parts.push(null); // Placeholder for LaTeX content
    lastIndex = match.index + match[0].length;
  }
  
  // Add any remaining text after the last match
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return (
    <span className="katex-container">
      {parts.map((part, index) => {
        // If it's text content
        if (part !== null) {
          return <span key={index}>{part}</span>;
        }
        // If it's LaTeX content
        const latexIndex = Math.floor(index / 2);
        return inline ? (
          <InlineMath key={index} math={matches[latexIndex] || ''} />
        ) : (
          <BlockMath key={index} math={matches[latexIndex] || ''} />
        );
      })}
    </span>
  );
};