/**
 * Minimal formatting for console-written articles: blank line = paragraph, "## "/"### " = headings,
 * lines starting "- " = bullet list. Text renders as plain React text, so no HTML can be injected.
 */
export function Markdown({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
      {blocks.map((b, n) => {
        if (b.startsWith('### ')) return <h3 key={n} className="mt-4 text-2xl font-medium text-cream">{b.slice(4)}</h3>;
        if (b.startsWith('## ')) return <h2 key={n} className="mt-6 text-3xl font-light text-cream">{b.slice(3)}</h2>;
        const lines = b.split('\n');
        if (lines.every((l) => l.trim().startsWith('- '))) {
          return (
            <ul key={n} className="flex flex-col gap-2">
              {lines.map((l, i) => (
                <li key={i} className="flex gap-3"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-accent" />{l.trim().slice(2)}</li>
              ))}
            </ul>
          );
        }
        return <p key={n} className="whitespace-pre-line">{b}</p>;
      })}
    </div>
  );
}
