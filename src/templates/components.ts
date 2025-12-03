/**
 * Accessible Button Component Template
 */

export interface AccessibleButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  icon?: string;
}

export function createAccessibleButton(props: AccessibleButtonProps): string {
  const {
    text,
    type = 'button',
    variant = 'primary',
    disabled = false,
    ariaLabel,
    ariaDescribedBy,
    icon,
  } = props;

  const ariaAttrs = [
    ariaLabel ? `aria-label="${ariaLabel}"` : '',
    ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : '',
    disabled ? 'aria-disabled="true"' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <button
      type="${type}"
      class="btn btn-${variant}"
      ${disabled ? 'disabled' : ''}
      ${ariaAttrs}
    >
      ${icon ? `<span class="btn-icon" aria-hidden="true">${icon}</span>` : ''}
      <span class="btn-text">${text}</span>
    </button>
  `;
}

/**
 * Accessible Form Input Template
 */

export interface AccessibleInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  value?: string;
}

export function createAccessibleInput(props: AccessibleInputProps): string {
  const {
    id,
    label,
    type = 'text',
    required = false,
    placeholder,
    helperText,
    errorText,
    value = '',
  } = props;

  const helperId = helperText ? `${id}-helper` : '';
  const errorId = errorText ? `${id}-error` : '';
  const describedBy = [helperId, errorId].filter(Boolean).join(' ');

  return `
    <div class="form-group ${errorText ? 'has-error' : ''}">
      <label for="${id}" class="form-label">
        ${label}
        ${required ? '<span class="required" aria-label="required">*</span>' : ''}
      </label>
      <input
        type="${type}"
        id="${id}"
        name="${id}"
        class="form-input"
        ${required ? 'required aria-required="true"' : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${describedBy ? `aria-describedby="${describedBy}"` : ''}
        ${errorText ? 'aria-invalid="true"' : ''}
        value="${value}"
      />
      ${
        helperText
          ? `<span id="${helperId}" class="helper-text">${helperText}</span>`
          : ''
      }
      ${
        errorText
          ? `<span id="${errorId}" class="error-text" role="alert">${errorText}</span>`
          : ''
      }
    </div>
  `;
}

/**
 * Accessible Modal Dialog Template
 */

export interface AccessibleModalProps {
  id: string;
  title: string;
  content: string;
  closeButtonText?: string;
}

export function createAccessibleModal(props: AccessibleModalProps): string {
  const { id, title, content, closeButtonText = 'Close' } = props;

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return `
    <div
      id="${id}"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="${titleId}"
      aria-describedby="${descId}"
      hidden
    >
      <div class="modal-overlay" aria-hidden="true"></div>
      <div class="modal-content">
        <header class="modal-header">
          <h2 id="${titleId}" class="modal-title">${title}</h2>
          <button
            type="button"
            class="modal-close"
            aria-label="${closeButtonText}"
            data-dismiss="modal"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div id="${descId}" class="modal-body">
          ${content}
        </div>
      </div>
    </div>
  `;
}

/**
 * Accessible Navigation Menu Template
 */

export interface MenuItem {
  text: string;
  href: string;
  current?: boolean;
}

export interface AccessibleNavProps {
  items: MenuItem[];
  ariaLabel?: string;
}

export function createAccessibleNav(props: AccessibleNavProps): string {
  const { items, ariaLabel = 'Main navigation' } = props;

  const menuItems = items
    .map(
      (item) => `
    <li>
      <a
        href="${item.href}"
        ${item.current ? 'aria-current="page"' : ''}
        class="nav-link ${item.current ? 'active' : ''}"
      >
        ${item.text}
      </a>
    </li>
  `
    )
    .join('');

  return `
    <nav aria-label="${ariaLabel}">
      <ul class="nav-menu" role="list">
        ${menuItems}
      </ul>
    </nav>
  `;
}

/**
 * Accessible Tab Panel Template
 */

export interface TabItem {
  id: string;
  label: string;
  content: string;
}

export interface AccessibleTabsProps {
  tabs: TabItem[];
  defaultTab?: number;
}

export function createAccessibleTabs(props: AccessibleTabsProps): string {
  const { tabs, defaultTab = 0 } = props;

  const tabButtons = tabs
    .map(
      (tab, index) => `
    <button
      role="tab"
      aria-selected="${index === defaultTab ? 'true' : 'false'}"
      aria-controls="panel-${tab.id}"
      id="tab-${tab.id}"
      class="tab-button"
      ${index === defaultTab ? '' : 'tabindex="-1"'}
    >
      ${tab.label}
    </button>
  `
    )
    .join('');

  const tabPanels = tabs
    .map(
      (tab, index) => `
    <div
      role="tabpanel"
      id="panel-${tab.id}"
      aria-labelledby="tab-${tab.id}"
      class="tab-panel"
      ${index === defaultTab ? '' : 'hidden'}
      tabindex="0"
    >
      ${tab.content}
    </div>
  `
    )
    .join('');

  return `
    <div class="tabs">
      <div role="tablist" aria-label="Tabs" class="tab-list">
        ${tabButtons}
      </div>
      ${tabPanels}
    </div>
  `;
}

/**
 * Accessible Alert Template
 */

export interface AccessibleAlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  dismissible?: boolean;
}

export function createAccessibleAlert(props: AccessibleAlertProps): string {
  const { type, message, dismissible = false } = props;

  const roleMap = {
    info: 'status',
    success: 'status',
    warning: 'alert',
    error: 'alert',
  };

  return `
    <div
      class="alert alert-${type}"
      role="${roleMap[type]}"
      aria-live="polite"
      aria-atomic="true"
    >
      <div class="alert-content">
        ${message}
      </div>
      ${
        dismissible
          ? `
        <button
          type="button"
          class="alert-dismiss"
          aria-label="Dismiss alert"
        >
          <span aria-hidden="true">×</span>
        </button>
      `
          : ''
      }
    </div>
  `;
}
