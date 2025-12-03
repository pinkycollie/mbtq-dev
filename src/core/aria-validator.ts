/**
 * ARIA Attributes Validator
 * Validates ARIA attributes and roles for proper usage
 */

export interface AriaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class AriaValidator {
  private static readonly VALID_ROLES = [
    'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
    'checkbox', 'columnheader', 'combobox', 'complementary', 'contentinfo',
    'definition', 'dialog', 'directory', 'document', 'feed', 'figure', 'form',
    'grid', 'gridcell', 'group', 'heading', 'img', 'link', 'list', 'listbox',
    'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar', 'menuitem',
    'menuitemcheckbox', 'menuitemradio', 'navigation', 'none', 'note',
    'option', 'presentation', 'progressbar', 'radio', 'radiogroup', 'region',
    'row', 'rowgroup', 'rowheader', 'scrollbar', 'search', 'searchbox',
    'separator', 'slider', 'spinbutton', 'status', 'switch', 'tab', 'table',
    'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip',
    'tree', 'treegrid', 'treeitem',
  ];

  private static readonly REQUIRED_ARIA_PROPS: Record<string, string[]> = {
    checkbox: ['aria-checked'],
    combobox: ['aria-expanded', 'aria-controls'],
    radio: ['aria-checked'],
    scrollbar: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
    slider: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
    spinbutton: ['aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
    switch: ['aria-checked'],
    tab: ['aria-selected'],
    tabpanel: ['aria-labelledby'],
  };

  /**
   * Validate a role attribute
   */
  static validateRole(role: string): AriaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!role) {
      errors.push('Role attribute is empty');
      return { isValid: false, errors, warnings };
    }

    if (!this.VALID_ROLES.includes(role.toLowerCase())) {
      errors.push(`Invalid ARIA role: "${role}"`);
      return { isValid: false, errors, warnings };
    }

    return { isValid: true, errors, warnings };
  }

  /**
   * Validate ARIA attributes for a given role
   */
  static validateAriaAttributes(
    role: string,
    attributes: Record<string, string>
  ): AriaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required properties
    const required = this.REQUIRED_ARIA_PROPS[role.toLowerCase()] || [];
    for (const prop of required) {
      if (!attributes[prop]) {
        errors.push(`Missing required ARIA property "${prop}" for role "${role}"`);
      }
    }

    // Validate aria-checked values
    if (attributes['aria-checked']) {
      const value = attributes['aria-checked'];
      if (!['true', 'false', 'mixed'].includes(value)) {
        errors.push(`Invalid aria-checked value: "${value}". Must be "true", "false", or "mixed"`);
      }
    }

    // Validate aria-expanded values
    if (attributes['aria-expanded']) {
      const value = attributes['aria-expanded'];
      if (!['true', 'false'].includes(value)) {
        errors.push(`Invalid aria-expanded value: "${value}". Must be "true" or "false"`);
      }
    }

    // Validate aria-hidden
    if (attributes['aria-hidden'] === 'true' && attributes['tabindex'] === '0') {
      warnings.push('Element with aria-hidden="true" should not be focusable');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Extract ARIA attributes from an HTML element string
   */
  static extractAriaAttributes(element: string): Record<string, string> {
    const attributes: Record<string, string> = {};
    const ariaRegex = /(aria-[a-z]+)="([^"]*)"/gi;
    let match;

    while ((match = ariaRegex.exec(element)) !== null) {
      attributes[match[1]] = match[2];
    }

    return attributes;
  }

  /**
   * Extract role from HTML element string
   */
  static extractRole(element: string): string | null {
    const roleMatch = element.match(/role="([^"]*)"/);
    return roleMatch ? roleMatch[1] : null;
  }

  /**
   * Validate an HTML element for ARIA compliance
   */
  static validateElement(element: string): AriaValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const role = this.extractRole(element);
    
    if (role) {
      const roleValidation = this.validateRole(role);
      errors.push(...roleValidation.errors);
      warnings.push(...roleValidation.warnings);

      if (roleValidation.isValid) {
        const attributes = this.extractAriaAttributes(element);
        const attrValidation = this.validateAriaAttributes(role, attributes);
        errors.push(...attrValidation.errors);
        warnings.push(...attrValidation.warnings);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
