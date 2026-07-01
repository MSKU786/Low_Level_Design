# Creational Design Patterns – Scenario-Based Identification

## Decision Framework

| If the problem says...                                                     | Think...                          | Pattern              |
| -------------------------------------------------------------------------- | --------------------------------- | -------------------- |
| "Only one instance", "shared resource", "global state"                     | One instance, everyone shares it  | **Singleton**        |
| "Create based on type", "depends on input", "new types added"              | Type varies at runtime            | **Factory Method**   |
| "Family of related objects", "must match", "themed", "cross-platform"      | Multiple products that must match | **Abstract Factory** |
| "Complex object", "many optional parameters", "step by step", "fluent API" | Construction is complex           | **Builder**          |
| "Clone", "template", "preset", "copy and customize"                        | Create from existing object       | **Prototype**        |

---

# Scenario 1: Cloud Infrastructure Provisioner

## Problem

Your DevOps tool provisions cloud resources. Users specify a provider (**AWS**, **GCP**, **Azure**) and a resource type (**VM**, **Database**, **Storage Bucket**). Each provider has different APIs and configurations, but the tool should work identically regardless of which provider is selected.

When a user selects **AWS**, **all resources created during that session must be AWS resources**—you can't mix an AWS VM with a GCP database.

## Pattern: **Abstract Factory**

### Why?

"All resources in a session must be from the same provider" → **family consistency**.

Similar to the Dark/Light theme pattern, one factory produces a matching set of products.

Switching from AWS to GCP means switching one factory, not editing every resource creation call.

```typescript
interface ResourceFactory {
  createVM(): VM;
  createBucket(): StorageBucket;
  createDatabase(): Database;
}

class AWSFactory implements ResourceFactory {
  createVM(): VM {
    return new AWSEC2Instance();
  }

  createBucket(): StorageBucket {
    return new S3Bucket();
  }

  createDatabase(): Database {
    return new RDSInstance();
  }
}

class GCPFactory implements ResourceFactory {
  createVM(): VM {
    return new ComputeEngineInstance();
  }

  createBucket(): StorageBucket {
    return new CloudStorageBucket();
  }

  createDatabase(): Database {
    return new CloudSQLInstance();
  }
}

// Consumer doesn't know which provider.
// Just uses the factory.
class InfraProvisioner {
  constructor(private factory: ResourceFactory) {}

  provision() {
    const vm = this.factory.createVM();
    const db = this.factory.createDatabase();

    // Guaranteed: both are AWS or both are GCP.
  }
}
```

---

# Scenario 2: Email Campaign Builder

## Problem

A marketing team builds email campaigns.

Each campaign has:

- Recipients (**required**)
- Subject line (**required**)
- HTML body (optional)
- Plain text body (optional)
- From name
- Reply-to address
- Scheduled send time
- Tracking options
- A/B test variants
- Tags

Most campaigns use only **4–5** of these fields.

The marketing team frequently complains about getting the parameter order wrong.

## Pattern: **Builder**

### Why?

- Many optional parameters
- Parameter order confusion

Builder's sweet spot.

Fluent API makes each field labeled and self-documenting.

Required fields go in the Builder's constructor, while optional fields are chained methods.

```typescript
class EmailCampaign {
  readonly recipients: string[];
  readonly subject: string;
  readonly html?: string;
  readonly textBody?: string;
  readonly fromName?: string;
  readonly replyToAddress?: string;
  readonly scheduledTime?: Date;

  private constructor(builder: EmailCampaignBuilder) {
    this.recipients = builder.recipients;
    this.subject = builder.subject;
    this.html = builder.html;
    this.textBody = builder.textBody;
    this.fromName = builder.fromName;
    this.replyToAddress = builder.replyToAddress;
    this.scheduledTime = builder.scheduledTime;
  }

  static builder(recipients: string[], subject: string): EmailCampaignBuilder {
    return new EmailCampaignBuilder(recipients, subject);
  }
}

class EmailCampaignBuilder {
  // Required (set in constructor)
  readonly recipients: string[];
  readonly subject: string;

  // Optional (set via fluent methods)
  html?: string;
  textBody?: string;
  fromName?: string;
  replyToAddress?: string;
  scheduledTime?: Date;

  constructor(recipients: string[], subject: string) {
    this.recipients = recipients;
    this.subject = subject;
  }

  setHtml(html: string): this {
    this.html = html;
    return this;
  }

  setTextBody(textBody: string): this {
    this.textBody = textBody;
    return this;
  }

  setFromName(name: string): this {
    this.fromName = name;
    return this;
  }

  setReplyTo(address: string): this {
    this.replyToAddress = address;
    return this;
  }

  setScheduledTime(time: Date): this {
    this.scheduledTime = time;
    return this;
  }

  build(): EmailCampaign {
    if (!this.html && this.textBody) {
      throw new Error('Need at least HTML or text body');
    }

    return new EmailCampaign(this);
  }
}
```

### Usage

```typescript
const campaign = EmailCampaign.builder(['user@mail.com'], 'Welcome!')
  .setHtml('<h1>Hello!</h1>')
  .setFromName('Marketing Team')
  .setScheduledTime(new Date('2024-12-25'))
  .build();
```

---

# Scenario 3: Multiplayer Game Server

## Problem

Your game server manages player sessions. There must be exactly one `GameServer` instance running. Multiple game rooms can exist, but they all share the same server instance for matchmaking, player tracking, and leaderboards. If two `GameServer` instances existed, players could get different leaderboard data depending on which instance they hit.

## Pattern: **Singleton**

### Why?

"Exactly one instance", "shared state across all rooms" → textbook Singleton.

Multiple instances would cause inconsistent leaderboard data.

The instance must be `static` on the class, with a private constructor.

```typescript
interface IGameServer {
  getLeaderboard(): LeaderboardEntry[];
  matchmake(playerId: string): GameRoom;
  trackPlayer(playerId: string): void;
}

class GameServer implements IGameServer {
  private static instance: GameServer | null = null;

  private leaderboard: LeaderboardEntry[] = [];
  private players = new Map<string, PlayerSession>();
```
