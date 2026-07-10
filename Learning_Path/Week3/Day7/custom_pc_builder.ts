/*
Design from Scratch – PC Builder System
Requirements
1. PC Types

The system supports multiple PC types.

Current types:

Gaming
Workstation
Budget

Each PC type has:

Different base price
Different specifications
Maximum RAM
Maximum storage slots

New PC types may be added every year.

2. Component Families

The system supports two component families:

Intel-based
AMD-based
Intel Family
Intel CPU
Intel-compatible motherboard
DDR5 RAM
Intel cooler
AMD Family
AMD CPU
AMD-compatible motherboard
DDR5 RAM
AMD cooler

Constraint:

Intel CPU cannot be paired with an AMD motherboard.
AMD CPU cannot be paired with an Intel motherboard.
The component family must remain consistent throughout the build.
3. PC Configuration

A PC consists of:

Required

PC Type
Component Family

Configurable / Optional

Storage (SSD/HDD, capacity)
GPU
Extra RAM
Peripherals
Monitor
Keyboard
Mouse
Warranty Plan
Operating System
Windows
Linux
None

Most customers select only 3–4 options out of the 10+ available customization options.

4. Pre-built Packages

The store offers ready-made PC packages.

Pro Gamer
Gaming PC
Intel family
RTX 4090 GPU
32 GB RAM
1 TB SSD
Windows
Developer
Workstation
AMD family
64 GB RAM
2 TB SSD
Linux
Extended Warranty
Student
Budget PC
AMD family
8 GB RAM
256 GB SSD
No GPU

Customers can:

Start with a pre-built package.
Customize it further (e.g., upgrade GPU, add a monitor).

Constraint:

Two customers selecting the same package should receive independent copies. Customizing one package must not affect the other.
5. Application Configuration

The application has global configuration values:

Tax rate
Currency
Store name
Free shipping threshold

These values are:

Loaded once during application startup.
Shared across all services.
*/
