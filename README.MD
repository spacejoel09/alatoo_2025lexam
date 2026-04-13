# ✅ Todo Too

> Современное Full-stack приложение для управления задачами с использованием FastAPI и Next.js.

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
---

## 🛠 ЛОКАЛ СТАРТ 

Если вы хотите запустить проект без Docker:


1. **Клонируйте репозиторий**
2. **BACKEND**
		`
		cd backend
		poetry install
		poetry run python main.py 
		`
3. **FRONTEND**
		`
		cd frontend
		npm i
		npm run dev 
		`
## 📁 Структура проекта
todo_too/
	`
	├── backend/           # FastAPI приложение
	│   ├── Dockerfile     # Сборка образа бэкенда
	│   ├── main.py        # Точка входа
	│   └── pyproject.toml # Зависимости Poetry
	├── frontend/          # Next.js приложение
	│   ├── Dockerfile     # Сборка образа фронтенда
	│   └── src/           # Исходный код
	└── docker-compose.yml # Конфигурация всех сервисов		
			`