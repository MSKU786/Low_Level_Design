CORE IDEA:
Builder seprates the construction of a complex object forma its representation Instead of a constructore with 10+ parameters you build the object step by bstep woth fluent API. Each setp is readable, order doesn't matter(uwually), and the final .build() vaildates everything.

The Problem Builder Solves:
new User("John", "john@mail.ocm", null, undefined, true ,fasle, "admin", null, 30, "US)
What's the 4th Parameter? The 7th?? Which booleans are which? This is unreadable, error-prone and impossible to mantain.

The Builder solution:
User.builder().name("Johne").email("john@mail.com").role("admin").age(30).country("US").build(). Every field is labeled. Optional fields are simple omitted. .build() validates required fields.

When to use:

1. Constructor has 5+ parameters(especially optional ones)
2. Object creation has complex validation rules.
3. Same construction process should creates different representations.
4. You want a fluent, readable API for object creation
