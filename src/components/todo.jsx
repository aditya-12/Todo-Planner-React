import { useState } from "react";

const todo = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    if (task.trim() === "") {
      return alert("Please enter a task");
    }
    const newTodo = {
      id: Date.now(),
      task: task,
      completed: false,
    };
    setTaskList([...taskList, newTodo]);
    setTask("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleToggleComplete = (id) => {
    const updateTask = taskList.map((t) =>
      t.id == id ? { ...t, completed: !t.completed } : t
    );
    setTaskList(updateTask);
  };

  const handleDeleteTask = (id) => {
    const filtered = taskList.filter((t) => t.id !== id);
    setTaskList(filtered);
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <div className="max-w-md w-full bg-grey-800 shadow-lg rounded-lg p-6">
        <h1 className=" text-center font-bold text-2xl mb-4 text-cyan-400">
          Todo Planner
        </h1>
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus-outline-none focus:ring-2 focus:ring-cyan-500"
            type="text"
            placeholder="Enter a new Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
        {/* Task List */}
        <ul className="flex flex-col gap-3">
          {taskList.length == 0 ? (
            <p>No Task yet. Add One!</p>
          ) : (
            taskList.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center bg-gray-700 px-4 py-3 rounded-lg hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => {
                      handleToggleComplete(t.id);
                    }}
                    className="h-4 w-4 accent-cyan-500"
                  />
                  <span
                    className={`text-lg${t.completed ? " line-through text-gray-400 transition-all duration-300" : "text-white"}`}
                  >
                    {t.task}
                  </span>
                </div>
                <button
                  className="text-sm text-red-400 hover:text-red-500"
                  onClick={() => {
                    handleDeleteTask(t.id);
                  }}
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default todo;
