import { compile } from '@tailwindcss/node';
import { Scanner } from '@tailwindcss/oxide';
import fs from 'fs';
import path from 'path';

async function build() {
  const root = process.cwd();
  console.log('Building Tailwind CSS from:', root);

  const scanner = new Scanner({
    sources: [
      { base: path.join(root, 'src'), pattern: '**/*.{ts,tsx,js,jsx,html}', negated: false }
    ]
  });

  const candidates = scanner.scan();
  console.log(`Scanned ${candidates.length} candidates from src`);

  // Explicitly ensure critical client design classes are included
  const essentialCandidates = [
    'max-w-[1480px]',
    'w-[54%]',
    'w-[55%]',
    'w-[56%]',
    'w-[58%]',
    'w-[60%]',
    'leading-[1.35]',
    'text-[#5a8ea7]',
    'text-[#38bdf8]',
    'text-[#93c5fd]',
    'bg-[#989288]/85',
    'bg-[#34373d]/95',
    'bg-[#161a22]',
    'border-b-4',
    'border-2',
    'object-cover',
    'object-right',
    'object-left',
    'object-contain',
    'aspect-video',
    'aspect-4/3',
    'backdrop-blur-md',
    'backdrop-blur-sm'
  ];

  for (const c of essentialCandidates) {
    if (!candidates.includes(c)) {
      candidates.push(c);
    }
  }

  const cssTemplate = `@import "tailwindcss";`;
  const compiler = await compile(cssTemplate, {
    from: path.join(root, 'src/app/globals.css'),
    base: root,
    onDependency: () => {}
  });

  const compiled = compiler.build(candidates);

  // Append our custom global overrides (custom scrollbar and hero stroke text)
  const customOverrides = `
/* Custom Styles */
.hero-stroke-text {
  color: transparent;
  -webkit-text-stroke: 2px #ffffff;
  text-stroke: 2px #ffffff;
}

@supports not (-webkit-text-stroke: 1px white) {
  .hero-stroke-text {
    color: #ffffff;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
`;

  const finalCss = compiled + '\n' + customOverrides;
  const outPath = path.join(root, 'src/app/globals.css');
  fs.writeFileSync(outPath, finalCss, 'utf8');
  console.log(`Successfully generated production Tailwind CSS (${finalCss.length} bytes) to ${outPath}`);
}

build().catch(err => {
  console.error('Build Tailwind failed:', err);
  process.exit(1);
});
