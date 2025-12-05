import { isOverdue, daysOverdue, formatDaysOverdue } from '../overdue';

describe('overdue utility functions', () => {
  // Test dates for consistent testing
  const today = new Date(2025, 11, 5); // December 5, 2025
  const yesterday = new Date(2025, 11, 4); // December 4, 2025
  const tomorrow = new Date(2025, 11, 6); // December 6, 2025
  const fiveDaysAgo = new Date(2025, 11, 0); // November 30, 2025 (5 days before Dec 5)
  const thirtyDaysAgo = new Date(2025, 10, 5); // November 5, 2025 (30 days before Dec 5)

  describe('isOverdue()', () => {
    it('should return false for null dueDate', () => {
      expect(isOverdue(null, today)).toBe(false);
    });

    it('should return false for undefined dueDate', () => {
      expect(isOverdue(undefined, today)).toBe(false);
    });

    it('should return false for empty string dueDate', () => {
      expect(isOverdue('', today)).toBe(false);
    });

    it('should return false for invalid date format', () => {
      expect(isOverdue('invalid-date', today)).toBe(false);
    });

    it('should return false for today\'s due date', () => {
      const todayStr = '2025-12-05';
      expect(isOverdue(todayStr, today)).toBe(false);
    });

    it('should return false for future due date', () => {
      const tomorrowStr = '2025-12-06';
      expect(isOverdue(tomorrowStr, today)).toBe(false);
    });

    it('should return false for 30 days in the future', () => {
      const futureStr = '2026-01-04'; // 30 days after Dec 5, 2025
      expect(isOverdue(futureStr, today)).toBe(false);
    });

    it('should return true for yesterday\'s due date', () => {
      const yesterdayStr = '2025-12-04';
      expect(isOverdue(yesterdayStr, today)).toBe(true);
    });

    it('should return true for 5 days ago due date', () => {
      const fiveDaysAgoStr = '2025-11-30';
      expect(isOverdue(fiveDaysAgoStr, today)).toBe(true);
    });

    it('should return true for 30 days ago due date', () => {
      const thirtyDaysAgoStr = '2025-11-05';
      expect(isOverdue(thirtyDaysAgoStr, today)).toBe(true);
    });

    it('should handle ISO full format dates (YYYY-MM-DDTHH:mm:ss)', () => {
      const pastIsoStr = '2025-11-30T14:30:00';
      expect(isOverdue(pastIsoStr, today)).toBe(true);
    });

    it('should handle ISO dates with Z timezone', () => {
      const pastIsoStr = '2025-11-30T10:00:00Z';
      expect(isOverdue(pastIsoStr, today)).toBe(true);
    });

    it('should use default today if nowDate not provided', () => {
      // This test verifies the function uses current date by default
      // We can't be too specific since it depends on actual current date,
      // but we can verify it doesn't throw
      expect(() => {
        isOverdue('2020-01-01');
      }).not.toThrow();
    });
  });

  describe('daysOverdue()', () => {
    it('should return null for null dueDate', () => {
      expect(daysOverdue(null, today)).toBe(null);
    });

    it('should return null for undefined dueDate', () => {
      expect(daysOverdue(undefined, today)).toBe(null);
    });

    it('should return null for future due date', () => {
      const tomorrowStr = '2025-12-06';
      expect(daysOverdue(tomorrowStr, today)).toBe(null);
    });

    it('should return null for today\'s due date', () => {
      const todayStr = '2025-12-05';
      expect(daysOverdue(todayStr, today)).toBe(null);
    });

    it('should return null for invalid date format', () => {
      expect(daysOverdue('invalid-date', today)).toBe(null);
    });

    it('should return 1 for yesterday\'s due date', () => {
      const yesterdayStr = '2025-12-04';
      expect(daysOverdue(yesterdayStr, today)).toBe(1);
    });

    it('should return 5 for 5 days ago due date', () => {
      const fiveDaysAgoStr = '2025-11-30';
      expect(daysOverdue(fiveDaysAgoStr, today)).toBe(5);
    });

    it('should return 30 for 30 days ago due date', () => {
      const thirtyDaysAgoStr = '2025-11-05';
      expect(daysOverdue(thirtyDaysAgoStr, today)).toBe(30);
    });

    it('should return at least 1 day for any overdue date', () => {
      const yesterdayStr = '2025-12-04';
      const result = daysOverdue(yesterdayStr, today);
      expect(result).toBeGreaterThanOrEqual(1);
    });

    it('should handle off-by-one cases: Dec 4 to Dec 5 is 1 day', () => {
      const dueDateStr = '2025-12-04';
      expect(daysOverdue(dueDateStr, today)).toBe(1);
    });

    it('should handle off-by-one cases: Nov 30 to Dec 5 is 5 days', () => {
      const dueDateStr = '2025-11-30';
      expect(daysOverdue(dueDateStr, today)).toBe(5);
    });

    it('should handle month boundary: Oct 31 to Nov 1 is 1 day', () => {
      const refDate = new Date(2025, 10, 1); // Nov 1, 2025
      const dueDateStr = '2025-10-31';
      expect(daysOverdue(dueDateStr, refDate)).toBe(1);
    });

    it('should handle year boundary: Dec 31 to Jan 1 is 1 day', () => {
      const refDate = new Date(2026, 0, 1); // Jan 1, 2026
      const dueDateStr = '2025-12-31';
      expect(daysOverdue(dueDateStr, refDate)).toBe(1);
    });
  });

  describe('formatDaysOverdue()', () => {
    it('should return empty string for null', () => {
      expect(formatDaysOverdue(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatDaysOverdue(undefined)).toBe('');
    });

    it('should return empty string for 0', () => {
      expect(formatDaysOverdue(0)).toBe('');
    });

    it('should return singular form for 1 day', () => {
      expect(formatDaysOverdue(1)).toBe('1 day overdue');
    });

    it('should return plural form for 2 days', () => {
      expect(formatDaysOverdue(2)).toBe('2 days overdue');
    });

    it('should return plural form for 5 days', () => {
      expect(formatDaysOverdue(5)).toBe('5 days overdue');
    });

    it('should return plural form for 30 days', () => {
      expect(formatDaysOverdue(30)).toBe('30 days overdue');
    });

    it('should handle large day counts', () => {
      expect(formatDaysOverdue(365)).toBe('365 days overdue');
    });
  });
});
