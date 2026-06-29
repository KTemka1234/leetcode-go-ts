#!/usr/bin/env node
// Генератор заготовки задачи LeetCode для Go и TypeScript.
//
//   npm run new -- <номер> <slug>
//   пример: npm run new -- 2 add-two-numbers
//
// Создаёт problems/<NNNN>-<slug>/ с пятью файлами-заготовками.
// Если папка уже существует — ничего не перезаписывает и завершается с ошибкой.

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function fail(msg) {
  console.error(`Ошибка: ${msg}`);
  process.exit(1);
}

const [, , rawNumber, rawSlug] = process.argv;
if (!rawNumber || !rawSlug) {
  fail("укажите номер и slug, например: npm run new -- 2 add-two-numbers");
}

if (!/^\d+$/.test(rawNumber)) fail(`номер должен быть числом, получено "${rawNumber}"`);
const slug = rawSlug.toLowerCase();
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  fail(`slug может содержать только латиницу, цифры и дефисы, получено "${rawSlug}"`);
}

const num = rawNumber.padStart(4, "0");
const folderName = `${num}-${slug}`;
const dir = join(root, "problems", folderName);

// Имя Go-пакета: без дефисов; если начинается с цифры — префикс p.
let goPkg = slug.replace(/-/g, "");
if (/^\d/.test(goPkg)) goPkg = "p" + goPkg;

// camelCase для TS-функции и PascalCase для экспортной Go-функции.
const parts = slug.split("-");
const camel = parts
  .map((p, i) => (i === 0 ? p : p[0].toUpperCase() + p.slice(1)))
  .join("");
const pascal = parts.map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const title = parts.map((p) => p[0].toUpperCase() + p.slice(1)).join(" ");
const url = `https://leetcode.com/problems/${slug}/`;

const files = {
  "solution.go": `package ${goPkg}

// ${pascal} — задача ${Number(rawNumber)}. ${title}
// ${url}

func ${pascal}() {
}
`,
  "solution_test.go": `package ${goPkg}

import "testing"

func Test${pascal}(t *testing.T) {
	t.Skip("TODO: реализовать решение и добавить тест-кейсы")
}
`,
  "solution.ts": `// ${camel} — задача ${Number(rawNumber)}. ${title}
// ${url}

export function ${camel}(): void {
  // TODO
}
`,
  "solution.test.ts": `import { describe, it } from "vitest";
// import { ${camel} } from "./solution";

describe("${camel}", () => {
  it.todo("реализовать тест-кейсы");
});
`,
  "README.md": `# ${Number(rawNumber)}. ${title}

🔗 ${url}

**Сложность:** TODO
`,
};

const exists = await access(dir).then(
  () => true,
  () => false,
);
if (exists) fail(`папка уже существует: problems/${folderName}`);

await mkdir(dir, { recursive: true });
for (const [name, content] of Object.entries(files)) {
  await writeFile(join(dir, name), content, "utf8");
}

console.log(`Создано: problems/${folderName}`);
console.log("  solution.go / solution_test.go  (go test ./...)");
console.log("  solution.ts / solution.test.ts  (npm test)");
