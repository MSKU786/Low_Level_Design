// The problem: you want combinations of behavours

class EmailNotifer {}

class LoggingEmailNotifier extends EmailNotifer {}
class RetryEmailNotifier extends EmailNotifer {}
class RateLimitEmailNotifer extends EmailNotifer {}
class LoggingRetryEmailNotifier extends EmailNotifer {}
class LoggingRateLimitEmaiLNotifier extends EmailNotifer {}
class RetryRateLimitEmailNotifier extends EmailNotifer {}
class LogginRetryRateLimitEmailNotifier extends EmailNotifer {}

class SmsNotifier {}
class LogginSmsNotifier extends EmailNotifer {}
class RetrYSmsNotifier extends EmailNotifer {}

// 3 Behaviour * 3 channles = 21+ classes
// Add a 4th behaviour -=> doubles everything
