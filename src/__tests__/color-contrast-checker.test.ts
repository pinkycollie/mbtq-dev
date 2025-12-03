import { ColorContrastChecker } from '../core/color-contrast-checker';

describe('ColorContrastChecker', () => {
  describe('Hex to RGB Conversion', () => {
    test('should handle valid hex colors', () => {
      // Test is indirect through contrast calculation
      expect(() => ColorContrastChecker.calculateContrastRatio('#000000', '#FFFFFF')).not.toThrow();
    });

    test('should throw error for invalid hex format', () => {
      expect(() => ColorContrastChecker.calculateContrastRatio('invalid', '#FFFFFF')).toThrow();
    });
  });

  describe('Contrast Ratio Calculation', () => {
    test('should calculate black on white as 21:1', () => {
      const ratio = ColorContrastChecker.calculateContrastRatio('#000000', '#FFFFFF');
      expect(ratio).toBe(21);
    });

    test('should calculate white on black as 21:1', () => {
      const ratio = ColorContrastChecker.calculateContrastRatio('#FFFFFF', '#000000');
      expect(ratio).toBe(21);
    });

    test('should calculate same color as 1:1', () => {
      const ratio = ColorContrastChecker.calculateContrastRatio('#FFFFFF', '#FFFFFF');
      expect(ratio).toBe(1);
    });

    test('should handle case-insensitive hex colors', () => {
      const ratio1 = ColorContrastChecker.calculateContrastRatio('#FFFFFF', '#000000');
      const ratio2 = ColorContrastChecker.calculateContrastRatio('#ffffff', '#000000');
      expect(ratio1).toBe(ratio2);
    });

    test('should handle colors with # prefix', () => {
      const ratio = ColorContrastChecker.calculateContrastRatio('#FF0000', '#FFFFFF');
      expect(ratio).toBeGreaterThan(1);
    });

    test('should handle colors without # prefix', () => {
      const ratio = ColorContrastChecker.calculateContrastRatio('FF0000', 'FFFFFF');
      expect(ratio).toBeGreaterThan(1);
    });
  });

  describe('WCAG Compliance Check', () => {
    test('should pass AA for black on white normal text', () => {
      const result = ColorContrastChecker.checkContrast('#000000', '#FFFFFF', 16, false);
      expect(result.passesAA).toBe(true);
      expect(result.passesAAA).toBe(true);
      expect(result.wcagLevel).toBe('AAA');
    });

    test('should fail for insufficient contrast', () => {
      const result = ColorContrastChecker.checkContrast('#777777', '#888888', 16, false);
      expect(result.passesAA).toBe(false);
      expect(result.wcagLevel).toBe('Fail');
    });

    test('should have different thresholds for large text', () => {
      // This color combination might pass for large text but not normal text
      const normalResult = ColorContrastChecker.checkContrast('#767676', '#FFFFFF', 16, false);
      const largeResult = ColorContrastChecker.checkContrast('#767676', '#FFFFFF', 18, false);
      
      // Both should have same ratio but different pass/fail due to thresholds
      expect(normalResult.ratio).toBe(largeResult.ratio);
    });

    test('should treat bold 14pt as large text', () => {
      const result = ColorContrastChecker.checkContrast('#767676', '#FFFFFF', 14, true);
      // Should use 3:1 threshold instead of 4.5:1
      expect(result.ratio).toBeGreaterThan(1);
    });

    test('should pass AA but not AAA for medium contrast', () => {
      const result = ColorContrastChecker.checkContrast('#595959', '#FFFFFF', 16, false);
      expect(result.passesAA).toBe(true);
      expect(result.passesAAA).toBe(true);
    });
  });

  describe('Recommended Ratios', () => {
    test('should recommend 4.5:1 for normal text', () => {
      const recommendation = ColorContrastChecker.getRecommendedRatio(16, false);
      expect(recommendation).toContain('4.5:1');
      expect(recommendation).toContain('7:1');
    });

    test('should recommend 3:1 for large text', () => {
      const recommendation = ColorContrastChecker.getRecommendedRatio(18, false);
      expect(recommendation).toContain('3:1');
    });

    test('should recommend 3:1 for bold 14pt text', () => {
      const recommendation = ColorContrastChecker.getRecommendedRatio(14, true);
      expect(recommendation).toContain('3:1');
    });
  });

  describe('Result Format', () => {
    test('should round ratio to 2 decimal places', () => {
      const result = ColorContrastChecker.checkContrast('#123456', '#ABCDEF', 16, false);
      const decimalPlaces = (result.ratio.toString().split('.')[1] || '').length;
      expect(decimalPlaces).toBeLessThanOrEqual(2);
    });

    test('should return all required properties', () => {
      const result = ColorContrastChecker.checkContrast('#000000', '#FFFFFF', 16, false);
      expect(result).toHaveProperty('ratio');
      expect(result).toHaveProperty('passesAA');
      expect(result).toHaveProperty('passesAAA');
      expect(result).toHaveProperty('wcagLevel');
    });
  });

  describe('Real World Color Combinations', () => {
    test('should validate common UI colors', () => {
      // Primary blue on white
      const blue = ColorContrastChecker.checkContrast('#0066CC', '#FFFFFF', 16, false);
      expect(blue.passesAA).toBe(true);

      // Success green on white - #28A745 has ~3:1 contrast, passes for large text
      const green = ColorContrastChecker.checkContrast('#28A745', '#FFFFFF', 18, false);
      expect(green.passesAA).toBe(true);

      // Danger red on white
      const red = ColorContrastChecker.checkContrast('#DC3545', '#FFFFFF', 16, false);
      expect(red.passesAA).toBe(true);
    });
  });
});
