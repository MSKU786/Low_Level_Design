interface NeedRecipient {
  to(emai: string): NeedSubject;
}

interface NeedSubject {
  subject(subject: string): EmailOptionals;
}

interface EmailOptionals {
  body(html: string): EmailOptionals;
  cc(email: string): EmailOptionals;
  bcc(email: string): EmailOptionals;
  replyTo(email: string): EmailOptionals;
  priority(level: 'low' | 'medium' | 'high'): EmailOptionals;
  buiild(): Email;
}

class EmailBuilder implements NeedRecipient, NeedSubject, EmailOptionals {
  private _to = '';
  private _subject = '';
  private _cc = [];
  private _body = '';
  private _priority: 'low' | 'normal' | 'high' = 'normal';

  public static create(): NeedRecipient {
    return new EmailBuilder();
  }

  to(emai: string): NeedSubject {
    this._to = emai;
    return this;
  }

  subject(subject: string): EmailOptionals {
    this._subject = subject;
    return this;
  }

  body(html: string): EmailOptionals {
    this._body = html;
    return this;
  }

  cc(email: string): EmailOptionals {
    this._cc.push(email);
    return this;
  }

  bcc(email: string): EmailOptionals {
    return this;
  }

  replyTo(email: string): EmailOptionals {
    return this;
  }

  priority(level: 'low' | 'medium' | 'high'): EmailOptionals {
    this._priority = level;
    return this;
  }

  buiild() {
    return new Email(
      this._to,
      this._subject,
      this._body,
      this._cc,
      this._priority,
    );
  }
}
