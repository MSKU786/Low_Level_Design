// Without bridge t-  2 dmiesion * inheritance = explosion

// Dimension 1: Message urgency(what kind of messge)
// Dimesnion 2: Delivery channel

// Without Bridge: one class per combination:

class EmailRegularMessage {}
class EmaiLUrgentMessage {}
class EmailCriticalMessge {}
class SMSRegularMessage {}
class SMSUrgentMessage {}
class SMSCriticalMessage {}
class SlackRegularMessage {}
class SlackUrgentMessage {}
class SlackCriticalMessage {}
class PushRegularMessage {}
class PushUrgentMessage {}
class PushCriticalMessage {}

// 3 urgencies * 4 channle s= 12 classes
// Add "Whatsapp" achannle = 3 more classes
