/* 
Design Meeting Scheduler

 Requirements:

1. there are n given meeting rooms
2. Book a meeting in any meeting room at given interveral (start time and end time, capacity)
3. Send notification to all the persons who are invitied to the meeting
4. Use Meeting Room Calendar to track the meetings date and time
*/

class Meeting {
  startTime: Date;
  endTime: Date;
  participants: User[];
  capacity: number;
  organizer: User;
  room: MeetingRoom;
}

class MeetingRoom {
  id: string;
  capcity: number;
  calendar: Meeting[];
  isAvailable(startTime: Date, endTime: Date): boolean;
  bookMeeting(meeting: Meeting): void;
  cancelMeeting(meeting: Meeting): void;
  checkAvaiableSlots(startTime: Date, endTime: Date): Meeting[];
}

class User {
  id: string;
  name: string;
  email: string;
  sendNofication(meeting: Meeting): void;
}
