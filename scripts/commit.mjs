#!/usr/bin/env node
// Быстрый коммит решённой задачи: git add -A + commit + push одной командой.
//
//   git save              # авто-сообщение из изменённой папки problems/ + push
//   git save "текст"      # то же, но со своим сообщением
//   git save -n           # dry-run: показать сообщение, ничего не менять
//
// Алиас регистрируется так (один раз):
//   git config alias.save '!node scripts/commit.mjs'

import { execFileSync } from "node:child_process";

// Запуск git: capture=true возвращает stdout строкой (stderr подавляется),
// иначе наследует stdio (виден прогресс).
function git(args, { capture = false } = {}) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "ignore"] : "inherit",
  });
}

function fail(msg) {
  console.error(`Ошибка: ${msg}`);
  process.exit(1);
}

const argv = process.argv.slice(2);
const dryRun = argv.includes("-n") || argv.includes("--dry-run");
const userMessage = argv.filter((a) => a !== "-n" && a !== "--dry-run").join(" ").trim();

// Title Case из slug: "remove-duplicates" -> "Remove Duplicates".
function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

// По списку путей строит сообщение из изменённых папок problems/<NNNN>-<slug>/.
// Возвращает строку или null, если задач не нашлось.
function deriveMessage(paths) {
  const folders = new Set();
  for (const p of paths) {
    const parts = p.split("/");
    if (parts[0] === "problems" && parts.length >= 2) folders.add(parts[1]);
  }
  const pieces = [];
  for (const folder of folders) {
    const m = /^(\d+)-(.+)$/.exec(folder);
    if (m) pieces.push(`${Number(m[1])}. ${titleFromSlug(m[2])}`);
  }
  return pieces.length ? `solve: ${pieces.join("; ")}` : null;
}

// Пути изменений в рабочем дереве (для dry-run, до git add).
function worktreePaths() {
  const out = git(["status", "--porcelain"], { capture: true });
  return out
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const path = line.slice(3); // убираем 2 символа статуса + пробел
      const arrow = path.indexOf(" -> ");
      return arrow !== -1 ? path.slice(arrow + 4) : path; // переименование
    });
}

if (dryRun) {
  const paths = worktreePaths();
  if (paths.length === 0) {
    console.log("Нет изменений для коммита.");
    process.exit(0);
  }
  const message = userMessage || deriveMessage(paths);
  console.log("[dry-run] изменённые файлы:");
  for (const p of paths) console.log(`  ${p}`);
  console.log(
    message
      ? `[dry-run] сообщение: ${message}`
      : "[dry-run] авто-сообщение не определено — передайте текст: git save \"...\"",
  );
  process.exit(0);
}

execFileSync("gofmt", ["-w", "."])

git(["add", "-A"]);

// Есть ли что коммитить.
let staged = false;
try {
  execFileSync("git", ["diff", "--cached", "--quiet"], { stdio: "ignore" });
} catch {
  staged = true; // ненулевой код = есть изменения в индексе
}
if (!staged) {
  console.log("Нет изменений для коммита.");
  process.exit(0);
}

const stagedPaths = git(["diff", "--cached", "--name-only"], { capture: true })
  .split("\n")
  .filter(Boolean);

const message = userMessage || deriveMessage(stagedPaths);
if (!message) {
  fail('не удалось определить задачу из изменений — передайте сообщение: git save "..."');
}

git(["commit", "-m", message]);

// Push: если у ветки нет upstream — задаём его при первом пуше.
let hasUpstream = true;
try {
  git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], { capture: true });
} catch {
  hasUpstream = false;
}
if (hasUpstream) {
  git(["push"]);
} else {
  const branch = git(["branch", "--show-current"], { capture: true }).trim();
  git(["push", "-u", "origin", branch]);
}
