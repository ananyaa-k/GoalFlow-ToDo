import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoSectionProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoSection: React.FC<TodoSectionProps> = ({
  todos,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo
}) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const completionRate = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Today's To-Dos</h2>
        <div className="text-sm text-gray-400">
          {completedCount}/{todos.length} completed ({completionRate}%)
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tasks for today. Add one above to get started!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                todo.completed
                  ? 'bg-green-900/20 border-green-500/30'
                  : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
              }`}
            >
              <button
                onClick={() => onToggleTodo(todo.id)}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {todo.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-white'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="text-gray-500 hover:text-red-400 transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-4 bg-gray-700/50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-cyan-400 font-mono">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoSection;