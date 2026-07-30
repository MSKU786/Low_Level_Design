// Bridget - split "what" form "how" connect by composition

interface MessageChannel2 {
  send(to: string, subject: string, body: string): Promise<void>;
}

class EmailChannel implements MessageChannel2 {
  send(to: string, subject: string, body: string): Promise<void> {
    console.log(`Email to ${to}: [${subject} ${body}]`);
    return Promise.resolve();
  }
}
