# LeetCode

<!-- Замените <owner>/<repo> на ваш репозиторий после первого пуша на GitHub. -->
[![CI](https://github.com/KTemka1234/leetcode-go-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/KTemka1234/leetcode-go-ts/actions/workflows/ci.yml)

Решения задач LeetCode на **Go** и **TypeScript**. Каждая задача — отдельная папка
в `problems/`, внутри решения на обоих языках со своими тестами.

## Требования

- [Go](https://go.dev/) 1.24+
- [Node.js](https://nodejs.org/) 22+ (npm 11+)

## Установка

```sh
npm install
```

(Go-зависимости не нужны — используется только стандартная библиотека.)

## Структура

```
problems/
└── 0001-two-sum/
    ├── README.md          # ссылка на задачу + краткое условие
    ├── solution.go        # решение на Go (package twosum)
    ├── solution_test.go   # тесты Go (table-driven)
    ├── solution.ts        # решение на TypeScript
    └── solution.test.ts   # тесты TypeScript (Vitest)

golib/   # общие хелперы для Go (ListNode, TreeNode)
lib/     # общие хелперы для TypeScript (ListNode, TreeNode)
```

## Создание новой задачи

```sh
npm run new -- <номер> <slug>
# пример:
npm run new -- 2 add-two-numbers
```

Создаст `problems/0002-add-two-numbers/` с заготовками на обоих языках.

## Запуск тестов

### TypeScript (Vitest)

```sh
npm test                 # все задачи один раз
npm run test:watch       # watch-режим
npx vitest run problems/0001-two-sum   # одна задача
npm run typecheck        # проверка типов без запуска
```

### Go

```sh
go test ./...                          # все задачи
go test ./problems/0001-two-sum/       # одна задача
go test -run TwoSum ./...              # по имени теста
```

## CI

GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)) на каждый push
в `main`/`master` и на каждый pull request прогоняет два параллельных задания:

- **Go** — `gofmt` (проверка форматирования), `go vet`, `go test -race ./...`
- **TypeScript** — `npm ci`, `npm run typecheck`, `npm test`

Зависимости (Go-модули и npm) кешируются между запусками.
