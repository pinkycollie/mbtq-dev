/**
 * Color Contrast Checker
 * Validates color contrast ratios for WCAG compliance
 */

export interface ColorContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  wcagLevel: 'AAA' | 'AA' | 'Fail';
}

export class ColorContrastChecker {
  private static readonly HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

  /**
   * Convert hex color to RGB
   */
  private static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = this.HEX_COLOR_REGEX.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  /**
   * Calculate relative luminance
   */
  private static getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const sRGB = c / 255;
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  /**
   * Calculate contrast ratio between two colors
   */
  static calculateContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) {
      throw new Error('Invalid color format. Use hex format (e.g., #ffffff)');
    }

    const lum1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if contrast ratio meets WCAG standards
   */
  static checkContrast(
    foreground: string,
    background: string,
    fontSize: number = 16,
    isBold: boolean = false
  ): ColorContrastResult {
    const ratio = this.calculateContrastRatio(foreground, background);
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);

    // WCAG 2.1 Level AA: 4.5:1 for normal text, 3:1 for large text
    // WCAG 2.1 Level AAA: 7:1 for normal text, 4.5:1 for large text
    const aaThreshold = isLargeText ? 3 : 4.5;
    const aaaThreshold = isLargeText ? 4.5 : 7;

    const passesAA = ratio >= aaThreshold;
    const passesAAA = ratio >= aaaThreshold;

    let wcagLevel: 'AAA' | 'AA' | 'Fail';
    if (passesAAA) {
      wcagLevel = 'AAA';
    } else if (passesAA) {
      wcagLevel = 'AA';
    } else {
      wcagLevel = 'Fail';
    }

    return {
      ratio: Math.round(ratio * 100) / 100,
      passesAA,
      passesAAA,
      wcagLevel,
    };
  }

  /**
   * Get recommended contrast ratio
   */
  static getRecommendedRatio(fontSize: number, isBold: boolean = false): string {
    const isLargeText = fontSize >= 18 || (fontSize >= 14 && isBold);
    return isLargeText ? '3:1 (AA), 4.5:1 (AAA)' : '4.5:1 (AA), 7:1 (AAA)';
  }
}
