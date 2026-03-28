/**
 * Form Validation System
 * Provides real-time validation feedback for form fields
 */

// Declare showToast on window interface for TypeScript
declare global {
  interface Window {
    showToast?: (options: {
      message: string;
      type: 'success' | 'error' | 'warning' | 'info';
      duration?: number;
    }) => void;
  }
}

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: string) => boolean;
}

interface ValidationRules {
  [fieldName: string]: ValidationRule;
}

class FormValidator {
  private form: HTMLFormElement = {} as HTMLFormElement;
  private rules: ValidationRules = {};
  private validationStates: Map<string, boolean> = new Map();

  constructor(formSelector: string, rules: ValidationRules) {
    const form = document.querySelector(formSelector) as HTMLFormElement;
    if (!form) {
      console.warn(`Form not found: ${formSelector}`);
      return;
    }
    this.form = form || ({} as HTMLFormElement);
    this.rules = rules;
    this.init();
  }

  private init(): void {
    if (!this.form) return;
    const fields =
      this.form.querySelectorAll?.('input, textarea, select') || [];

    fields.forEach((field) => {
      const input = field as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      const fieldName = input.name;

      if (!fieldName) return;

      // Add real-time validation
      input.addEventListener('input', () => this.validateField(fieldName));
      input.addEventListener('blur', () => this.validateField(fieldName));
      input.addEventListener('change', () => this.validateField(fieldName));
    });

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private validateField(fieldName: string): boolean {
    const field = this.form.querySelector(`[name="${fieldName}"]`) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;

    if (!field) return true;

    const rules = this.rules[fieldName];
    if (!rules) return true;

    const value = field.value.trim();
    let errors: string[] = [];

    // Required validation
    if (rules.required && !value) {
      errors.push('此字段为必填项');
    }

    if (value) {
      // Length validations
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`最少需要 ${rules.minLength} 个字符`);
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`不能超过 ${rules.maxLength} 个字符`);
      }

      // Email validation
      if (rules.email && !this.isValidEmail(value)) {
        errors.push('请输入有效的电子邮件地址');
      }

      // URL validation
      if (rules.url && !this.isValidUrl(value)) {
        errors.push('请输入有效的URL');
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push('输入格式不正确');
      }

      // Custom validation
      if (rules.custom && !rules.custom(value)) {
        errors.push('验证失败');
      }
    }

    // Update UI
    this.updateFieldUI(field, errors);
    const isValid = errors.length === 0;
    this.validationStates.set(fieldName, isValid);
    return isValid;
  }

  private updateFieldUI(
    field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    errors: string[]
  ): void {
    let fieldContainer = field.closest('.form-field') as HTMLElement;

    // If no form-field container, create one temporarily for styling
    if (!fieldContainer) {
      fieldContainer = field.parentElement as HTMLElement;
    }

    if (!fieldContainer) return;

    const isValid = errors.length === 0;
    const hasValue = field.value.trim() !== '';

    // Update container classes
    fieldContainer.classList.toggle('has-error', !isValid && hasValue);
    fieldContainer.classList.toggle('has-success', isValid && hasValue);

    // Update error messages
    let errorContainer = fieldContainer.querySelector('.form-message.error');
    if (!errorContainer && errors.length > 0) {
      errorContainer = document.createElement('div');
      errorContainer.className = 'form-message error';
      fieldContainer.appendChild(errorContainer);
    }

    if (errorContainer) {
      const errorText = errors.join('; ');
      errorContainer.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        ${errorText}
      `;
    }

    // Update success message
    let successContainer = fieldContainer.querySelector(
      '.form-message.success'
    );
    if (!successContainer && isValid && hasValue) {
      successContainer = document.createElement('div');
      successContainer.className = 'form-message success';
      fieldContainer.appendChild(successContainer);
    }

    if (successContainer) {
      successContainer.innerHTML =
        isValid && hasValue
          ? `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        验证通过
      `
          : '';
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  public isFormValid(): boolean {
    const fields = this.form.querySelectorAll('input, textarea, select');
    let allValid = true;

    fields.forEach((field) => {
      const input = field as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      if (!this.validateField(input.name)) {
        allValid = false;
      }
    });

    return allValid;
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();

    if (this.isFormValid()) {
      // Form is valid - you can submit here
      console.log('Form is valid, ready to submit');
      // window.showToast({ message: '表单验证通过！', type: 'success' });
    } else {
      // Form is invalid
      window.showToast?.({ message: '请修正表单中的错误', type: 'error' });
    }
  }
}

// Export for use in other modules
export default FormValidator;

// Usage example:
// const validator = new FormValidator('#contact-form', {
//   name: { required: true, minLength: 2 },
//   email: { required: true, email: true },
//   subject: { required: true },
//   message: { required: true, minLength: 10 }
// });
