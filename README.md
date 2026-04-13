# ✅ TODO-APP

> Full Stack приложение ради Ala-Too 2nd semester

---

## 🚀 Технологический стек

| Слой | Технологии |
| :--- | :--- |
| **Vanilla Frontend** | `Next.js 15+`, `TypeScript`, `Tailwind/clsx`, `Zustand` |
| **Backend** | `FastAPI`, `Python 3.12+`, `Pydantic v2` |
| **литл database** | `SQLite` + `SQLAlchemy` |
| **литл devops** | `Docker`, `Docker Compose` |

---

## 🐳 Быстрый старт (Docker)

Это рекомендуемый способ запуска. Вам не нужно устанавливать Python или Node.js локально.

1. **Клонируйте репозиторий**
2. **Запустите контейнеры:**
   ```bash
   docker-compose up --build
   ```

---

## 🛠 Локальный запуск

Если вы хотите запустить проект без Docker:

1. **Клонируйте репозиторий**

2. **Backend:**
   ```bash
   cd backend
   poetry install
   poetry run python main.py
   ```

3. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
## 📁 Структура проекта

```
todo_too/
├── backend/                 # FastAPI приложение
│   ├── Dockerfile          # Сборка образа бэкенда
│   ├── main.py             # Точка входа
│   ├── pyproject.toml      # Зависимости Poetry
│   └── poetry.lock         # Заблокированная версия зависимостей
├── frontend/               # Next.js приложение
│   ├── Dockerfile          # Сборка образа фронтенда
│   ├── app/                # Приложение Next.js
│   │   ├── layout.tsx      # Главный layout
│   │   ├── page.tsx        # Главная страница
│   │   └── state/          # Управление состоянием
│   ├── package.json        # Зависимости Node.js
│   └── public/             # Статические файлы
└── docker-compose.yml      # Конфигурация сервисов
```

