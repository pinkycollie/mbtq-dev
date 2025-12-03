/**
 * Keyboard Navigation Utilities
 * Provides utilities for managing keyboard navigation and focus
 */

export interface FocusableElement {
  element: HTMLElement;
  tabIndex: number;
}

export class KeyboardNavigationUtil {
  /**
   * Get all focusable elements in a container
   */
  static getFocusableElements(container: HTMLElement | Document = document): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelectors)
    );

    return elements.filter((el) => {
      return (
        el.offsetWidth > 0 &&
        el.offsetHeight > 0 &&
        !el.hasAttribute('hidden') &&
        window.getComputedStyle(el).visibility !== 'hidden'
      );
    });
  }

  /**
   * Trap focus within a container
   */
  static trapFocus(container: HTMLElement): () => void {
    const focusableElements = this.getFocusableElements(container);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * Move focus to first element in container
   */
  static focusFirst(container: HTMLElement): boolean {
    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return true;
    }
    return false;
  }

  /**
   * Handle arrow key navigation
   */
  static handleArrowNavigation(
    e: KeyboardEvent,
    elements: HTMLElement[],
    currentIndex: number,
    options: { vertical?: boolean; circular?: boolean } = {}
  ): number {
    const { vertical = false, circular = true } = options;
    const keys = vertical ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    const prevKey = keys[0];
    const nextKey = keys[1];

    if (e.key === prevKey) {
      e.preventDefault();
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = circular ? elements.length - 1 : 0;
      }
      elements[newIndex]?.focus();
      return newIndex;
    } else if (e.key === nextKey) {
      e.preventDefault();
      let newIndex = currentIndex + 1;
      if (newIndex >= elements.length) {
        newIndex = circular ? 0 : elements.length - 1;
      }
      elements[newIndex]?.focus();
      return newIndex;
    }

    return currentIndex;
  }

  /**
   * Create skip link functionality
   */
  static createSkipLink(targetId: string, linkText: string = 'Skip to main content'): HTMLElement {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = linkText;
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.cssText = `
        position: static;
        width: auto;
        height: auto;
      `;
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.cssText = `
        position: absolute;
        left: -10000px;
        top: auto;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
    });

    return skipLink;
  }

  /**
   * Check if element is focusable
   */
  static isFocusable(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    const nativelyFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
    
    if (nativelyFocusable) {
      return !element.hasAttribute('disabled');
    }

    const tabIndex = element.getAttribute('tabindex');
    return tabIndex !== null && tabIndex !== '-1';
  }
}
