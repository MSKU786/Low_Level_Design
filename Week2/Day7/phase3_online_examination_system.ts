// Online Examination System Design Challenge

// Requirements

// 1. Question Types
// - Multiple Choice (MCQ)
// - True/False
// - Coding (evaluated by a code runner)
// - Essay (evaluated by an AI grader)
// - New question types are added each semester

// 2. Exam Creation
// - An instructor creates an exam by selecting questions from a question bank
// - Each question has:
//   - points
//   - difficulty level
//   - time limit
// - The exam has a total time limit

// 3. Taking an Exam
// - A student starts an exam
// - The timer begins
// - The student answers questions
// - The student submits
// - The system auto-submits when time runs out
// - The student can skip questions and come back later

// 4. Grading
// - MCQ and True/False are auto-graded instantly
// - Coding questions are sent to a code runner service
// - Essay questions are sent to an AI grading service
// - Each grading method returns:
//   - score
//   - feedback
// - New grading methods may be added

// 5. Results
// - After all questions are graded:
//   - Calculate total score
//   - Determine pass/fail (configurable threshold)
//   - Notify the student (email)
//   - Notify the instructor (dashboard)

// 6. Anti-Cheating
// - Track tab switches
// - Track copy-paste events
// - Track time per question
// - Flag suspicious behavior
// - Anti-cheat rules may change frequently
// - New rules are added often

// Deliverables

// 1. English sentence (Step 1 of decomposition)

// 2. All interfaces

// 3. Class names with their interfaces/abstract classes

// 4. Strategy interfaces for:
//    - grading
//    - anti-cheat rules
//    - notification

// 5. Orchestrator constructor signature

// 6. Composition root (prod + test)

// 7. For each major design decision,
//    name the SOLID principle or OOP concept it demonstrates

// Scoring Breakdown

// 8 pts  - English sentence covers the full flow
// 8 pts  - Interfaces are clean and focused (ISP)
// 8 pts  - Question types extensible without editing existing code (OCP)
// 8 pts  - Grading strategies properly abstracted (OCP + DIP)
// 4 pts  - Anti-cheat rules composable (OCP + Composition)
// 4 pts  - Composition root with prod/test wiring (DIP)

abstract class BaseQuestion {
  constructor(
    public readonly id: string,
    public readonly points: number,
    public readonly difficultyLevel: number,
    public readonly timeLimit: number,
  ) {}
}

class MCQQuestion extends BaseQuestion {
  public readonly options: string[];
  private readonly answer: string;
}

class TFQuestion extends BaseQuestion {
  private readonly answer: boolean;
}

class CodingQuestion extends BaseQuestion {}

class EssayQUestion extends BaseQuestion {}

interface GradeResult {
  score: number;
  feedback: string;
}

interface GradingStrategy<T> {
  grade(question: BaseQuestion, answer: T): GradeResult;
}

class MCQGradeStrategy implements GradingStrategy<string> {
  grade(answer: string): GradeResult {}
}

class TrueFalseGradeStrategy implements GradingStrategy<boolean> {
  grade(answer: boolean): GradeResult {}
}

class CodeGradeStrategy implements GradingStrategy<string> {
  constructor(private AIGrader: AICodeReviewer) {}

  grade(answer: string): GradeResult {}
}

// Notification service
interface StudentNotifier {
  examSubmitted(recipient: string, examTitle: string): Promise<void>;
  resultAvailable(studentId: string, result: ExamResult): Promise<void>;
}

interface DashboardNotifier {
  newSubmission(
    instructorId: string,
    studentId: string,
    examTitle: string,
  ): Promise<void>;
  antiCheatAlert(instructorId: string, alerts: AntiCheatAlert[]): Promise<void>;
}

class EmailStudentNotifier implements StudentNotifier {
  examSubmitted(recipient: string, examTitle: string): Promise<void> {
    console.log(
      `${recipient} has successfully complete the exam: ${examTitle}`,
    );
    return Promise.resolve();
  }

  resultAvailable(studentId: string, result: ExamResult): Promise<void> {
    console.log(`Result are avaiable for student id: ${studentId}`);
    return Promise.resolve();
  }
}

class DashboardInstructorNotifier implements DashboardNotifier {
  newSubmission(
    instructorId: string,
    studentId: string,
    examTitle: string,
  ): Promise<void> {
    console.log(`one submission recieved from student: ${studentId}`);
  }

  antiCheatAlert(
    instructorId: string,
    alerts: AntiCheatAlert[],
  ): Promise<void> {
    console.log('Anti Cheat ALerts');
  }
}

// Generic Repositor

interface HasId {
  readonly id: string;
}

interface Repository<T extends HasId> {
  save(item: T): void;
  findById(id: string): T | null;
  findAll(): T[];
  findWhere(predicate: (item: T) => boolean): T[];
}

class InMemoryRepository<T extends HasId> implements Repository<T> {
  private store = new Map<string, T>();

  save(item: T): void {
    this.store.set(item.id, item);
  }

  findById(id: string): T | null {
    return this.store.get(id) ?? null;
  }

  findAll(): T[] {
    return [...this.store.values()];
  }

  findWhere(predicate: (item: T) => boolean): T[] {
    return this.findAll().filter(predicate);
  }
}
class ExamCreationService {
  createExam(teacher: User, questions: BaseQuestion[]) {}
}

class ExamAttendService {
  attempExam(exam: Exam, student: Student) {}
}

enum UserType {
  TEACHER = 'Teacher',
  STUDENT = 'Student',
}

abstract class User {
  private readonly name: string;
  private readonly type: UserType;

  getUserType(): UserType {
    return this.type;
  }
}

interface AntiCheatRule {
  evaluate(session: ExamSession): AntiCheatResult;
}

class TabSwitchRule implements AntiCheatRule {
  evaluate(session: ExamSession) {}
}

class CopyPasteRule implements AntiCheatRule {
  evaluate(session: ExamSession) {}
}

class TimePerQuestionRule implements AntiCheatRule {
  evaluate(session: ExamSession) {}
}

class AntiCheatEngine {
  constructor(private readonly rules: AntiCheatRule[]) {}

  evaluate(session: ExamSession) {
    return this.rules.map((r) => r.evaluate(session));
  }
}

// Interface GradingStrategy

interface GradingStrategy {
  grade(question: BaseQuestion, answer: String): Promise<GradeResult>;
}

class MCQGrader implements GradingStrategy {
  async grade(question: BaseQuestion, answer: String): Promise<GradeResult> {}
}

class TrueFalseGrader implements GradingStrategy {
  async grade(question: BaseQuestion, answer: string) {}
}

// DIP depeneds on codeRunner interface not a concerete service
class CodingGrader implements GradingStrategy {
  constructor(private codeRunner: CodeRunnerService) {}

  async grade(question: BaseQuestion, answer: string): Promise<GradeResult> {}
}

class EssayGrader implements GradingStrategy {
  constructor(private aiGrader: AIGradingService) {}

  async grade(question: BaseQuestion, answer: string): Promise<GradeResult> {}
}

interface CodeRunnerService {
  run(
    code: string,
    testCases: { input: string; expectedOutput: string }[],
  ): Promise<{
    passedTest: number;
    output: string;
  }>;
}

interface AIGradingService {}
class Exam {
  constructor(
    public readonly id: string,
    public readonly questions: BaseQuestion[],
    public readonly totalTimeLimit: number,
    public readonly passingThreshold: number,
  ) {}
}

class ExamSession {
  public readonly startTimestamp: Date;
  public readonly timeout = null;
  constructor(
    public readonly user: User,
    public readonly exam: Exam,
  ) {}

  start() {
    checkValidity();
    startSession();
    this.timeout = setTimeout(() => {
      this.submit();
    }, this.exam.totalTimeLimit);
  }

  submit() {
    clearTimeout(this.timeout);
    // update db entry for user
  }
}
