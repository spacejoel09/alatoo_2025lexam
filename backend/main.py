from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies.db import SessionLocal, Todo
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
class TodoCreate(BaseModel):
    title: str

class TodoOut(BaseModel):
    id: int
    title: str
    completed: bool
    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/todos/", response_model=TodoOut)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    clean_title = todo.title.strip()
    if len(clean_title) > 38:
        raise HTTPException(status_code=400, detail="Название слишком длинное")
    if not clean_title:
        raise HTTPException(status_code=400, detail="Не может быть пустым")

    existing_todo = db.query(Todo).filter(Todo.title == clean_title).first()
    if existing_todo:
        raise HTTPException(status_code=400, detail="ОНО УЖЕ СУЩЕСТВУЕТ")
    db_todo = Todo(title=clean_title)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
@app.get("/todos/", response_model=list[TodoOut])
def read_todos(db: Session = Depends(get_db)):
    return db.query(Todo).all()

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Не найдено")
    db.delete(db_todo)
    db.commit()
    return {"ДЕТАЛИ": "УДАЛЕНО"}
@app.patch("/todos/{todo_id}")
def update_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="Не найдено")
    db_todo.completed = not db_todo.completed
    db.commit()
    db.refresh(db_todo)
    return db_todo