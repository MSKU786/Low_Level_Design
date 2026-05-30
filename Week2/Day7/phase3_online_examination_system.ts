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

class MCQQuestion extends Question {
  public readonly options: string[];
  answer: string;
}

interface TFQuestion extends Question {
  id: string;
  answer: boolean;
}

interface CodingQuestion extends Question {}

interface GradeResult {
  score: number;
  feedback: string;
}

interface GradingStrategy<T> {
  grade(question: Question, answer: T): GradeResult;
}

class MCQGradeStrategy implements GradingStrategy<string> {
  grade(question: Question, answer: string): GradeResult {}
}

class TrueFalseGradeStrategy implements GradingStrategy<boolean> {
  grade(question: Question, answer: boolean): GradeResult {}
}

class CodeGradeStrategy implements GradingStrategy<string> {
  grade(question: Question, answer: string): GradeResult {}
}
