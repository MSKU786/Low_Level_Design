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

class ValidationRuleBuilder {
  private _for = '';
  private _required = false;
  private _minLength = 0;
  private _maxLength = 100000;
  private _matches = [];
  private _errors = [];
}
