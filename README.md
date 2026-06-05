# Raycast Cardinal

Raycast extension for sending text directly to Cardinal.

## Commands

- `Ask Cardinal`: type a prompt in Raycast and send it to Cardinal.
- `Send Selection to Cardinal`: send the currently selected text to Cardinal.
- `Open Cardinal`: open Cardinal from Raycast.

## How It Works

This extension sends queries to Cardinal through its local URL scheme:

```text
cardinal://search?query=...
```

The URL scheme is handled by the patched Cardinal app, so Raycast does not need
Accessibility permissions or UI focus control.

## Setup

```bash
cd raycast-cardinal
npm install
npm run dev
```

Use a Cardinal build that registers the `cardinal://` URL scheme.
