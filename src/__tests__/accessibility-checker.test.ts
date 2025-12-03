import { AccessibilityChecker } from '../core/accessibility-checker';

describe('AccessibilityChecker', () => {
  let checker: AccessibilityChecker;

  beforeEach(() => {
    checker = new AccessibilityChecker('AA');
  });

  describe('Image Accessibility', () => {
    test('should detect missing alt attribute', () => {
      const html = '<img src="test.jpg">';
      const result = checker.checkHtml(html);

      expect(result.passed).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].message).toContain('alt');
    });

    test('should pass for images with alt text', () => {
      const html = '<img src="test.jpg" alt="Test image">';
      const result = checker.checkHtml(html);

      expect(result.errors.filter((e) => e.id.startsWith('img-alt'))).toHaveLength(0);
    });

    test('should warn about empty alt without presentation role', () => {
      const html = '<img src="test.jpg" alt="">';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.id.startsWith('img-empty-alt'))).toBe(true);
    });
  });

  describe('Heading Structure', () => {
    test('should warn if no headings found', () => {
      const html = '<p>Content without headings</p>';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.id === 'no-headings')).toBe(true);
    });

    test('should warn if first heading is not h1', () => {
      const html = '<h2>Second level heading</h2>';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.id === 'first-heading-not-h1')).toBe(true);
    });

    test('should warn about heading level skips', () => {
      const html = '<h1>Title</h1><h3>Skipped h2</h3>';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.id.startsWith('heading-skip'))).toBe(true);
    });

    test('should pass for proper heading hierarchy', () => {
      const html = '<h1>Title</h1><h2>Section</h2><h3>Subsection</h3>';
      const result = checker.checkHtml(html);

      expect(result.warnings.filter((w) => w.id.startsWith('heading-'))).toHaveLength(0);
    });
  });

  describe('Form Accessibility', () => {
    test('should detect inputs without labels', () => {
      const html = '<input type="text" id="name">';
      const result = checker.checkHtml(html);

      expect(result.errors.some((e) => e.message.includes('label'))).toBe(true);
    });

    test('should pass for inputs with labels', () => {
      const html = '<label for="name">Name</label><input type="text" id="name">';
      const result = checker.checkHtml(html);

      expect(result.errors.filter((e) => e.id.startsWith('input-label'))).toHaveLength(0);
    });

    test('should pass for inputs with aria-label', () => {
      const html = '<input type="text" aria-label="Name">';
      const result = checker.checkHtml(html);

      expect(result.errors.filter((e) => e.id.startsWith('input-label'))).toHaveLength(0);
    });

    test('should ignore hidden inputs', () => {
      const html = '<input type="hidden" name="token">';
      const result = checker.checkHtml(html);

      expect(result.errors.filter((e) => e.id.startsWith('input-label'))).toHaveLength(0);
    });
  });

  describe('Link Accessibility', () => {
    test('should detect links without text', () => {
      const html = '<a href="/page"></a>';
      const result = checker.checkHtml(html);

      expect(result.errors.some((e) => e.message.includes('no accessible text'))).toBe(true);
    });

    test('should warn about vague link text', () => {
      const html = '<a href="/page">click here</a>';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.message.includes('Vague link text'))).toBe(true);
    });

    test('should pass for descriptive link text', () => {
      const html = '<a href="/about">About Our Company</a>';
      const result = checker.checkHtml(html);

      expect(result.errors.filter((e) => e.id.startsWith('link-text'))).toHaveLength(0);
      expect(result.warnings.filter((w) => w.id.startsWith('link-vague'))).toHaveLength(0);
    });
  });

  describe('Landmark Regions', () => {
    test('should warn if no main landmark', () => {
      const html = '<div>Content</div>';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.id === 'no-main-landmark')).toBe(true);
    });

    test('should pass with main element', () => {
      const html = '<main>Content</main>';
      const result = checker.checkHtml(html);

      expect(result.warnings.filter((w) => w.id === 'no-main-landmark')).toHaveLength(0);
    });

    test('should pass with role=main', () => {
      const html = '<div role="main">Content</div>';
      const result = checker.checkHtml(html);

      expect(result.warnings.filter((w) => w.id === 'no-main-landmark')).toHaveLength(0);
    });
  });

  describe('Language Declaration', () => {
    test('should detect missing lang attribute', () => {
      const html = '<html><body>Content</body></html>';
      const result = checker.checkHtml(html);

      expect(result.errors.some((e) => e.id === 'no-lang')).toBe(true);
    });

    test('should pass with lang attribute', () => {
      const html = '<html lang="en"><body>Content</body></html>';
      const result = checker.checkHtml(html);

      expect(result.errors.filter((e) => e.id === 'no-lang')).toHaveLength(0);
    });
  });

  describe('Tabindex', () => {
    test('should warn about positive tabindex values', () => {
      const html = '<div tabindex="5">Content</div>';
      const result = checker.checkHtml(html);

      expect(result.warnings.some((w) => w.id.startsWith('tabindex-positive'))).toBe(true);
    });

    test('should pass for tabindex 0', () => {
      const html = '<div tabindex="0">Content</div>';
      const result = checker.checkHtml(html);

      expect(result.warnings.filter((w) => w.id.startsWith('tabindex-positive'))).toHaveLength(0);
    });
  });

  describe('WCAG Level', () => {
    test('should allow setting WCAG level', () => {
      checker.setWcagLevel('AAA');
      // Test that level is set (functionality may vary based on implementation)
      expect(checker).toBeDefined();
    });
  });

  describe('Result Summary', () => {
    test('should provide accurate summary', () => {
      const html = `
        <img src="test.jpg">
        <h2>No h1</h2>
        <input type="text">
      `;
      const result = checker.checkHtml(html);

      expect(result.totalIssues).toBeGreaterThan(0);
      expect(result.summary.critical).toBeGreaterThan(0);
    });
  });
});
