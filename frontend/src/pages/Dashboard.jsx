import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const STATUS_LABELS = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Create form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await API.post("/tasks", { title, description: description || undefined });
      toast.success("Task added!");
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;
    try {
      await API.put(`/tasks/${id}`, { title: editTitle, description: editDescription || undefined });
      toast.success("Task updated!");
      setEditingId(null);
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5h6" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900">Task Manager</h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Add task form */}
        <form onSubmit={createTask} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">New Task</h2>
          <div className="space-y-3">
            <input
              value={title}
              placeholder="Task title *"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <textarea
              value={description}
              placeholder="Description (optional)"
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition cursor-pointer"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>

        {/* Task stats */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Your Tasks</h2>
          <span className="text-sm text-slate-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {/* Task list */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="mt-3 text-sm text-slate-500">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-700">No tasks yet</h3>
            <p className="text-sm text-slate-500 mt-1">Add your first task above to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition hover:shadow-md"
              >
                {editingId === task.id ? (
                  /* Edit mode */
                  <div className="p-5 space-y-3">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Task title *"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                      placeholder="Description (optional)"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={cancelEditing}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => updateTask(task.id)}
                        className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 mb-1">
                          <h3 className="font-medium text-slate-900 truncate">{task.title}</h3>
                          {task.status && (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${STATUS_COLORS[task.status] || "bg-slate-100 text-slate-600"}`}>
                              {STATUS_LABELS[task.status] || task.status}
                            </span>
                          )}
                        </div>
                        {task.description && (
                          <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                        )}
                        {task.createdAt && (
                          <p className="text-xs text-slate-400 mt-2">
                            Created {new Date(task.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => startEditing(task)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                          title="Edit task"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Delete task"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;