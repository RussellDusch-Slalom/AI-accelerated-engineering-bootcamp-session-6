import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  const mockTodos = [
    {
      id: 1,
      title: 'Todo 1',
      dueDate: '2025-12-25',
      completed: 0,
      createdAt: '2025-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Todo 2',
      dueDate: null,
      completed: 1,
      createdAt: '2025-11-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when todos array is empty', () => {
    render(<TodoList todos={[]} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText(/No todos yet. Add one to get started!/)).toBeInTheDocument();
  });

  it('should render all todos when provided', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render correct number of todo cards', () => {
    const { container } = render(
      <TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards).toHaveLength(2);
  });

  it('should pass handlers to TodoCard components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    // Verify that edit buttons exist for each todo
    expect(screen.getAllByLabelText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete/)).toHaveLength(2);
  });

  // User Story 3: Bulk Awareness of Overdue Workload (Priority: P3)
  describe('US3: Bulk Awareness of Overdue Workload - Aggregate Count', () => {
    it('[T028] should display "My Todos (3 overdue)" when 3 incomplete todos are overdue', () => {
      const todosWithThreeOverdue = [
        {
          id: 1,
          title: 'Overdue Todo 1',
          dueDate: '2025-11-30', // 5 days before Dec 5
          completed: 0,
          createdAt: '2025-11-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'Overdue Todo 2',
          dueDate: '2025-12-01', // 4 days before Dec 5
          completed: 0,
          createdAt: '2025-11-02T00:00:00Z'
        },
        {
          id: 3,
          title: 'Overdue Todo 3',
          dueDate: '2025-12-02', // 3 days before Dec 5
          completed: 0,
          createdAt: '2025-11-03T00:00:00Z'
        },
        {
          id: 4,
          title: 'On-time Todo',
          dueDate: '2025-12-25',
          completed: 0,
          createdAt: '2025-11-04T00:00:00Z'
        }
      ];

      render(<TodoList todos={todosWithThreeOverdue} {...mockHandlers} isLoading={false} />);

      expect(screen.getByText(/My Todos \(3 overdue\)/i)).toBeInTheDocument();
    });

    it('[T029] should display just "My Todos" when 0 overdue items', () => {
      const todosNoOverdue = [
        {
          id: 1,
          title: 'On-time Todo',
          dueDate: '2025-12-25',
          completed: 0,
          createdAt: '2025-11-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'Another On-time Todo',
          dueDate: '2025-12-31',
          completed: 0,
          createdAt: '2025-11-02T00:00:00Z'
        }
      ];

      render(<TodoList todos={todosNoOverdue} {...mockHandlers} isLoading={false} />);

      expect(screen.getByText(/^My Todos$/i)).toBeInTheDocument();
      expect(screen.queryByText(/My Todos \(\d+ overdue\)/i)).not.toBeInTheDocument();
    });

    it('[T030] should display "My Todos (1 overdue)" with singular text when 1 overdue item', () => {
      const todosWithOneOverdue = [
        {
          id: 1,
          title: 'Overdue Todo',
          dueDate: '2025-12-04', // 1 day before Dec 5
          completed: 0,
          createdAt: '2025-11-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'On-time Todo',
          dueDate: '2025-12-25',
          completed: 0,
          createdAt: '2025-11-02T00:00:00Z'
        }
      ];

      render(<TodoList todos={todosWithOneOverdue} {...mockHandlers} isLoading={false} />);

      expect(screen.getByText(/My Todos \(1 overdue\)/i)).toBeInTheDocument();
    });

    it('should NOT count completed todos as overdue', () => {
      const todosWithCompletedOverdue = [
        {
          id: 1,
          title: 'Completed Overdue Todo',
          dueDate: '2025-11-30', // Overdue but completed
          completed: 1,
          createdAt: '2025-11-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'Incomplete Overdue Todo',
          dueDate: '2025-12-04', // Overdue and incomplete
          completed: 0,
          createdAt: '2025-11-02T00:00:00Z'
        }
      ];

      render(<TodoList todos={todosWithCompletedOverdue} {...mockHandlers} isLoading={false} />);

      // Should show 1 overdue (only the incomplete one), not 2
      expect(screen.getByText(/My Todos \(1 overdue\)/i)).toBeInTheDocument();
    });

    it('should NOT count todos without due dates as overdue', () => {
      const todosWithNoDueDates = [
        {
          id: 1,
          title: 'No Due Date Todo',
          dueDate: null,
          completed: 0,
          createdAt: '2025-11-01T00:00:00Z'
        },
        {
          id: 2,
          title: 'Overdue Todo',
          dueDate: '2025-11-30',
          completed: 0,
          createdAt: '2025-11-02T00:00:00Z'
        }
      ];

      render(<TodoList todos={todosWithNoDueDates} {...mockHandlers} isLoading={false} />);

      // Should show 1 overdue (only the one with due date in past)
      expect(screen.getByText(/My Todos \(1 overdue\)/i)).toBeInTheDocument();
    });
  });
});
