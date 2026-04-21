

interface Mixpanel {
  track(event, data)
}


interface AnalyticsProvider {
  event(event)
}

interface DBRepo {
  query(q: string, params: string[])
}

interface S3Provider {
  send(data: PutObjectCommand )
}

interface WebhookProvider{ 
  send(text)
}


class AnalyticsServic {
  constructor(mixpanel: Mixpanel, ga: AnalyticsProvider, db: DBRepo, s3: S3Provider, slack: WebhookProvider ){}

  async trackEvent(userId: string, event: string, properties: Record<string, unknown) {

  }
}