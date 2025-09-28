import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id?: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const URL = 'http://localhost:8000/api/';
  const [todo, setTodo] = useState<Todo>({
    title: '',
    description: '',
    deadline: new Date().toISOString().split('T')[0],
    completed: false,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadData = async () => {
    try {
      const res = await axios.get(URL + 'get/');
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (id: number) => {
    try {
      await axios.delete(URL + `delete/${id}/`);
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const changeToView = (id: number) => {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx !== -1) {
      viewTodo(idx);
    }
  };

  const updateData = async (id: number | undefined) => {
    if (id === undefined) return;
    try {
        const res = await axios.put(URL + `update/${id}/`, { ...todo });
        await loadData();
        setTodo(res.data);
        setIsCreating(false);
        setIsUpdating(false);
        setIsViewing(true);
    } catch (err) {
        console.log(err);
    }
};


  const createData = async () => {
    try {
      await axios.post(URL + 'create/', { ...todo });
      emptyTheTodo();
      await loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const emptyTheTodo = () => {
    setTodo({
      title: '',
      description: '',
      deadline: new Date().toISOString().split('T')[0],
      completed: false,
    });
  };

  const createTodo = () => {
    emptyTheTodo();
    setIsUpdating(false);
    setIsViewing(false);
    setIsCreating(true);
  };

  const updateTodo = (idx: number) => {
    setTodo(todos[idx]);
    setIsUpdating(true);
    setIsViewing(false);
    setIsCreating(false);
  };

  const viewTodo = (idx: number) => {
    setTodo(todos[idx]);
    setIsUpdating(false);
    setIsViewing(true);
    setIsCreating(false);
  };

  const deleteTodo = async (id: number | undefined) => {
    if (id) {
      await deleteData(id);
    }
  };

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setTodo({
      ...todo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    setIsCreating(true);
    setIsUpdating(false);
    setIsViewing(false);
    loadData();
  }, []);

  return (
    <div className="container-fluid vh-100 p-2" style={{ backgroundColor: 'black', color: 'white' }}>
      <div className="row h-100">
        <div className="col-3 border-end" style={{ borderColor: 'white' }}>
          <div className="d-flex justify-content-between">
            <h2>TODO</h2>
            <button className="btn btn-success" onClick={createTodo}>
              <span className="bi bi-plus fs-4"></span>
            </button>
          </div>
          <div className="mt-4 p-2">
            {todos.length === 0 ? (
              <div><span>Create a TODO</span></div>
            ) : (
              <div>
                {todos.map((todo, idx) => (
                  <div
                    key={todo.id}
                    className="d-flex justify-content-between align-items-center mt-2"
                    onClick={() => viewTodo(idx)}
                  >
                    <h4 className={todo.completed ? 'text-success' : 'text-danger'}>
                      {todo.title}
                    </h4>
                    <div>
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateTodo(idx);
                        }}
                      >
                        <span className="bi bi-pen text-warning"></span>
                      </button>
                      <button
                        className="btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTodo(todo.id);
                        }}
                      >
                        <span className="bi bi-trash text-danger"></span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-9 p-2">
          <div>
            <h3>{(isCreating && 'Create') || (isUpdating && 'Update') || (isViewing && '')} Todo</h3>
            <dl>
              <dt><label className="form-label">Title</label></dt>
              <dd>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  disabled={isViewing}
                  value={todo.title}
                  onChange={handleChange}
                />
              </dd>
              <dt><label className="form-label">Description</label></dt>
              <dd>
                <textarea
                  className="form-control"
                  name="description"
                  rows={5}
                  value={todo.description}
                  disabled={isViewing}
                  onChange={handleChange}
                />
              </dd>
              <dt><label className="form-label">Deadline</label></dt>
              <dd>
                <input
                  type="date"
                  name="deadline"
                  className="form-control-sm"
                  value={todo.deadline}
                  onChange={e=>{
                    if(isUpdating || isCreating) handleChange(e)}}
                />
              </dd>
              {!isCreating && (
                <dd>
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      name="completed"
                      className="form-check-input"
                      checked={todo.completed}
                      onChange={e=>{isUpdating && handleChange(e)}}
                    />
                    <label className="form-check-label">Completed</label>
                  </div>
                </dd>
              )}
              <dd>
                {isCreating && (
                  <button className="btn btn-success btn-md" onClick={createData}>
                    Create
                  </button>
                )}
                {isUpdating && (
                  <button className="btn btn-warning btn-md" onClick={() => updateData(todo.id)}>
                    Update
                  </button>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
