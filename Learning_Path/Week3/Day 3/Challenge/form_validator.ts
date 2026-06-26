// YOUR CHALLENGE: Build a Form Validation Rule Builder
// Time: ~35 minutes

// You're building a form validation library.
// Each field has a chain of validation rules built with a fluent API.

// ======================================================
// PART A: Build a ValidationRuleBuilder
// ======================================================

const emailRules = ValidationRule.for('email')
  .required('Email is required')
  .minLength(5, 'Too short')
  .maxLength(100, 'Too long')
  .matches(/^.+@.+\..+$/, 'Invalid email format')
  .custom((value) => !value.includes('spam'), 'No spam emails allowed')
  .build();

const passwordRules = ValidationRule.for('password')
  .required()
  .minLength(8)
  .matches(/[A-Z]/, 'Need uppercase')
  .matches(/[0-9]/, 'Need a number')
  .matches(/[!@#$]/, 'Need a special character')
  .build();

// ======================================================
// PART B: Execute the Built Rule
// ======================================================

const result1 = emailRules.validate('test');

// Expected:
// {
//   valid: false,
//   errors: [
//     "Too short",
//     "Invalid email format"
//   ]
// }

const result2 = emailRules.validate('john@example.com');

// Expected:
// {
//   valid: true,
//   errors: []
// }

// ======================================================
// PART C: Build a FormValidator
// ======================================================

const formValidator = FormValidator.create()
  .addField(emailRules)
  .addField(passwordRules)
  .build();

const result3 = formValidator.validate({
  email: 'john@example.com',
  password: 'weak',
});

// Expected:
// {
//   valid: false,
//   fieldErrors: {
//     password: [
//       "Too short",
//       "Need uppercase",
//       "Need a number",
//       "Need a special character"
//     ]
//   }
// }

// ======================================================
// DESIGN QUESTIONS
// ======================================================

// 1. Where should the validation logic live?
//    - In the builder?
//    - In the built ValidationRule object?

// 2. Should the built ValidationRule be immutable?
//    Why or why not?

// 3. How should .custom() work?
//    What interface/signature should a custom validator implement?

type Rule = (value: string) => string | null;

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

interface FormValidationResult {
  valud: boolean;
  fieldErrors: Record<string, string[]>;
}

// Validation Rule

class ValidationRule {
  constructor(
    public readonly fieldName: string,
    private readonly rules: Rule[],
  ) {
    Object.freeze(this.rules);
  }

  validationRule(value: string): ValidationResult {
    const errors: string[] = [];

    for (const rule of this.rules) {
      const error = rule(value);
      if (error != null) {
        errors.push(error);
      }
    }

    return { valid: errors.length === 0, errors };
  }
}

class ValidationRuleBuilder {
  private rules: Rule[] = [];

  private constructor(private readonly fileName: string) {}

  static for(field: string): ValidationRuleBuilder {
    return new ValidationRuleBuilder(field);
  }

  required(message: string): this {
    this.rules.push((value) => {
      if (!value || value.trim().length === 0) return message;
      return null;
    });
    return this;
  }

  minLength(min: number, message: string): this {
    this.rules.push((value) => {
      if (value.length < min) return message;
      return null;
    });
    return this;
  }

  maxLength(max: number, message: string): this {
    this.rules.push((value) => {
      if (value.length > max) return message;
      return null;
    });
    return this;
  }

  matches(regex: RegExp, message: string) {
    this.rules.push((value) => {
      if (!regex.test(value)) return message;
    });
    return this;
  }

  custom(validator: (value: string) => boolean, message: string): this {
    this.rules.push((value) => {
      if (!validator(value)) return message;
      return null;
    });

    return this;
  }

  build(): ValidationRule {
    if (this.rules.length === 0) {
      throw new Error(`No rules defined for fiedl ${this.fileName}`);
    }

    return new ValidationRule(this.fileName, [...this.rules]);
  }
}

class FormValidator {
  private constructor(
    private readonly fieldRule: Map<string, ValidationRule>,
  ) {}

  static create(): FormValidatorBuilder {
    return new FormValidatorBuilder();
  }

  validate(data: Record<string, string>): FormValidationResult {
    const fieldErrors: Record<string, string[]> = {};
    let allValid = true;

    for (const [fieldName, rule] of this.fieldRule) {
      const value = data[fieldName] ?? '';
      const result = rule.validationRule(value);

      if (!result.valid) {
        fieldErrors[fieldName] = result.errors;
        allValid = false;
      }
    }
    return { valid: allValid, fieldErrors };
  }
}

class FormValidatorResult {
  private fields = new Map<string, ValidationRule>();

  addField(rule: ValidationRule): this {
    this.fields.set(rule.fieldName, rule);
    return this;
  }

  build(): FormValidator {
    if (this.fields.size === 0) {
      throw new Error('Form must have at least one field');
    }

    return new (FormValidator as any)(new Map(this.fields));
  }
}
