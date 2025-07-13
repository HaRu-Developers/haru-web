const fs = require('fs');
const path = require('path');

// https://velog.io/@kyeoungwoon/tailwindcss-v4-%EC%BB%A4%EC%8A%A4%ED%85%80-CSS-%EB%B3%80%EC%88%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

const prefixes = ['spacing', 'text', 'radius'];

const createCss = (text, size) => `  --${text}-${size}pxr: ${size / 16}rem;`;

const generateCss = (prefixes, sizes) => {
  return (
    '@theme {\n' +
    prefixes.map((text) => sizes.map((size) => createCss(text, size)).join('\n')).join('\n\n') +
    '\n}'
  );
};

const output = generateCss(
  prefixes,
  Array.from({ length: 1024 }, (_, i) => i + 1),
);
const outputPath = path.join(__dirname, 'generated-css-vars.txt');

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`CSS variables written to ${outputPath}`);
