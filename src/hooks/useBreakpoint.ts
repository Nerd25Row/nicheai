import { useState, useEffect } from 'react';
import { BREAKPOINT_VALUES } from '@/constants/breakpoints';

/**
 * Hook to detect current breakpoint
 * 
 * @example
 * ```tsx
 * const breakpoint = useBreakpoint();
 * 
 * if (breakpoint === 'lg' || breakpoint === 'xl') {
 *   // Desktop logic
 * }
 * ```
 */
export function useBreakpoint(): 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>(() => {
    if (typeof window === 'undefined') return 'sm';
    
    const width = window.innerWidth;
    if (width >= BREAKPOINT_VALUES['2xl']) return '2xl';
    if (width >= BREAKPOINT_VALUES.xl) return 'xl';
    if (width >= BREAKPOINT_VALUES.lg) return 'lg';
    if (width >= BREAKPOINT_VALUES.md) return 'md';
    return 'sm';
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= BREAKPOINT_VALUES['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= BREAKPOINT_VALUES.xl) {
        setBreakpoint('xl');
      } else if (width >= BREAKPOINT_VALUES.lg) {
        setBreakpoint('lg');
      } else if (width >= BREAKPOINT_VALUES.md) {
        setBreakpoint('md');
      } else {
        setBreakpoint('sm');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

/**
 * Hook to check if current breakpoint matches or exceeds a given breakpoint
 * 
 * @example
 * ```tsx
 * const isDesktop = useBreakpointAtLeast('lg');
 * const isTablet = useBreakpointAtLeast('md');
 * ```
 */
export function useBreakpointAtLeast(
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): boolean {
  const currentBreakpoint = useBreakpoint();
  
  const order = ['sm', 'md', 'lg', 'xl', '2xl'] as const;
  const currentIndex = order.indexOf(currentBreakpoint);
  const targetIndex = order.indexOf(breakpoint);
  
  return currentIndex >= targetIndex;
}

/**
 * Hook to check if current breakpoint is exactly a given breakpoint
 * 
 * @example
 * ```tsx
 * const isTablet = useBreakpointIs('md');
 * ```
 */
export function useBreakpointIs(
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): boolean {
  const currentBreakpoint = useBreakpoint();
  return currentBreakpoint === breakpoint;
}


