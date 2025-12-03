import { AriaValidator } from '../core/aria-validator';

describe('AriaValidator', () => {
  describe('Role Validation', () => {
    test('should validate valid roles', () => {
      const result = AriaValidator.validateRole('button');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should reject invalid roles', () => {
      const result = AriaValidator.validateRole('invalid-role');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should reject empty roles', () => {
      const result = AriaValidator.validateRole('');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should validate multiple valid roles', () => {
      const roles = ['button', 'checkbox', 'dialog', 'menu', 'navigation'];
      roles.forEach((role) => {
        const result = AriaValidator.validateRole(role);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('ARIA Attributes Validation', () => {
    test('should detect missing required properties for checkbox', () => {
      const result = AriaValidator.validateAriaAttributes('checkbox', {});
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.includes('aria-checked'))).toBe(true);
    });

    test('should pass when required properties are present', () => {
      const result = AriaValidator.validateAriaAttributes('checkbox', {
        'aria-checked': 'true',
      });
      expect(result.isValid).toBe(true);
    });

    test('should validate aria-checked values', () => {
      const validResult = AriaValidator.validateAriaAttributes('checkbox', {
        'aria-checked': 'true',
      });
      expect(validResult.isValid).toBe(true);

      const invalidResult = AriaValidator.validateAriaAttributes('checkbox', {
        'aria-checked': 'yes',
      });
      expect(invalidResult.isValid).toBe(false);
    });

    test('should validate aria-expanded values', () => {
      const validResult = AriaValidator.validateAriaAttributes('combobox', {
        'aria-expanded': 'true',
        'aria-controls': 'menu-id',
      });
      expect(validResult.isValid).toBe(true);

      const invalidResult = AriaValidator.validateAriaAttributes('combobox', {
        'aria-expanded': 'open',
        'aria-controls': 'menu-id',
      });
      expect(invalidResult.isValid).toBe(false);
    });

    test('should warn about aria-hidden with focusable elements', () => {
      const result = AriaValidator.validateAriaAttributes('button', {
        'aria-hidden': 'true',
        tabindex: '0',
      });
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('Extract ARIA Attributes', () => {
    test('should extract aria attributes from element', () => {
      const element = '<div aria-label="Test" aria-hidden="true">';
      const attrs = AriaValidator.extractAriaAttributes(element);
      
      expect(attrs['aria-label']).toBe('Test');
      expect(attrs['aria-hidden']).toBe('true');
    });

    test('should return empty object if no aria attributes', () => {
      const element = '<div class="test">';
      const attrs = AriaValidator.extractAriaAttributes(element);
      
      expect(Object.keys(attrs)).toHaveLength(0);
    });
  });

  describe('Extract Role', () => {
    test('should extract role from element', () => {
      const element = '<div role="button">';
      const role = AriaValidator.extractRole(element);
      
      expect(role).toBe('button');
    });

    test('should return null if no role', () => {
      const element = '<div class="test">';
      const role = AriaValidator.extractRole(element);
      
      expect(role).toBeNull();
    });
  });

  describe('Validate Element', () => {
    test('should validate complete element', () => {
      const element = '<button role="button" aria-pressed="true">Click</button>';
      const result = AriaValidator.validateElement(element);
      
      expect(result.isValid).toBe(true);
    });

    test('should detect errors in element', () => {
      const element = '<div role="checkbox">Check</div>';
      const result = AriaValidator.validateElement(element);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    test('should handle elements without role', () => {
      const element = '<button>Click</button>';
      const result = AriaValidator.validateElement(element);
      
      expect(result.isValid).toBe(true);
    });
  });

  describe('Required Properties by Role', () => {
    test('should require aria-valuenow for slider', () => {
      const result = AriaValidator.validateAriaAttributes('slider', {});
      expect(result.errors.some((e) => e.includes('aria-valuenow'))).toBe(true);
      expect(result.errors.some((e) => e.includes('aria-valuemin'))).toBe(true);
      expect(result.errors.some((e) => e.includes('aria-valuemax'))).toBe(true);
    });

    test('should require aria-selected for tab', () => {
      const result = AriaValidator.validateAriaAttributes('tab', {});
      expect(result.errors.some((e) => e.includes('aria-selected'))).toBe(true);
    });
  });
});
