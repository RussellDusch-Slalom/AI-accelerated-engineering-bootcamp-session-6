import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    dueDate: '2025-12-25',
    completed: 0,
    createdAt: '2025-11-01T00:00:00Z'
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo title and due date', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText(/December 25, 2025/)).toBeInTheDocument();
  });

  it('should render unchecked checkbox when todo is incomplete', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox when todo is complete', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should show edit button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    expect(editButton).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should enter edit mode when edit button is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    const { container } = render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const card = container.querySelector('.todo-card');
    expect(card).toHaveClass('completed');
  });

  it('should not render due date when dueDate is null', () => {
    const todoNoDate = { ...mockTodo, dueDate: null };
    render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
    
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  // User Story 1: Visual Identification of Overdue Tasks (Priority: P1)
  describe('US1: Visual Identification of Overdue Tasks', () => {
    it('[T010] should render danger color styling for overdue incomplete todo', () => {
      const today = new Date(2025, 11, 5); // December 5, 2025
      const overdueTodo = {
        id: 1,
        title: 'Overdue Task',
        dueDate: '2025-11-30', // 5 days before today
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      const { container } = render(
        <TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />
      );

      const card = container.querySelector('.todo-card');
      expect(card).toHaveClass('card--overdue');
    });

    it('[T011] should NOT render danger color styling for on-time incomplete todo', () => {
      const today = new Date(2025, 11, 5); // December 5, 2025
      const onTimeTodo = {
        id: 1,
        title: 'On-time Task',
        dueDate: '2025-12-25', // 20 days in the future
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      const { container } = render(
        <TodoCard todo={onTimeTodo} {...mockHandlers} isLoading={false} />
      );

      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('card--overdue');
    });

    it('[T012] should NOT render danger color styling for completed todo (even if overdue)', () => {
      const completedOverdueTodo = {
        id: 1,
        title: 'Completed Overdue Task',
        dueDate: '2025-11-30', // 5 days before today
        completed: 1,
        createdAt: '2025-11-01T00:00:00Z'
      };

      const { container } = render(
        <TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />
      );

      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('card--overdue');
    });

    it('should render accessibility indicator for overdue status', () => {
      const overdueTodo = {
        id: 1,
        title: 'Overdue Task',
        dueDate: '2025-11-30',
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);

      // Check for aria-label that conveys "Overdue"
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('Overdue'));
    });
  });

  // User Story 2: Overdue Status Clarity (Priority: P2)
  describe('US2: Overdue Status Clarity - Days Overdue Display', () => {
    it('[T019] should display "5 days overdue" for 5-days-overdue incomplete todo', () => {
      const fiveDaysOverdueTodo = {
        id: 1,
        title: 'Overdue Task',
        dueDate: '2025-11-30', // 5 days before Dec 5
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      render(<TodoCard todo={fiveDaysOverdueTodo} {...mockHandlers} isLoading={false} />);

      expect(screen.getByText(/5 days overdue/i)).toBeInTheDocument();
    });

    it('[T020] should display "1 day overdue" for 1-day-overdue incomplete todo (singular)', () => {
      const oneDayOverdueTodo = {
        id: 1,
        title: 'Overdue Task',
        dueDate: '2025-12-04', // 1 day before Dec 5
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      render(<TodoCard todo={oneDayOverdueTodo} {...mockHandlers} isLoading={false} />);

      expect(screen.getByText(/1 day overdue/i)).toBeInTheDocument();
      expect(screen.queryByText(/1 days overdue/i)).not.toBeInTheDocument(); // Should NOT have plural
    });

    it('[T021] should NOT display overdue duration text for on-time todo', () => {
      const onTimeTodo = {
        id: 1,
        title: 'On-time Task',
        dueDate: '2025-12-25', // Future
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      render(<TodoCard todo={onTimeTodo} {...mockHandlers} isLoading={false} />);

      expect(screen.queryByText(/days? overdue/i)).not.toBeInTheDocument();
    });

    it('should NOT display overdue duration text for future todo', () => {
      const futureTodo = {
        id: 1,
        title: 'Future Task',
        dueDate: '2026-12-25',
        completed: 0,
        createdAt: '2025-11-01T00:00:00Z'
      };

      render(<TodoCard todo={futureTodo} {...mockHandlers} isLoading={false} />);

      expect(screen.queryByText(/days? overdue/i)).not.toBeInTheDocument();
    });

    it('should NOT display overdue duration text for completed todo', () => {
      const completedOverdueTodo = {
        id: 1,
        title: 'Completed Overdue Task',
        dueDate: '2025-11-30', // 5 days before Dec 5
        completed: 1,
        createdAt: '2025-11-01T00:00:00Z'
      };

      render(<TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />);

      expect(screen.queryByText(/days? overdue/i)).not.toBeInTheDocument();
    });
  });
});
