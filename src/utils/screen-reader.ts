/**
 * Screen Reader Utilities
 * Provides utilities for screen reader support
 */

export class ScreenReaderUtil {
  /**
   * Create a live region for announcements
   */
  static createLiveRegion(
    role: 'status' | 'alert' | 'log' = 'status',
    politeness: 'polite' | 'assertive' = 'polite'
  ): HTMLElement {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', role);
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;

    document.body.appendChild(liveRegion);
    return liveRegion;
  }

  /**
   * Announce message to screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const liveRegion = this.createLiveRegion('status', priority);
    liveRegion.textContent = message;

    // Clean up after announcement
    setTimeout(() => {
      liveRegion.remove();
    }, 1000);
  }

  /**
   * Create visually hidden but screen-reader accessible text
   */
  static createSrOnlyText(text: string): HTMLSpanElement {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    span.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `;
    return span;
  }

  /**
   * Add screen reader only description to element
   */
  static addDescription(element: HTMLElement, description: string): void {
    const descId = `desc-${Math.random().toString(36).slice(2, 11)}`;
    const descElement = document.createElement('span');
    descElement.id = descId;
    descElement.className = 'sr-only';
    descElement.textContent = description;
    descElement.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    `;

    element.appendChild(descElement);
    element.setAttribute('aria-describedby', descId);
  }

  /**
   * Get CSS for screen reader only content
   */
  static getSrOnlyStyles(): string {
    return `
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .sr-only-focusable:focus,
      .sr-only-focusable:active {
        position: static;
        width: auto;
        height: auto;
        overflow: visible;
        clip: auto;
        white-space: normal;
      }
    `;
  }

  /**
   * Check if element is accessible to screen readers
   */
  static isAccessibleToScreenReaders(element: HTMLElement): boolean {
    if (element.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return false;
    }

    return true;
  }

  /**
   * Create loading announcement
   */
  static announceLoading(message: string = 'Loading...'): HTMLElement {
    const liveRegion = this.createLiveRegion('status', 'polite');
    liveRegion.textContent = message;
    return liveRegion;
  }

  /**
   * Remove loading announcement
   */
  static removeLoadingAnnouncement(
    liveRegion: HTMLElement,
    completeMessage: string = 'Loading complete'
  ): void {
    liveRegion.textContent = completeMessage;
    setTimeout(() => {
      liveRegion.remove();
    }, 1000);
  }
}
