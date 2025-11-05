/**
 * Responsive Breakpoints
 * 
 * These breakpoints are consistent across the entire application.
 * Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:) in your classes.
 * 
 * @example
 * ```tsx
 * <div className="w-full md:w-1/2 lg:w-1/3">
 *   Responsive content
 * </div>
 * ```
 * 
 * Breakpoint Guidelines:
 * - Mobile First: Design for mobile (default), then enhance for larger screens
 * - Use `md:` for tablets and small desktops (768px+)
 * - Use `lg:` for standard desktops (1024px+)
 * - Use `xl:` for large desktops (1280px+)
 * - Use `2xl:` for extra large screens (1536px+)
 */

export const BREAKPOINTS = {
  /**
   * Small devices (landscape phones)
   * 640px and up
   */
  sm: '640px',
  
  /**
   * Medium devices (tablets)
   * 768px and up
   */
  md: '768px',
  
  /**
   * Large devices (desktops)
   * 1024px and up
   */
  lg: '1024px',
  
  /**
   * Extra large devices (large desktops)
   * 1280px and up
   */
  xl: '1280px',
  
  /**
   * 2X Extra large devices (larger desktops)
   * 1536px and up
   */
  '2xl': '1536px',
} as const;

/**
 * Breakpoint values as numbers (for use in JavaScript/TypeScript logic)
 */
export const BREAKPOINT_VALUES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Media query strings for use in JavaScript
 */
export const MEDIA_QUERIES = {
  sm: `(min-width: ${BREAKPOINTS.sm})`,
  md: `(min-width: ${BREAKPOINTS.md})`,
  lg: `(min-width: ${BREAKPOINTS.lg})`,
  xl: `(min-width: ${BREAKPOINTS.xl})`,
  '2xl': `(min-width: ${BREAKPOINTS['2xl']})`,
} as const;

/**
 * Common responsive patterns
 */
export const RESPONSIVE_PATTERNS = {
  /**
   * Mobile-first: Full width on mobile, constrained on larger screens
   */
  container: {
    mobile: 'w-full',
    tablet: 'md:w-[768px]',
    desktop: 'lg:w-[1024px]',
    wide: 'xl:w-[1280px]',
  },
  
  /**
   * Grid columns
   */
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    wide: 'xl:grid-cols-4',
  },
  
  /**
   * Spacing
   */
  spacing: {
    mobile: 'p-4',
    tablet: 'md:p-6',
    desktop: 'lg:p-8',
  },
  
  /**
   * Typography
   */
  typography: {
    heading: {
      mobile: 'text-2xl',
      tablet: 'md:text-3xl',
      desktop: 'lg:text-4xl',
    },
    body: {
      mobile: 'text-sm',
      tablet: 'md:text-base',
      desktop: 'lg:text-lg',
    },
  },
} as const;

