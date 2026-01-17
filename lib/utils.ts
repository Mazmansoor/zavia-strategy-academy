import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isAfter, isBefore, addDays } from 'date-fns';

// Tailwind class name utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting
export function formatDate(date: Date | null | undefined): string {
  if (!date) return 'N/A';
  return format(date, 'MMM d, yyyy');
}

export function formatDateTime(date: Date | null | undefined): string {
  if (!date) return 'N/A';
  return format(date, 'MMM d, yyyy h:mm a');
}

export function formatRelativeTime(date: Date | null | undefined): string {
  if (!date) return 'N/A';
  return formatDistanceToNow(date, { addSuffix: true });
}

// Price formatting
export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Stripe amounts are in cents
}

export function formatPriceDollars(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Percentage calculation
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// Module progress helpers
export function getModuleProgress(
  lessonsCompleted: number[],
  totalLessons: number
): { completed: number; total: number; percentage: number } {
  return {
    completed: lessonsCompleted.length,
    total: totalLessons,
    percentage: calculateProgress(lessonsCompleted.length, totalLessons),
  };
}

// Status badge colors
export function getStatusColor(status: string): string {
  switch (status) {
    case 'pass':
    case 'approved':
    case 'active':
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-800';
    case 'not_yet':
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Layer colors
export function getLayerColor(layer: 'canon' | 'guild' | 'fellowship'): {
  bg: string;
  text: string;
  border: string;
  accent: string;
} {
  switch (layer) {
    case 'canon':
      return {
        bg: 'bg-canon-primary',
        text: 'text-canon-primary',
        border: 'border-canon-primary',
        accent: 'bg-canon-accent',
      };
    case 'guild':
      return {
        bg: 'bg-guild-primary',
        text: 'text-guild-primary',
        border: 'border-guild-primary',
        accent: 'bg-guild-accent',
      };
    case 'fellowship':
      return {
        bg: 'bg-fellowship-primary',
        text: 'text-fellowship-primary',
        border: 'border-fellowship-primary',
        accent: 'bg-fellowship-accent',
      };
  }
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Slugify string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Check if date is in the past
export function isPast(date: Date): boolean {
  return isBefore(date, new Date());
}

// Check if date is in the future
export function isFuture(date: Date): boolean {
  return isAfter(date, new Date());
}

// Get days until date
export function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Local storage helpers (with SSR safety)
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Error saving to localStorage');
  }
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Generate random ID
export function generateId(): string {
  return crypto.randomUUID();
}

// Validate URL
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Parse query string
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

// Build query string
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}
