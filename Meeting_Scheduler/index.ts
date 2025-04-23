/* 
Design Meeting Scheduler

 Requirements:

1. there are n given meeting rooms
2. Book a meeting in any meeting room at given interveral (start time and end time, capacity)
3. Send notification to all the persons who are invitied to the meeting
4. Use Meeting Room Calendar to track the meetings date and time
*/
interface User {
  id: string;
  name: string;
  email: string;
}

enum MeetingStatus {
  SCHEDULED,
  CANCELLED,
  COMPLETED,
}

interface TimeSlot {
  start: Date;
  end: Date;
}

class MeetingRoom {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly capacity: number,
    public readonly location: string,
    private calendar: Calendar
  ) {}

  isAvailable(timeSlot: TimeSlot): boolean {
    return this.calendar.isAvailable(this.id, timeSlot);
  }

  bookMeeting(meeting: Meeting): boolean {
    return this.calendar.bookMeeting(this.id, meeting);
  }
}

class Meeting {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly timeSlot: TimeSlot,
    public readonly organizer: User,
    public readonly participants: User[],
    public readonly room: MeetingRoom,
    public status: MeetingStatus = MeetingStatus.SCHEDULED
  ) {}

  cancelMeeting(): void {
    this.status = MeetingStatus.CANCELLED;
    // Additional cleanup logic
  }
}

class Calendar {
  private meetings: Map<string, Meeting[]> = new Map(); // roomId -> meetings

  isAvailable(roomId: string, timeSlot: TimeSlot): boolean {
    const roomMeetings = this.meetings.get(roomId) || [];
    return !roomMeetings.some(
      (meeting) =>
        this.isOverlapping(meeting.timeSlot, timeSlot) &&
        meeting.status !== MeetingStatus.CANCELLED
    );
  }

  bookMeeting(roomId: string, meeting: Meeting): boolean {
    if (!this.isAvailable(roomId, meeting.timeSlot)) {
      return false;
    }

    if (!this.meetings.has(roomId)) {
      this.meetings.set(roomId, []);
    }
    this.meetings.get(roomId)!.push(meeting);
    return true;
  }

  private isOverlapping(slot1: TimeSlot, slot2: TimeSlot): boolean {
    return slot1.start < slot2.end && slot1.end > slot2.start;
  }
}
interface NotificationService {
  sendNotification(user: User, message: string): void;
}

class EmailNotificationService implements NotificationService {
  sendNotification(user: User, message: string): void {
    console.log(`Sending email to ${user.email}: ${message}`);
    // Actual email sending logic would go here
  }
}

class MeetingScheduler {
  constructor(
    private rooms: MeetingRoom[],
    private notificationService: NotificationService,
    private calendar: Calendar = new Calendar()
  ) {}

  scheduleMeeting(
    title: string,
    timeSlot: TimeSlot,
    organizer: User,
    participants: User[],
    minCapacity: number
  ): Meeting | null {
    // Find available room with sufficient capacity
    const suitableRoom = this.rooms.find(
      (room) => room.capacity >= minCapacity && room.isAvailable(timeSlot)
    );

    if (!suitableRoom) {
      return null;
    }

    // Create meeting
    const meeting = new Meeting(
      this.generateId(),
      title,
      timeSlot,
      organizer,
      participants,
      suitableRoom
    );

    // Book the meeting
    if (!suitableRoom.bookMeeting(meeting)) {
      return null;
    }

    // Send notifications
    this.sendInvitations(meeting);

    return meeting;
  }

  private sendInvitations(meeting: Meeting): void {
    const message = `You've been invited to "${meeting.title}" on ${meeting.timeSlot.start}`;

    // Notify organizer
    this.notificationService.sendNotification(
      meeting.organizer,
      `Your meeting "${meeting.title}" has been scheduled`
    );

    // Notify participants
    meeting.participants.forEach((participant) => {
      this.notificationService.sendNotification(participant, message);
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
