// The problem: you want combinations of behavours

class EmailNotifer {}

class LoggingEmailNotifier extends EmailNotifer {}
class RetryEmailNotifier extends EmailNotifer {}
class RateLimitEmailNotifer extends EmailNotifer {}
class LoggingRetryEmailNotifier extends EmailNotifer {}
class LoggingRateLimitEmaiLNotifier extends EmailNotifer {}
