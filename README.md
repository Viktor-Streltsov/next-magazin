# NextJS Full-Stack Application

Современное веб-приложение, построенное на Next.js с использованием передовых технологий и лучших практик разработки.

## 🚀 Технологический стек

### Core Framework
- **[Next.js](https://nextjs.org)** - React-фреймворк для производственных приложений
  - App Router с поддержкой Server Components
  - Parallel Routes для сложной маршрутизации
  - Route Groups для организации структуры
  - Server Actions для серверной логики
  - API Routes для создания REST API

### Языки и типизация
- **[TypeScript](https://www.typescriptlang.org/)** - Строгая типизация для JavaScript

### Стилизация
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS фреймворк
- **[ShadCN/UI](https://ui.shadcn.com/)** - Переиспользуемые компоненты UI

### База данных и ORM
- **[Prisma](https://www.prisma.io/)** - Type-safe ORM для TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Реляционная база данных

### Аутентификация
- **[NextAuth.js](https://next-auth.js.org/)** - Полнофункциональная система аутентификации

### Формы и валидация
- **[React Hook Form](https://react-hook-form.com/)** - Производительные формы с минимальными перерендерами
- **[Zod](https://zod.dev/)** - TypeScript-first схема валидации

### Управление состоянием
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Легковесное управление состоянием

### Дополнительные библиотеки
- **[react-use](https://github.com/streamich/react-use)** - Коллекция полезных React хуков
- **[nextjs-toploader](https://www.npmjs.com/package/nextjs-toploader)** - Индикатор загрузки страниц
- **[react-hot-toast](https://react-hot-toast.com/)** - Уведомления и тосты
- **[react-insta-stories](https://www.npmjs.com/package/react-insta-stories)** - Instagram-like сторис
- **[lucide-react](https://lucide.dev/)** - Красивые иконки
- **[Resend](https://resend.com/)** - Email API для отправки писем

## 🛠 Установка и запуск

### Предварительные требования

- Node.js 18.0 или выше
- npm, yarn, pnpm или bun
- PostgreSQL база данных

### Установка зависимостей

```bash
# Используя npm
npm install

# Используя yarn
yarn install

# Используя pnpm
pnpm install

# Используя bun
bun install
```

### Настройка окружения

1. Создайте файл `.env.local` в корне проекта:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth провайдеры (примеры)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Resend для email
RESEND_API_KEY="your-resend-api-key"

# Другие переменные окружения
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Настройка базы данных

```bash
# Генерация Prisma клиента
npx prisma generate

# Запуск миграций
npx prisma db push

# Или создание и применение миграций
npx prisma migrate dev --name init

# Просмотр базы данных (опционально)
npx prisma studio
```

### Запуск в режиме разработки

```bash
# Используя npm
npm run dev

# Используя yarn
yarn dev

# Используя pnpm
pnpm dev

# Используя bun
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере для просмотра результата.

## 📁 Структура проекта

```
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Route Group для аутентификации
│   ├── (dashboard)/       # Route Group для панели управления
│   ├── api/               # API Routes
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Корневой layout
│   └── page.tsx          # Главная страница
├── components/            # Переиспользуемые компоненты
│   ├── ui/               # ShadCN UI компоненты
│   ├── shared/            # Основные компоненты
│   └── ...
├── lib/                  # Утилиты и конфигурации
│   ├── prisma.ts         # Prisma клиент
│   ├── auth.ts           # NextAuth конфигурация
│   ├── validations.ts    # Zod схемы
│   └── utils.ts          # Общие утилиты
├── prisma/               # Prisma схема и миграции
│   └── schema.prisma     # Схема базы данных
├── public/               # Статические файлы
├── stores/               # Zustand стейт менеджеры
├── types/                # TypeScript типы
└── hooks/                # Кастомные React хуки
```

## 🔧 Основные возможности

### Аутентификация
- Регистрация и вход через email/пароль
- OAuth провайдеры (Google, GitHub, и др.)
- Защищенные маршруты
- Session management

### Формы
- Валидация в реальном времени
- Type-safe формы с React Hook Form
- Схемы валидации с Zod
- Обработка ошибок

### UI/UX
- Responsive дизайн
- Красивые компоненты из ShadCN
- Toast уведомления
- Индикаторы загрузки
- Адаптивнойсть

### База данных
- Type-safe запросы с Prisma
- Автоматические миграции
- Seeding данных

## 📜 Доступные скрипты

```bash
# Разработка
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сборки
npm run lint         # Проверка кода линтером
```

## 🚀 Деплой

### Vercel (рекомендуется)

Самый простой способ задеплоить Next.js приложение - использовать [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) от создателей Next.js.

1. Подключите ваш GitHub репозиторий к Vercel
2. Настройте переменные окружения в панели Vercel
3. Деплой произойдет автоматически при каждом пуше в main ветку

### Другие платформы

- **Railway** - для PostgreSQL и деплоя
- **PlanetScale** - для MySQL базы данных
- **Supabase** - для PostgreSQL с дополнительными фичами
- **Netlify** - альтернатива Vercel

## 📚 Полезные ресурсы

- [Next.js Documentation](https://nextjs.org/docs) - Изучите возможности и API Next.js
- [Next.js Learn](https://nextjs.org/learn) - Интерактивный туториал по Next.js
- [Prisma Docs](https://www.prisma.io/docs) - Документация по Prisma ORM
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Утилиты и компоненты Tailwind
- [ShadCN/UI](https://ui.shadcn.com/) - Компоненты и примеры
- [NextAuth.js Docs](https://next-auth.js.org/) - Гайды по аутентификации

## 🤝 Участие в разработке

1. Сделайте форк проекта
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для деталей.

## 🆘 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте [документацию Next.js](https://nextjs.org/docs)
2. Создайте [Issue](https://github.com/your-username/your-repo/issues) в репозитории
3. Обратитесь к сообществу в [Next.js Discord](https://discord.gg/nextjs)

---

Сделано с ❤️ используя Next.js и современные веб-технологии