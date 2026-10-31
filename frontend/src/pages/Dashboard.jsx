import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tasks");
      setTasks(response.data.tasks || response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await api.post("/tasks", { title });
      const newTask = response.data.task || response.data;
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not add task.");
    }
  };

  const toggleTask = async (task) => {
    try {
      const response = await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      const updatedTask = response.data.task || response.data;

      setTasks((prev) =>
        prev.map((item) =>
          item._id === task._id ? updatedTask : item
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Could not update task.");
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const saveEdit = async (id) => {
    if (!editTitle.trim()) return;

    try {
      const response = await api.put(`/tasks/${id}`, {
        title: editTitle,
      });

      const updatedTask = response.data.task || response.data;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      setEditingId(null);
      setEditTitle("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not edit task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete task.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">

        <header className="dashboard-header">
          <div>
            <h1>Task Manager</h1>
            <p>Organize your day, achieve your goals.</p>
          </div>

          <div className="user-info">
            <span>Welcome, {user?.name || "User"}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="tasks-section">

          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Manage your daily tasks in one place.</p>
            </div>

            <span className="task-count">{tasks.length} Tasks</span>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              type="text"
              placeholder="Enter a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">+ Add Task</button>
          </form>

          {error && <p className="error-message">{error}</p>}

          {loading ? (
            <p className="empty-message">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks yet!</h3>
              <p>Add your first task and get started.</p>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((task) => (
                <li className="task-item" key={task._id}>

                  {editingId === task._id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={Boolean(task.completed)}
                        onChange={() => toggleTask(task)}
                      />
                      <span className={task.completed ? "completed-task" : ""}>
                        {task.title}
                      </span>
                    </label>
                  )}

                  <div className="task-actions">
                    {editingId === task._id ? (
                      <>
                        <button onClick={() => saveEdit(task._id)}>
                          Save
                        </button>
                        <button onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={() => startEditing(task)}>
                        Edit
                      </button>
                    )}

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>

                </li>
              ))}
            </ul>
          )}

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
  