import React from 'react';
import TodoCard from './TodoCard';
import { isOverdue } from '../utils/overdue';

function TodoList({ todos, onToggle, onEdit, onDelete, isLoading }) {
  // Calculate aggregate overdue count (incomplete todos that are overdue)
  const overdueTodosCount = todos.filter(
    (todo) => !todo.completed && isOverdue(todo.dueDate)
  ).length;
  if (todos.length === 0) {
    return (
      <div className="todo-list empty-state">
        <p className="empty-state-message">
          No todos yet. Add one to get started! 👻
        </p>
      </div>
    );
  }

  // Format header with aggregate overdue count
  const headerText = overdueTodosCount > 0
    ? `My Todos (${overdueTodosCount} overdue)`
    : 'My Todos';

  return (
    <div className="todo-list">
      <h2 className="todo-list-header">{headerText}</h2>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default TodoList;
