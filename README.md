# Vite + React + TypeScript + Tailwind v4 — Production‑ready Template

**Стек**: Vite • React • TypeScript • Tailwind v4 • ESLint (flat) • Prettier • Vitest + React Testing Library • React Router • алиас `@` • Husky + lint‑staged + commitlint • GitHub Actions (CI)

> Привет! Этот шаблон даёт быстрый старт для фронтенд‑разработки, с единым стилем кода, тестами, проверками при коммите и CI.

---

## 📌 TL;DR — Быстрый старт

```bash
# Требования: Node >= 20, npm >= 10
npm install
npm run dev
```

- Tailwind v4 работает без `tailwind.config.*` и `postcss.config.*`. Подключение: Vite‑плагин + `@import "tailwindcss"` в `src/index.css`.
- Тесты и типы: `npm run test`, `npm run typecheck`.
- Перед коммитом запускаются форматирование и линт: Husky + lint‑staged.

---

## 🧰 Технологии

- **Vite** — быстрая сборка и дев‑сервер.
- **React + TypeScript** — UI и типобезопасность.
- **Tailwind CSS v4** — utility‑first стили без конфигов по умолчанию, через Vite‑плагин.
- **ESLint (flat config) + Prettier** — качество кода и форматирование.
- **Vitest + React Testing Library + jest‑dom** — юнит/компонентные тесты.
- **React Router** — маршрутизация (SPA).
- **Алиас `@` → `src`** — удобные абсолютные импорты.
- **Husky + lint‑staged + commitlint** — pre‑commit форматирование/линт и проверка сообщений коммитов (Conventional Commits).
- **GitHub Actions (CI)** — линт, типы, тесты, сборка на `push`/`PR` в `main`.

---

## 🗂 Структура проекта

```
├─ .github/
│  └─ workflows/
│     └─ ci.yml                 # GitHub Actions: линт, типы, тесты, сборка
├─ .husky/
│  ├─ pre-commit                # запускает lint-staged
│  └─ commit-msg                # проверка сообщения коммита (commitlint)
├─ src/
│  ├─ pages/
│  │  ├─ Home.tsx
│  │  ├─ About.tsx
│  │  └─ Home.test.tsx          # пример теста RTL/Vitest
│  ├─ tests/
│  │  └─ setup.ts               # jest-dom/vitest
│  ├─ App.tsx                   # роутинг и макет
│  ├─ main.tsx                  # входная точка, BrowserRouter
│  ├─ index.css                 # @import "tailwindcss"
│  └─ vite-env.d.ts
├─ .gitignore
├─ .prettierrc.json
├─ .prettierignore
├─ commitlint.config.cjs
├─ eslint.config.js             # flat ESLint config
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts               # Vite + React SWC + Tailwind + Vitest config
```

---

## ⚙️ Установка и запуск

```bash
# 1) Установить зависимости
npm install

# 2) Дев-сервер
npm run dev

# 3) Линт / форматирование / типы / тесты / сборка
npm run lint
npm run format
npm run typecheck
npm run test        # или npm run test:watch
npm run build
npm run preview     # локальный предпросмотр сборки
```

> Рекомендуется коммитить `package-lock.json` — это ускорит CI и обеспечит воспроизводимость версий.

---

## 🔧 Конфигурация и как она устроена

### Vite (`vite.config.ts`)

- Плагины: `@vitejs/plugin-react-swc` + `@tailwindcss/vite`.
- Алиас `@` → `src` для удобных импортов.
- Конфиг Vitest хранится в разделе `test` (см. ниже).

Пример:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    css: true,
    globals: true,
  },
});
```

### TypeScript (`tsconfig.json`)

Ключевые моменты:

- `moduleResolution: "bundler"`, `jsx: "react-jsx"`.
- Алиасы: `paths: { "@/*": ["src/*"] }`.
- Глобали Vitest (вариант B): `"types": ["vite/client", "vitest/globals"]`.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "skipLibCheck": true,
    "types": ["vite/client", "vitest/globals"]
  },
  "include": ["src"]
}
```

### Tailwind CSS v4

- **Подключение без конфигов**: плагин `@tailwindcss/vite` + одна строка в `src/index.css`:

```css
@import 'tailwindcss';
```

- Кастомизация (плагины, токены) в v4 делается через CSS‑директивы (например, `@plugin`) и `@theme` — при необходимости см. документацию Tailwind v4.

### ESLint (flat) + Prettier

- Flat‑конфиг в `eslint.config.js` использует `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-config-prettier`, `globals`.
- Формат‑правила отключены в ESLint (даёт рулить Prettier).
- Запуск: `npm run lint` / `npm run lint:fix`.

Фрагмент:

```js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  { ignores: ['dist', 'coverage'] },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  prettier,
];
```

### Prettier

- Конфиг в `.prettierrc.json`, игнор в `.prettierignore`.
- Команды: `npm run format` (проверка), `npm run format:write` (исправление).

### Husky + lint‑staged + commitlint

- При установке зависимостей срабатывает `"prepare": "husky"`.
- **pre‑commit** запускает `lint-staged` и форматирует/линтит только изменённые файлы.
- **commit‑msg** валидирует сообщение в формате **Conventional Commits**.

`commitlint.config.cjs`:

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

**Conventional Commits** — кратко:

- Формат: `type(scope): subject`
- Частые `type`: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `build`, `ci`.
- Примеры:
  - `feat(auth): add OAuth login`
  - `fix(router): handle trailing slash`
  - `chore: bump deps`

### GitHub Actions (CI)

Файл `.github/workflows/ci.yml` запускает:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run coverage`
5. `npm run build`

Запускается на `push` и `pull_request` в ветку `main` (матрица Node 20/22).

---

## 🧭 Маршрутизация (React Router)

`src/main.tsx` оборачивает приложение в `<BrowserRouter>`, а `src/App.tsx` содержит маршруты.

Добавить новый маршрут:

```tsx
// src/pages/Profile.tsx
export default function Profile() {
  return <h1 className="text-2xl font-semibold">Profile</h1>;
}
```

```tsx
// src/App.tsx
import { Link, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Profile from '@/pages/Profile';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 p-4">
          <Link to="/" className="font-semibold hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
```

---

## 🎨 Стили (Tailwind v4)

- Главное правило: в `src/index.css` оставьте `@import "tailwindcss";`.
- Классы Tailwind можно использовать прямо в JSX: `className="p-4 bg-gray-50"`.
- Никаких обязательных конфигов — v4 облегчает старт. Для кастомизации (цвета, токены, плагины) используйте подход v4 с CSS‑директивами при необходимости.

Пример компонента:

```tsx
export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-2 text-gray-700">{children}</div>
    </section>
  );
}
```

---

## 🧪 Тесты (Vitest + RTL)

### Где находятся

- Тесты можно располагать рядом с кодом: `*.test.tsx`.
- Общая инициализация: `src/tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

### Пример простого теста

```tsx
// src/pages/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders title', () => {
    render(<Home />);
    expect(screen.getByText(/Hello Vite \+ React \+ TS \+ Tailwind/i)).toBeInTheDocument();
  });
});
```

### Пример теста с роутером

```tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Profile from '@/pages/Profile';

it('renders Profile route', () => {
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MemoryRouter>,
  );
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
});
```

### user‑event пример

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function Counter() {
  const [n, setN] = React.useState(0);
  return (
    <div>
      <p>Count: {n}</p>
      <button onClick={() => setN((v) => v + 1)}>Inc</button>
    </div>
  );
}

it('increments counter', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByText('Inc'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### Команды

- Запуск разово: `npm run test`
- В watch‑режиме: `npm run test:watch`
- Покрытие: `npm run coverage`

> Если `tsc` ругается на `describe/it/expect`, убедитесь, что в `tsconfig.json` есть `"types": ["vitest/globals"]`. Либо импортируйте их явным образом: `import { describe, it, expect } from 'vitest'`.

---

## 🧭 Импорты и алиасы

- Используйте **абсолютные импорты** от корня `src`:

```ts
import Button from '@/components/Button';
import { formatDate } from '@/utils/date';
```

- Важно: для TS/TSX **не** указывайте расширение в импортируемом пути (`import App from './App'`, не `./App.tsx`), иначе получите ошибку без `allowImportingTsExtensions`.

---

## 🔐 Переменные окружения

- Файлы: `.env`, `.env.local`, `.env.development`, `.env.production` и т. п. — **не коммитить**.
- Доступ в коде: `import.meta.env.VITE_*`.
- Создайте и положите в репозиторий файл‑шаблон `*.env.example`.

Пример:

```
# .env.example
VITE_API_URL=https://api.example.com
```

Использование:

```ts
const api = import.meta.env.VITE_API_URL;
```

---

## 🧯 Траблшутинг

- **Tailwind: команда `init` не работает** — верно для v4, она удалена. Используйте плагин `@tailwindcss/vite` и `@import "tailwindcss"`.
- **Не найден `@vitejs/plugin-react-swc`** — установите `npm i -D @vitejs/plugin-react-swc`.
- **TS ошибка "An import path can only end with a '.tsx'..."** — уберите расширение из импорта **или** включите `allowImportingTsExtensions` в `tsconfig.json`.
- **Vitest глобали не видны** — добавьте `"vitest/globals"` в `tsconfig.json > compilerOptions.types` или импортируйте `describe/it/expect` из `vitest` в тестах.
- **Хуки Husky не запускаются** — убедитесь, что в `package.json` есть `"prepare": "husky"` и у файлов `.husky/*` есть исполняемый бит: `chmod +x .husky/*`.

---

## 🧪 Качество кода и договорённости

- **ESLint**: держим `npm run lint` зелёным, ошибки правим, предупреждения — по ситуации.
- **Prettier**: формат по умолчанию, не спорим со стиль‑гайдом — он автоматический.
- **Conventional Commits**: понятные сообщения коммитов, полезные для ченджлога и истории.
- **PR/CI**: PR должен проходить линт/типы/тесты/сборку.

---

## 🧱 Скрипты npm

| Скрипт         | Назначение                       |
| -------------- | -------------------------------- |
| `dev`          | Дев‑сервер Vite                  |
| `build`        | Тип‑чек + сборка                 |
| `preview`      | Предпросмотр сборки локально     |
| `lint`         | ESLint (ошибки — фейлит)         |
| `lint:fix`     | ESLint с автоисправлениями       |
| `format`       | Проверка форматирования Prettier |
| `format:write` | Автоформатирование Prettier      |
| `typecheck`    | TS‑проверка типов без эмита      |
| `test`         | Vitest разовый запуск            |
| `test:watch`   | Vitest в watch‑режиме            |
| `coverage`     | Покрытие тестами                 |
| `prepare`      | Активирует Husky локально/в CI   |

---

## 🧩 Рекомендации по VS Code

- Расширения: **ESLint**, **Prettier**, **Tailwind CSS IntelliSense**.
- Настройки (пример):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "files.eol": "\n"
}
```

---

## 📦 Лицензия

MIT — делайте с шаблоном что хотите. Благодарности за улучшения и PR приветствуются 🙌
