'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'canon' | 'guild' | 'fellowship' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: 'bg-slate-100 text-slate-900',
  canon: 'bg-canon-secondary text-white',
  guild: 'bg-guild-secondary text-white',
  fellowship: 'bg-fellowship-secondary text-white',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

// Status badge that maps status strings to appropriate variants
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: string;
}

export function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const getVariant = (status: string): BadgeProps['variant'] => {
    switch (status.toLowerCase()) {
      case 'pass':
      case 'approved':
      case 'active':
      case 'completed':
        return 'success';
      case 'pending':
      case 'upcoming':
        return 'warning';
      case 'not_yet':
      case 'rejected':
      case 'failed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const formatStatus = (status: string): string => {
    return status
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Badge variant={getVariant(status)} {...props}>
      {formatStatus(status)}
    </Badge>
  );
}

// Layer badge
export interface LayerBadgeProps extends Omit<BadgeProps, 'variant'> {
  layer: 'canon' | 'guild' | 'fellowship';
}

export function LayerBadge({ layer, ...props }: LayerBadgeProps) {
  const labels = {
    canon: 'The Canon',
    guild: 'The Guild',
    fellowship: 'The Fellowship',
  };

  return (
    <Badge variant={layer} {...props}>
      {labels[layer]}
    </Badge>
  );
}
