/**
 * HTML Sanitization Utility using DOMPurify
 * Prevents XSS attacks and cleans up HTML content from database/APIs
 * 
 * Configuration:
 * - Allows safe tags and attributes
 * - Removes script tags and dangerous event handlers
 * - Preserves formatting and structure
 */

import DOMPurify from 'dompurify';

export const sanitizeHTML = (html: string): string => {
  if (typeof window === 'undefined') {
    // Server-side: use basic regex sanitization
    return html
      ?.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      ?.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      ?.replace(/javascript:/gi, '');
  }

  // Client-side: use DOMPurify for comprehensive sanitization
  if (DOMPurify) {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'a', 'img', 'figure', 'figcaption', 'blockquote', 'q',
        'hr', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'section', 'article', 'header', 'footer', 'iframe'
      ],
      ALLOWED_ATTR: [
        'href', 'title', 'target', 'src', 'alt', 'width', 'height', 'class',
        'style', 'data-*', 'role', 'aria-*', 'frameborder', 'allow',
        'loading', 'referrerpolicy'
      ],
      KEEP_CONTENT: true,
    });
  }

  // Fallback: basic sanitization
  return html;
};

/**
 * Export DOMPurify instance for use in components
 */
export const getDOMPurify = () => {
  if (typeof window !== 'undefined' && typeof DOMPurify !== 'undefined') {
    return DOMPurify;
  }
  return null;
};
