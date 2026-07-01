# Creational Design Patterns – Scenario-Based Identification

## Decision Framework

| If the problem says...                                                     | Think...                          | Pattern              |
| -------------------------------------------------------------------------- | --------------------------------- | -------------------- |
| "Only one instance", "shared resource", "global state"                     | One instance, everyone shares it  | **Singleton**        |
| "Create based on type", "depends on input", "new types added"              | Type varies at runtime            | **Factory Method**   |
| "Family of related objects", "must match", "themed", "cross-platform"      | Multiple products that must match | **Abstract Factory** |
| "Complex object", "many optional parameters", "step by step", "fluent API" | Construction is complex           | **Builder**          |
| "Clone", "template", "preset", "copy and customize"                        | Create from an existing object    | **Prototype**        |

---

# Scenario 1: Cloud Infrastructure Provisioner

## Problem

Your DevOps tool provisions cloud resources. Users specify:

- Cloud Provider (**AWS**, **GCP**, **Azure**)
- Resource Type:
  - Virtual Machine (VM)
  - Database
  - Storage Bucket

Each provider has different APIs and configurations, but the tool should work identically regardless of which provider is selected.

### Important Constraint

If a user selects **AWS**, **every resource created during that session must be an AWS resource**.

❌ **Invalid**

- AWS EC2 + GCP Cloud SQL

✅ **Valid**

- AWS EC2 + AWS RDS + AWS S3

---

## Pattern: **Abstract Factory**

### Why?

Keywords:

- Family of related objects
- Must match
- Cross-platform
- Themed objects

One factory creates a complete family of compatible objects.

Switching from AWS to GCP only requires changing the factory—not every object creation call.

---

## TypeScript Example

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

// Consumer doesn't know which provider is used.
class InfraProvisioner {
  constructor(private factory: ResourceFactory) {}

  provision() {
    const vm = this.factory.createVM();
    const db = this.factory.createDatabase();

    // Guaranteed:
    // Both VM and Database belong to the same provider.
  }
}
```

---

# Scenario 2: Email Campaign Builder

## Problem

A marketing team builds email campaigns.

Each campaign has:

### Required Fields

- Recipients
- Subject

### Optional Fields

- HTML body
- Plain text body
- From name
- Reply-to address
- Scheduled send time
- Tracking options
- A/B test variants
- Tags

Most campaigns only use **4–5** of these fields.

The marketing team frequently gets the constructor parameter order wrong.

---

## Pattern: **Builder**

### Why?

Keywords:

- Many optional parameters
- Complex object construction
- Step-by-step creation
- Fluent API
- Parameter order confusion

Builder solves this by making object construction readable and self-documenting.

Instead of:

```typescript
new EmailCampaign(
  recipients,
  subject,
  html,
  undefined,
  'Marketing Team',
  undefined,
  new Date(),
);
```

Use:

```typescript
new EmailCampaignBuilder(recipients, subject)
  .html('<h1>Hello</h1>')
  .fromName('Marketing Team')
  .schedule(new Date())
  .build();
```

Each method clearly labels the field being set, making the code easier to read and maintain.

---

## TypeScript Example

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
}
```

---

# Quick Interview Recognition Guide

| You hear...                                 | Pattern              |
| ------------------------------------------- | -------------------- |
| Only one instance                           | **Singleton**        |
| Create object based on runtime type         | **Factory Method**   |
| Create a matching family of related objects | **Abstract Factory** |
| Many optional parameters or Fluent API      | **Builder**          |
| Clone existing object                       | **Prototype**        |

---

# Memory Tricks

| Pattern              | Think             |
| -------------------- | ----------------- |
| **Singleton**        | Only one instance |
| **Factory Method**   | Which type?       |
| **Abstract Factory** | Which family?     |
| **Builder**          | Too many options  |
| **Prototype**        | Copy and modify   |
