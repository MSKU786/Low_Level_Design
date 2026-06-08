Patter 1: Singleton

Ensure a class has single exactly one instance and provides a global pont of access of it. Use it when mutiple
instances would cause problem, like two database connection pools, two loggers writing to the same file, or two config manager with different state.

When to use: Data connection pools, logger instances, configuration managers, caches -- resources that are expensive to create and must be shared across the app.

When NOT to use (anti-pattern) : Don't use SIgnle just to make somehting 'globally accessbile", if you are using it to avoid passing dependencies thorugh constructors. , tha'ts a DIP violation disguised as a patterns. Most' "Singletons" in codebases should actualy be regrular classes wired once int he componsition root.
