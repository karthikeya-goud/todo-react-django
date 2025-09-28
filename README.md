# 📝 Todo App — React + Django

This project demonstrates a basic **CRUD** Todo application using **React** for the frontend and **Django** with **Function-Based Views (FBVs)** for the backend. It's a simple full-stack setup showcasing how to connect a React frontend with a Django REST API.

---

## 🚀 Features

- Add new tasks
- View a list of tasks
- Update existing tasks
- Delete tasks
- RESTful API built with Django FBVs
- Frontend built with React and Axios

---

## 🛠 Tech Stack

- **Frontend:** React, Axios, Bootstrap
- **Backend:** Django
- **Database:** SQLite

---

## 📂 Project Structure

todo-react-django
|   .gitignore
|   folder_structure.txt
|   notes.txt
|   README.md
|   requirements.txt
|   
+---backend
|   |   db.sqlite3
|   |   manage.py
|   |   
|   +---backend
|   |   |   asgi.py
|   |   |   settings.py
|   |   |   urls.py
|   |   |   wsgi.py
|   |   |   __init__.py
|   |   |   
|   |   
|   +---todo
|   |   |   admin.py
|   |   |   apps.py
|   |   |   models.py
|   |   |   tests.py
|   |   |   urls.py
|   |   |   views.py
|   |   |   __init__.py
|   |   |   
|   |   +---migrations
\---frontend
    |   .gitignore
    |   package-lock.json
    |   package.json
    |   README.md
    |   tsconfig.json
    +---public
    |       favicon.ico
    |       index.html
    |       logo192.png
    |       logo512.png
    |       manifest.json
    |       robots.txt
    |       
    \---src
        |   App.css
        |   App.test.tsx
        |   App.tsx
        |   index.css
        |   index.tsx
        |   logo.svg
        |   react-app-env.d.ts
        |   reportWebVitals.ts
        |   setupTests.ts
        |   
        \---todo
                todo.tsx



---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/karthikeya-goud/todo-react-django.git
cd todo-react-django


### 2. Set up the Django Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Apply migrations and start server
python manage.py migrate
python manage.py runserver


### 3. Set up the React frontend

```bash
cd frontend
npm install
npm start


Frontend runs on http://localhost:3000, backend on http://localhost:8000


<pre> ### 📡 API Endpoints | Method | Endpoint | Description | |--------|------------------------|---------------------| | GET | `/api/get/` | List all todos | | POST | `/api/create/` | Create a new task | | PUT | `/api/update/<id>/` | Update a task | | DELETE | `/api/delete/<id>/` | Delete a task | </pre>


#🙌 Acknowledgements

##This project is for learning purposes and is inspired by basic full-stack development practices using Django and React.