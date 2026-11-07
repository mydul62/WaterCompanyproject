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
    'max-w-[1920px]',
    'max-w-[1880px]',
    'max-w-[1643px]',
    'max-w-[1638px]',
    'max-w-[1480px]',
    'w-[98%]',
    'w-[96%]',
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

  // Exact styles from user's provided snippets
  const customOverrides = `
/* Global Large Screen Fluid Typography & Progressive Zoom Scaling */
html {
  font-size: 16.5px;
}
@media (min-width: 1024px) {
  html {
    font-size: 17.5px;
  }
}
@media (min-width: 1280px) {
  html {
    font-size: 18.5px;
  }
}
@media (min-width: 1440px) {
  html {
    font-size: 19.5px;
  }
}
@media (min-width: 1640px) {
  html {
    font-size: 20.5px;
  }
}



/* Custom Modern Bento & AquaPure Styles matching user snippet */
:root {
  --aqua-bg: #f3f9fd;
  --aqua-card: #ffffff;
  --aqua-text: #0a1f33;
  --aqua-muted: #53697c;
  --aqua-line: #dce9f2;
  --aqua-navy: #06284d;
  --aqua-g: linear-gradient(135deg, #1c8bff, #00c2d8);
}

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

/* Modern Bento Section Styles matching user HTML snippet */
:root {
  --bento-bg: #f3f9fd;
  --bento-card: #ffffff;
  --bento-text: #0a1f33;
  --bento-muted: #53697c;
  --bento-line: #dce9f2;
  --bento-navy: #06284d;
  --bento-g: linear-gradient(135deg, #1c8bff, #00c2d8);
}

.bento-section, .ab {
  position: relative;
  padding: 80px 0 110px;
  overflow: hidden;
  background: var(--bento-bg);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

.bento-section::before, .bento-section::after,
.ab::before, .ab::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  z-index: 0;
  pointer-events: none;
}

.bento-section::before, .ab::before {
  width: 520px;
  height: 520px;
  background: rgba(28, 139, 255, 0.18);
  top: -160px;
  right: -120px;
}

.bento-section::after, .ab::after {
  width: 460px;
  height: 460px;
  background: rgba(0, 194, 216, 0.16);
  bottom: -140px;
  left: -140px;
}

.bento-wrap, .wrap {
  position: relative;
  z-index: 1;
  width: 96%;
  max-width: 1880px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

@media (min-width: 640px) {
  .bento-wrap, .wrap {
    padding-left: 28px;
    padding-right: 28px;
  }
}

@media (min-width: 1440px) {
  .bento-wrap, .wrap {
    width: 96%;
    max-width: 1880px;
    padding-left: 28px;
    padding-right: 28px;
  }
}

.bento-ey, .ey {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1c8bff;
  background: rgba(28, 139, 255, 0.1);
  padding: 8px 16px;
  border-radius: 99px;
}

.bento-ey i, .ey i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  box-shadow: 0 0 0 4px rgba(28, 139, 255, 0.2);
  display: inline-block;
}

.bento-ey.lt, .ey.lt {
  background: rgba(255, 255, 255, 0.14);
  color: #c8e9ff;
}

.bento-ey.lt i, .ey.lt i {
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}

.bento-top, .top {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 56px;
  align-items: end;
  margin-bottom: 56px;
}

@media (max-width: 960px) {
  .bento-top, .top {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

.bento-title {
  font-size: clamp(34px, 5.2vw, 68px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 800;
  margin-top: 22px;
  color: #0a1f33;
}

.bento-g, .g {
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

.bento-g svg, .g svg {
  position: absolute;
  left: 0;
  bottom: -12px;
  width: 100%;
  height: 14px;
  fill: none;
  stroke: #1c8bff;
  stroke-width: 4;
  stroke-linecap: round;
}

.bento-intro p, .intro p {
  font-size: 17px;
  line-height: 1.65;
  color: #53697c;
}

.bento-btns, .btns {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.bento-btn, .b {
  padding: 14px 28px;
  border-radius: 99px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.bento-btn.pri, .b.pri {
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  color: #ffffff;
  box-shadow: 0 12px 26px rgba(28, 139, 255, 0.35);
  border: none;
}

.bento-btn.pri:hover, .b.pri:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(28, 139, 255, 0.45);
}

.bento-btn.ghost, .b.ghost {
  border: 2px solid #dce9f2;
  color: #0a1f33;
  background: #ffffff;
}

.bento-btn.ghost:hover, .b.ghost:hover {
  border-color: #1c8bff;
  color: #1c8bff;
  transform: translateY(-2px);
}

.bento-grid, .bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 22px;
}

@media (max-width: 960px) {
  .bento-grid, .bento {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.bento-c, .c {
  background: #ffffff;
  border: 1px solid #dce9f2;
  border-radius: 30px;
  padding: 36px;
  position: relative;
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 14px 40px rgba(10, 60, 120, 0.07);
}

.bento-c:hover, .c:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 56px rgba(10, 60, 120, 0.15);
}

.bento-c.prod, .c.prod {
  grid-column: span 7;
}

.bento-c.big, .c.big {
  grid-column: span 5;
}

.bento-c.why, .c.why {
  grid-column: span 5;
}

.bento-c.vis, .c.vis {
  grid-column: span 7;
}

@media (max-width: 960px) {
  .bento-c.prod, .c.prod,
  .bento-c.big, .c.big,
  .bento-c.why, .c.why,
  .bento-c.vis, .c.vis {
    grid-column: 1 / -1;
    padding: 28px;
  }
}

.bento-ic, .ic {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  display: grid;
  place-items: center;
  font-size: 25px;
  box-shadow: 0 10px 22px rgba(28, 139, 255, 0.35);
  margin-bottom: 20px;
}

.bento-c h2, .c h2 {
  font-size: 30px;
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 800;
  margin-bottom: 10px;
  color: #0a1f33;
}

.bento-c > p, .c > p {
  color: #53697c;
  line-height: 1.6;
}

.bento-sizes, .sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 24px 0;
}

.bento-sizes span, .sizes span {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px 9px 12px;
  border-radius: 99px;
  border: 1px solid #dce9f2;
  background: #f3f9fd;
  font-weight: 600;
  font-size: 14px;
  color: #0a1f33;
}

.bento-sizes span::before, .sizes span::before {
  content: "";
  width: 9px;
  height: var(--h, 16px);
  min-height: 10px;
  border-radius: 3px;
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
}

.bento-ck, .ck {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 18px;
}

@media (max-width: 640px) {
  .bento-ck, .ck {
    grid-template-columns: 1fr;
  }
}

.bento-ck li, .ck li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14.5px;
  font-weight: 500;
  color: #0a1f33;
}

.bento-ck li::before, .ck li::before {
  content: "✓";
  flex: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(28, 139, 255, 0.12);
  color: #1c8bff;
  font-weight: 800;
  font-size: 12px;
  display: grid;
  place-items: center;
}

.bento-c.big, .c.big {
  background: radial-gradient(80% 80% at 100% 0, #1c8bff, transparent), linear-gradient(145deg, #06284d, #0a4fb8);
  color: #ffffff;
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 360px;
}

@media (max-width: 960px) {
  .bento-c.big, .c.big {
    min-height: 280px;
  }
}

.bento-rp-box, .rp {
  position: absolute;
  right: -70px;
  top: -70px;
  width: 260px;
  height: 260px;
  pointer-events: none;
}

.bento-rp-box i, .rp i {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  animation: bento-rp-anim 4s ease-out infinite;
}

.bento-rp-box i:nth-child(2), .rp i:nth-child(2) {
  animation-delay: 1.3s;
}

.bento-rp-box i:nth-child(3), .rp i:nth-child(3) {
  animation-delay: 2.6s;
}

@keyframes bento-rp-anim {
  from {
    transform: scale(0.3);
    opacity: 1;
  }
  to {
    transform: scale(1.2);
    opacity: 0;
  }
}

.bento-c.big b, .c.big b {
  font-size: clamp(80px, 11vw, 128px);
  line-height: 0.9;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #ffffff;
}

.bento-c.big h3, .c.big h3 {
  font-size: 22px;
  margin: 12px 0 6px;
  color: #ffffff;
  font-weight: 700;
}

.bento-c.big p, .c.big p {
  opacity: 0.85;
  color: #eaf3fa;
}

.bento-c.why, .c.why {
  background: #06284d;
  color: #ffffff;
  border: 0;
}

.bento-c.why .bento-ic, .c.why .ic {
  background: rgba(255, 255, 255, 0.14);
  box-shadow: none;
}

.bento-c.why h2, .c.why h2 {
  color: #ffffff;
}

.bento-c.why > p, .c.why > p {
  color: rgba(255, 255, 255, 0.75);
}

.bento-why-list, .why ol {
  list-style: none;
  padding: 0;
  margin-top: 22px;
  display: grid;
  gap: 14px;
}

.bento-why-list li, .why ol li {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.bento-why-list li em, .why ol li em {
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  color: #6fd3ff;
  flex: none;
  width: 30px;
}

.bento-why-list li b, .why ol li b {
  display: block;
  font-size: 15.5px;
  color: #ffffff;
}

.bento-why-list li small, .why ol li small {
  opacity: 0.75;
  font-size: 13.5px;
  color: #eaf3fa;
}

.bento-c.vis, .c.vis {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 30px;
  align-items: center;
  background: linear-gradient(160deg, #ffffff, #f3f9fd);
}

@media (max-width: 960px) {
  .bento-c.vis, .c.vis {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.bento-bot, .bot {
  position: relative;
  width: 104px;
  height: 250px;
  margin: 30px auto 10px;
  border-radius: 28px 28px 20px 20px;
  border: 3px solid rgba(28, 139, 255, 0.5);
  background: rgba(255, 255, 255, 0.35);
  animation: bento-bob-anim 4.5s ease-in-out infinite;
}

.bento-bot::before, .bot::before {
  content: "";
  position: absolute;
  top: -26px;
  left: 30px;
  width: 44px;
  height: 26px;
  border-radius: 7px;
  background: linear-gradient(#1c8bff, #0a4fb8);
}

.bento-bot .bento-w, .bot .w {
  position: absolute;
  inset: auto 0 0 0;
  height: 70%;
  overflow: hidden;
  border-radius: 0 0 17px 17px;
  background: linear-gradient(#4fd0f0, #1c8bff);
}

.bento-bot .bento-w::before, .bot .w::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 200%;
  height: 18px;
  background: radial-gradient(circle at 20px 0, transparent 15px, #4fd0f0 16px) 0 0 / 40px 18px;
  animation: bento-wv-anim 3s linear infinite;
}

.bento-bot em, .bot em {
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 15px;
  color: #ffffff;
  font-style: normal;
  letter-spacing: 0.05em;
  z-index: 2;
  font-family: inherit;
}

@keyframes bento-wv-anim {
  to {
    transform: translateX(-40px);
  }
}

@keyframes bento-bob-anim {
  50% {
    transform: translateY(-12px);
  }
}

.bento-sts, .sts {
  display: grid;
  gap: 14px;
}

.bento-sts div, .sts div {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #dce9f2;
}

.bento-sts b, .sts b {
  font-size: 30px;
  font-weight: 800;
  min-width: 92px;
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.bento-sts span, .sts span {
  color: #53697c;
  font-weight: 500;
  font-size: 15px;
}

.bento-commit, .commit {
  margin-top: 22px;
  border-radius: 34px;
  padding: 56px;
  background: radial-gradient(60% 100% at 0 100%, rgba(0, 194, 216, 0.45), transparent), linear-gradient(135deg, #06284d, #0a4fb8);
  color: #ffffff;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 50px;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(6, 40, 77, 0.25);
}

@media (max-width: 960px) {
  .bento-commit, .commit {
    grid-template-columns: 1fr;
    padding: 34px 24px;
    gap: 28px;
  }
}

.bento-commit h2, .commit h2 {
  font-size: clamp(28px, 3.6vw, 44px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  font-weight: 800;
  margin: 18px 0 16px;
  color: #ffffff;
}

.bento-commit p, .commit p {
  opacity: 0.88;
  font-size: 17px;
  color: #eaf3fa;
  line-height: 1.65;
}

.bento-bd, .bd {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 26px;
}

.bento-bd span, .bd span {
  padding: 10px 18px;
  border-radius: 99px;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  font-weight: 700;
  font-size: 13.5px;
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.bento-pl, .pl {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

@media (max-width: 480px) {
  .bento-pl, .pl {
    grid-template-columns: 1fr;
  }
}

.bento-pl div, .pl div {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 22px;
  padding: 24px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.bento-pl div:hover, .pl div:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
}

.bento-pl em, .pl em {
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
  color: #7fd8ff;
  letter-spacing: 0.1em;
}

.bento-pl b, .pl b {
  display: block;
  font-size: 19px;
  margin: 8px 0 4px;
  color: #ffffff;
}

.bento-pl small, .pl small {
  opacity: 0.8;
  font-size: 14px;
  color: #eaf3fa;
  line-height: 1.4;
}

.rv {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.rv.in {
  opacity: 1;
  transform: none;
}

/* Explore More Modern Grid Styles matching user HTML snippet */
@property --ang {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.explore-section, .ex {
  position: relative;
  padding: 110px 0;
  overflow: hidden;
  background: var(--bento-bg, #f3f9fd);
}

.explore-section::before, .explore-section::after,
.ex::before, .ex::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
}

.explore-section::before, .ex::before {
  width: 500px;
  height: 500px;
  background: rgba(28, 139, 255, 0.16);
  top: -150px;
  left: -120px;
}

.explore-section::after, .ex::after {
  width: 480px;
  height: 480px;
  background: rgba(0, 194, 216, 0.15);
  bottom: -150px;
  right: -130px;
}

.explore-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1638px;
  margin: auto;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .explore-wrap {
    padding: 0 40px;
  }
}

.explore-head, .head {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 64px;
}

.explore-pill, .pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1c8bff;
  background: rgba(28, 139, 255, 0.1);
  padding: 8px 16px;
  border-radius: 99px;
}

.explore-pill i, .pill i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  box-shadow: 0 0 0 4px rgba(28, 139, 255, 0.2);
  animation: explore-pu 2s infinite;
  display: inline-block;
}

@keyframes explore-pu {
  50% {
    box-shadow: 0 0 0 8px rgba(28, 139, 255, 0);
  }
}

.explore-head h2 {
  font-size: clamp(38px, 6vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 800;
  margin: 20px 0 16px;
  color: #0a1f33;
}

.explore-head h2 span {
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.explore-head p {
  font-size: 18px;
  color: #53697c;
  line-height: 1.6;
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}

@media (max-width: 1100px) {
  .explore-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .explore-section {
    padding: 76px 0;
  }
  .explore-wrap {
    padding: 0 20px;
  }
  .explore-grid {
    grid-template-columns: 1fr;
  }
}

.explore-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 30px 30px;
  border-radius: 26px;
  background: #ffffff;
  border: 1px solid #dce9f2;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 10px 30px rgba(10, 60, 120, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  min-height: 210px;
}

/* animated border line */
.explore-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  z-index: 2;
  pointer-events: none;
  background: conic-gradient(from var(--ang, 0deg), transparent 0 62%, #1c8bff 82%, #00e0f0 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: explore-spin 5s linear infinite;
  animation-delay: calc(var(--i, 0) * -0.45s);
  opacity: 0.6;
  transition: opacity 0.3s;
}

@keyframes explore-spin {
  to {
    --ang: 360deg;
  }
}

/* cursor spotlight */
.explore-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgba(28, 139, 255, 0.16), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}

.explore-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 56px rgba(10, 60, 120, 0.18);
}

.explore-card:hover::before {
  opacity: 1;
  animation-duration: 2s;
}

.explore-card:hover::after {
  opacity: 1;
}

.explore-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.explore-ic {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  display: grid;
  place-items: center;
  font-size: 24px;
  box-shadow: 0 10px 22px rgba(28, 139, 255, 0.32);
  transition: transform 0.35s ease;
}

.explore-card:hover .explore-ic {
  transform: rotate(-8deg) scale(1.08);
}

.explore-no {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.1em;
  color: #53697c;
  opacity: 0.55;
}

.explore-card h3 {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-top: 6px;
  color: #0a1f33;
  transition: color 0.3s;
}

.explore-card:hover h3 {
  color: #1c8bff;
}

.explore-card p {
  color: #53697c;
  font-size: 15px;
  line-height: 1.55;
}

.explore-go {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 14px;
  color: #1c8bff;
  padding-top: 10px;
}

.explore-go b {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(28, 139, 255, 0.12);
  transition: all 0.35s ease;
  font-size: 16px;
  font-weight: bold;
}

.explore-card:hover .explore-go b {
  background: linear-gradient(135deg, #1c8bff, #00c2d8);
  color: #ffffff;
  transform: translateX(6px) rotate(-45deg);
}

/* Staggered Scroll Reveal for Explore cards */
.explore-card.rv {
  opacity: 0;
  transform: translateY(34px) scale(0.97);
  transition: opacity 0.7s calc(var(--i, 0) * 0.07s), transform 0.7s calc(var(--i, 0) * 0.07s);
}

.explore-card.rv.in {
  opacity: 1;
  transform: none;
}

.explore-card.rv.in:hover {
  transform: translateY(-8px);
  transition-delay: 0s;
}

@media (max-width: 700px) {
  .explore-card {
    min-height: 0;
  }
}

@keyframes floatGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float-gentle {
  animation: floatGentle 5s ease-in-out infinite;
}

@keyframes heroSlideUp {
  0% {
    opacity: 0;
    transform: translateY(65px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-hero-title {
  animation: heroSlideUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.animate-hero-desc {
  animation: heroSlideUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both;
}

.animate-hero-btns {
  animation: heroSlideUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.26s both;
}

.animate-hero-visual {
  animation: heroSlideUp 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}

/* Glassmorphism & Modern Animations */
.glass-panel {
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.glass-panel-dark {
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.glass-pill {
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.45);
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(1.5deg);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 25px rgba(0, 194, 232, 0.35), 0 0 50px rgba(0, 194, 232, 0.15);
  }
  50% {
    box-shadow: 0 0 45px rgba(0, 194, 232, 0.65), 0 0 80px rgba(0, 194, 232, 0.3);
  }
}

@keyframes glassShimmer {
  0% {
    transform: translateX(-150%) skewX(-20deg);
  }
  100% {
    transform: translateX(250%) skewX(-20deg);
  }
}

.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulseGlow 3s ease-in-out infinite;
}

.glass-shimmer {
  position: relative;
  overflow: hidden;
}
.glass-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.35),
    transparent
  );
  transform: translateX(-150%) skewX(-20deg);
  pointer-events: none;
}
.glass-shimmer:hover::after {
  animation: glassShimmer 1.2s ease-in-out;
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
