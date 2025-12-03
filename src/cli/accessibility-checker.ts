#!/usr/bin/env node

/**
 * Accessibility Checker CLI
 * Command-line interface for accessibility checking
 */

import { AccessibilityChecker, AccessibilityCheckResult, AccessibilityIssue } from '../core/accessibility-checker';
import { ColorContrastChecker } from '../core/color-contrast-checker';
import * as fs from 'fs';
import * as path from 'path';

interface CLIOptions {
  file?: string;
  level?: 'A' | 'AA' | 'AAA';
  format?: 'text' | 'json';
  verbose?: boolean;
}

class AccessibilityCLI {
  private options: CLIOptions;

  constructor(options: CLIOptions = {}) {
    this.options = {
      level: 'AA',
      format: 'text',
      verbose: false,
      ...options,
    };
  }

  /**
   * Run accessibility checks
   */
  async run(): Promise<void> {
    console.log('🔍 MBTQ Accessibility Checker\n');

    if (!this.options.file) {
      console.error('❌ Error: No file specified');
      console.log('Usage: npm run accessibility:check -- --file=<path-to-html-file>');
      process.exit(1);
    }

    const filePath = path.resolve(this.options.file);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: File not found: ${filePath}`);
      process.exit(1);
    }

    const html = fs.readFileSync(filePath, 'utf-8');

    console.log(`📄 Checking file: ${filePath}`);
    console.log(`📊 WCAG Level: ${this.options.level}\n`);

    const checker = new AccessibilityChecker(this.options.level);
    const result = checker.checkHtml(html);

    if (this.options.format === 'json') {
      console.log(JSON.stringify(result, null, 2));
    } else {
      this.printTextReport(result);
    }

    if (!result.passed) {
      process.exit(1);
    }
  }

  /**
   * Print text format report
   */
  private printTextReport(result: AccessibilityCheckResult): void {
    console.log('═══════════════════════════════════════════════════════\n');

    if (result.passed) {
      console.log('✅ All accessibility checks passed!\n');
    } else {
      console.log('❌ Accessibility issues found\n');
    }

    console.log('Summary:');
    console.log(`  Total Issues: ${result.totalIssues}`);
    console.log(`  Errors: ${result.errors.length}`);
    console.log(`  Warnings: ${result.warnings.length}`);
    console.log(`  Info: ${result.info.length}\n`);

    console.log('By Severity:');
    console.log(`  🔴 Critical: ${result.summary.critical}`);
    console.log(`  🟠 Serious: ${result.summary.serious}`);
    console.log(`  🟡 Moderate: ${result.summary.moderate}`);
    console.log(`  🟢 Minor: ${result.summary.minor}\n`);

    if (result.errors.length > 0) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('ERRORS:\n');
      result.errors.forEach((error: AccessibilityIssue, index: number) => {
        console.log(`${index + 1}. [${error.severity.toUpperCase()}] ${error.message}`);
        console.log(`   WCAG: ${error.wcagLevel} - ${error.wcagCriteria}`);
        if (error.element && this.options.verbose) {
          console.log(`   Element: ${error.element.substring(0, 100)}...`);
        }
        if (error.suggestion) {
          console.log(`   💡 Suggestion: ${error.suggestion}`);
        }
        if (error.helpUrl) {
          console.log(`   📖 Learn more: ${error.helpUrl}`);
        }
        console.log('');
      });
    }

    if (result.warnings.length > 0) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('WARNINGS:\n');
      result.warnings.forEach((warning: AccessibilityIssue, index: number) => {
        console.log(`${index + 1}. [${warning.severity.toUpperCase()}] ${warning.message}`);
        console.log(`   WCAG: ${warning.wcagLevel} - ${warning.wcagCriteria}`);
        if (warning.suggestion) {
          console.log(`   💡 Suggestion: ${warning.suggestion}`);
        }
        console.log('');
      });
    }

    console.log('═══════════════════════════════════════════════════════\n');
  }

  /**
   * Demo color contrast checking
   */
  static demoColorContrast(): void {
    console.log('🎨 Color Contrast Examples\n');

    const examples = [
      { fg: '#000000', bg: '#FFFFFF', name: 'Black on White' },
      { fg: '#FFFFFF', bg: '#000000', name: 'White on Black' },
      { fg: '#0066CC', bg: '#FFFFFF', name: 'Blue on White' },
      { fg: '#767676', bg: '#FFFFFF', name: 'Gray on White' },
      { fg: '#FF0000', bg: '#FFFFFF', name: 'Red on White' },
    ];

    examples.forEach((example) => {
      const result = ColorContrastChecker.checkContrast(example.fg, example.bg);
      const aaIcon = result.passesAA ? '✅' : '❌';
      const aaaIcon = result.passesAAA ? '✅' : '❌';

      console.log(`${example.name}:`);
      console.log(`  Ratio: ${result.ratio}:1`);
      console.log(`  WCAG AA:  ${aaIcon}`);
      console.log(`  WCAG AAA: ${aaaIcon}`);
      console.log(`  Level: ${result.wcagLevel}\n`);
    });
  }

  /**
   * Show help message
   */
  static showHelp(): void {
    console.log(`
🔍 MBTQ Accessibility Checker CLI

Usage:
  npm run accessibility:check -- [options]

Options:
  --file=<path>       Path to HTML file to check (required)
  --level=<A|AA|AAA>  WCAG conformance level (default: AA)
  --format=<text|json> Output format (default: text)
  --verbose           Show detailed information
  --demo-contrast     Show color contrast examples
  --help              Show this help message

Examples:
  npm run accessibility:check -- --file=index.html
  npm run accessibility:check -- --file=page.html --level=AAA
  npm run accessibility:check -- --file=form.html --verbose
  npm run accessibility:check -- --demo-contrast

WCAG Levels:
  A   - Minimum conformance
  AA  - Recommended standard (default)
  AAA - Enhanced conformance

For more information, see docs/ACCESSIBILITY.md
    `);
  }
}

// Parse command line arguments
function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {};

  args.forEach((arg) => {
    if (arg === '--help') {
      AccessibilityCLI.showHelp();
      process.exit(0);
    } else if (arg === '--demo-contrast') {
      AccessibilityCLI.demoColorContrast();
      process.exit(0);
    } else if (arg.startsWith('--file=')) {
      options.file = arg.split('=')[1];
    } else if (arg.startsWith('--level=')) {
      const level = arg.split('=')[1].toUpperCase();
      if (['A', 'AA', 'AAA'].includes(level)) {
        options.level = level as 'A' | 'AA' | 'AAA';
      }
    } else if (arg.startsWith('--format=')) {
      const format = arg.split('=')[1].toLowerCase();
      if (['text', 'json'].includes(format)) {
        options.format = format as 'text' | 'json';
      }
    } else if (arg === '--verbose') {
      options.verbose = true;
    }
  });

  return options;
}

// Run CLI
if (require.main === module) {
  const options = parseArgs();
  const cli = new AccessibilityCLI(options);
  cli.run().catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

export { AccessibilityCLI };
