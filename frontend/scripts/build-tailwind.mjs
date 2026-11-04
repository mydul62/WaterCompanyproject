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

  // Explicitly ensure critical classes are included
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

  // Exact styles from user's provided snippet
  const customOverrides = `
/* Custom Animations and Styles matching user snippet */
.dr {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #7fd8f0, #1c5be0);
  border-radius: 0 50% 50% 50%;
  transform: rotate(45deg);
  display: inline-block;
  flex-shrink: 0;
}

.out {
  color: transparent;
  -webkit-text-stroke: 2px #ffffff;
  font-weight: 500;
  text-shadow: none;
}

.play-btn {
  position: absolute;
  left: 50%;
  bottom: 11%;
  transform: translateX(-50%);
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #16181c;
  display: grid;
  place-items: center;
  border: 0;
  cursor: pointer;
  z-index: 25;
  transition: transform 0.25s;
}

.play-btn:hover {
  transform: translateX(-50%) scale(1.08);
}

.play-btn::before {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  animation: play-pulse 2s ease-out infinite;
}

.play-btn::after {
  content: "";
  border-left: 36px solid #fff;
  border-block: 22px solid transparent;
  margin-left: 8px;
}

@keyframes play-pulse {
  to {
    transform: scale(1.35);
    opacity: 0;
  }
}

.floating-leaf {
  position: absolute;
  width: 70px;
  height: 36px;
  background: linear-gradient(135deg, #7bb344, #3f7a22);
  border-radius: 0 100% 0 100%;
  animation: leaf-float 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 5;
}

@keyframes leaf-float {
  50% {
    transform: translateY(18px) rotate(22deg);
  }
}

.progress-dot {
  position: relative;
  overflow: hidden;
  width: 48px;
  height: 5px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s;
}

.progress-dot.active::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #ffffff;
  transform-origin: left;
  animation: progress-fill 5s linear forwards;
}

@keyframes progress-fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.bt-bottle {
  border-radius: 18px 18px 12px 12px;
  position: relative;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.55), rgba(160, 215, 240, 0.55), rgba(255, 255, 255, 0.4));
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.18);
}

.bt-bottle::after {
  content: "";
  position: absolute;
  top: -16px;
  left: 30%;
  width: 40%;
  height: 16px;
  background: #1c5be0;
  border-radius: 4px;
}

.hero-stroke-text {
  color: transparent;
  -webkit-text-stroke: 2px #ffffff;
  text-stroke: 2px #ffffff;
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
