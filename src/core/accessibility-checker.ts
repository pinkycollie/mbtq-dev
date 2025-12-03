/**
 * Core Accessibility Checker Module
 * Provides comprehensive accessibility validation and checking
 */

export interface AccessibilityIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  message: string;
  element?: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriteria: string;
  helpUrl?: string;
  suggestion?: string;
}

export interface AccessibilityCheckResult {
  passed: boolean;
  totalIssues: number;
  errors: AccessibilityIssue[];
  warnings: AccessibilityIssue[];
  info: AccessibilityIssue[];
  summary: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
}

export class AccessibilityChecker {
  private issues: AccessibilityIssue[] = [];
  private wcagLevel: 'A' | 'AA' | 'AAA' = 'AA';

  constructor(wcagLevel: 'A' | 'AA' | 'AAA' = 'AA') {
    this.wcagLevel = wcagLevel;
  }

  /**
   * Check HTML content for accessibility issues
   */
  checkHtml(html: string): AccessibilityCheckResult {
    this.issues = [];

    // Check for basic accessibility issues
    this.checkImages(html);
    this.checkHeadings(html);
    this.checkForms(html);
    this.checkLinks(html);
    this.checkLandmarks(html);
    this.checkLanguage(html);
    this.checkTabIndex(html);

    return this.getResults();
  }

  /**
   * Get WCAG level
   */
  getWcagLevel(): 'A' | 'AA' | 'AAA' {
    return this.wcagLevel;
  }

  /**
   * Check if images have alt text
   */
  private checkImages(html: string): void {
    const imgRegex = /<img[^>]*>/gi;
    const images = html.match(imgRegex) || [];

    images.forEach((img, index) => {
      if (!img.includes('alt=')) {
        this.addIssue({
          id: `img-alt-${index}`,
          type: 'error',
          severity: 'critical',
          message: 'Image missing alt attribute',
          element: img,
          wcagLevel: 'A',
          wcagCriteria: '1.1.1',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content',
          suggestion: 'Add descriptive alt text to all images',
        });
      } else if (img.includes('alt=""') && !img.includes('role="presentation"')) {
        this.addIssue({
          id: `img-empty-alt-${index}`,
          type: 'warning',
          severity: 'moderate',
          message: 'Image has empty alt text without presentation role',
          element: img,
          wcagLevel: 'A',
          wcagCriteria: '1.1.1',
          suggestion: 'Empty alt should only be used for decorative images',
        });
      }
    });
  }

  /**
   * Check heading structure and hierarchy
   */
  private checkHeadings(html: string): void {
    const headingRegex = /<h([1-6])[^>]*>.*?<\/h\1>/gi;
    const matchesArray = html.match(headingRegex);
    
    if (!matchesArray) {
      this.addIssue({
        id: 'no-headings',
        type: 'warning',
        severity: 'moderate',
        message: 'No heading elements found',
        wcagLevel: 'AA',
        wcagCriteria: '2.4.6',
        suggestion: 'Use heading elements to structure content',
      });
      return;
    }

    const headings: Array<{ level: number; text: string }> = [];
    matchesArray.forEach((match) => {
      const levelMatch = match.match(/<h([1-6])/);
      if (levelMatch) {
        headings.push({ level: parseInt(levelMatch[1]), text: match });
      }
    });
    
    let previousLevel = 0;
    headings.forEach((heading, index) => {
      const level = heading.level;
      
      if (index === 0 && level !== 1) {
        this.addIssue({
          id: 'first-heading-not-h1',
          type: 'warning',
          severity: 'moderate',
          message: `First heading should be h1, found h${level}`,
          element: heading.text,
          wcagLevel: 'AA',
          wcagCriteria: '2.4.6',
          suggestion: 'Start document with h1 heading',
        });
      }

      if (previousLevel > 0 && level > previousLevel + 1) {
        this.addIssue({
          id: `heading-skip-${index}`,
          type: 'warning',
          severity: 'moderate',
          message: `Heading level skipped from h${previousLevel} to h${level}`,
          element: heading.text,
          wcagLevel: 'AA',
          wcagCriteria: '2.4.6',
          suggestion: 'Maintain proper heading hierarchy',
        });
      }

      previousLevel = level;
    });
  }

  /**
   * Check form accessibility
   */
  private checkForms(html: string): void {
    const inputRegex = /<input[^>]*>/gi;
    const inputs = html.match(inputRegex) || [];

    inputs.forEach((input, index) => {
      const hasLabel = this.hasAssociatedLabel(input, html);
      const hasAriaLabel = input.includes('aria-label=') || input.includes('aria-labelledby=');
      
      if (!hasLabel && !hasAriaLabel && !input.includes('type="hidden"')) {
        this.addIssue({
          id: `input-label-${index}`,
          type: 'error',
          severity: 'critical',
          message: 'Form input missing label',
          element: input,
          wcagLevel: 'A',
          wcagCriteria: '4.1.2',
          suggestion: 'Add a label element or aria-label attribute',
        });
      }
    });
  }

  /**
   * Check if input has associated label
   */
  private hasAssociatedLabel(input: string, html: string): boolean {
    const idMatch = input.match(/id="([^"]+)"/);
    if (idMatch) {
      const id = idMatch[1];
      return html.includes(`for="${id}"`);
    }
    return false;
  }

  /**
   * Check link accessibility
   */
  private checkLinks(html: string): void {
    const linkRegex = /<a[^>]*>.*?<\/a>/gi;
    const linksArray = html.match(linkRegex) || [];

    linksArray.forEach((link, index) => {
      const linkText = link.replace(/<[^>]*>/g, '').trim();
      
      if (!linkText && !link.includes('aria-label=')) {
        this.addIssue({
          id: `link-text-${index}`,
          type: 'error',
          severity: 'critical',
          message: 'Link has no accessible text',
          element: link,
          wcagLevel: 'A',
          wcagCriteria: '2.4.4',
          suggestion: 'Add descriptive link text or aria-label',
        });
      }

      if (linkText.toLowerCase() === 'click here' || linkText.toLowerCase() === 'read more') {
        this.addIssue({
          id: `link-vague-${index}`,
          type: 'warning',
          severity: 'moderate',
          message: `Vague link text: "${linkText}"`,
          element: link,
          wcagLevel: 'AA',
          wcagCriteria: '2.4.4',
          suggestion: 'Use descriptive link text that makes sense out of context',
        });
      }
    });
  }

  /**
   * Check landmark regions
   */
  private checkLandmarks(html: string): void {
    const hasMain = /<main[\s>]/.test(html) || /role="main"/.test(html);

    if (!hasMain) {
      this.addIssue({
        id: 'no-main-landmark',
        type: 'warning',
        severity: 'moderate',
        message: 'No main landmark found',
        wcagLevel: 'AA',
        wcagCriteria: '2.4.1',
        suggestion: 'Add a <main> element or role="main"',
      });
    }
  }

  /**
   * Check language declaration
   */
  private checkLanguage(html: string): void {
    if (!/<html[^>]*lang=/.test(html)) {
      this.addIssue({
        id: 'no-lang',
        type: 'error',
        severity: 'serious',
        message: 'HTML element missing lang attribute',
        wcagLevel: 'A',
        wcagCriteria: '3.1.1',
        suggestion: 'Add lang attribute to html element',
      });
    }
  }

  /**
   * Check tabindex usage
   */
  private checkTabIndex(html: string): void {
    const tabindexRegex = /tabindex="(\d+)"/gi;
    const matchesArray = html.match(tabindexRegex) || [];

    matchesArray.forEach((match, index) => {
      const valueMatch = match.match(/tabindex="(\d+)"/i);
      if (valueMatch) {
        const value = parseInt(valueMatch[1]);
        if (value > 0) {
          this.addIssue({
            id: `tabindex-positive-${index}`,
            type: 'warning',
            severity: 'moderate',
            message: `Positive tabindex value (${value}) found`,
            wcagLevel: 'AA',
            wcagCriteria: '2.4.3',
            suggestion: 'Avoid positive tabindex values; use 0 or -1',
          });
        }
      }
    });
  }

  /**
   * Add an issue to the list
   */
  private addIssue(issue: AccessibilityIssue): void {
    this.issues.push(issue);
  }

  /**
   * Get check results
   */
  private getResults(): AccessibilityCheckResult {
    const errors = this.issues.filter((i) => i.type === 'error');
    const warnings = this.issues.filter((i) => i.type === 'warning');
    const info = this.issues.filter((i) => i.type === 'info');

    const summary = {
      critical: this.issues.filter((i) => i.severity === 'critical').length,
      serious: this.issues.filter((i) => i.severity === 'serious').length,
      moderate: this.issues.filter((i) => i.severity === 'moderate').length,
      minor: this.issues.filter((i) => i.severity === 'minor').length,
    };

    return {
      passed: errors.length === 0,
      totalIssues: this.issues.length,
      errors,
      warnings,
      info,
      summary,
    };
  }

  /**
   * Set WCAG conformance level
   */
  setWcagLevel(level: 'A' | 'AA' | 'AAA'): void {
    this.wcagLevel = level;
  }
}
