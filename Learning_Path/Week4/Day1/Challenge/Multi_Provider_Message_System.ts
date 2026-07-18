// Your Challenge: Build a multi-provider messaging system
// Time - 35 minutes


interface MessageService {
  send(to: string, body: string): Promise<{id: string, status: string};
  getStatus(messageId: string) : Promise<string>
}

// Need to intergrate three external providers, each with a complietley different API: 

// Provider 1: SendGrid (email) 
class SendGridSDK {
  mail = {
    async send(params: {
      personalizations: [{to: [{email: string}]}],
      from: {email: string},
      subject: string, 
      content: [{type: string, value: string}]
    }) {
      return {statusCode: 202, headers: {"x-message-id": "sg_123"}}
    }
  };

  async getMessageStatus(messageId: string) {
    return {status: "delivered", last_event_time: "2024-01-01"}
  }
  
}


//Provider 2: Twilio (SMS) 
class TwiliSDK {
  messages = {
    async create(params: {to: string, from: string, body: string}) {
      return {sid: "SM_abc", status: "queued", dataCreated: new Date()}
    },
    async fetch(sid: string) {
      return {sid, status: "delivered"}
    }
  }
}



// Provider 3: Slack (Webhook)
class SlackWebhookSDK {
  async postMessages(params: {channel: string, text: string, username?: string}) {
    return {ok: true, ts: "213423423_234234"}
  }
  // Slack webhooks dont' support status checking
}



class SendGridAdapters implements MessageService {
  sendGridInstance: SendGridSDK
  constructor() {
    this.sendGridInstance = new SendGridSDK();
  }

  async send(to: string, body: string): Promise<{id: string, status: string} {
    let params = {
      personalizations: [
        {to: [{email: to}]}
      ],
      from: {
        email: "manish@intera.com"
      },
      subject: "Critical Email",
      content: [{
        type : "html",
        value: body
      }]
    }
    const response = await this.sendGridInstance.mail.send(params)

    return Promise.resolve({
      id: response.headers["x-message-id"],
      status: response.statusCode.toString()
    })
  }

  async getStatus(messageId: string) : Promise<string> {
    const status = await this.sendGridInstance.getMessageStatus(messageId)
    return status.status;
  }
}


class TwilioAdapter implements MessageService {
  twilioInstance: TwiliSDK
  constructor() {
    this.twilioInstance = new TwiliSDK();
  }

  async getStatus(messageId: string): Promise<string> {
    let response = await this.twilioInstance.messages.fetch(messageId);
    return response.status  
  }

  async send(to: string, body: string): Promise<{id: string, status: string} {
    let params = {
      to,
      from: "standard@email.com",
      body
    }
    const response = await this.twilioInstance.messages.create(params)
    return {id: response.sid, status: response.status}
  }
}