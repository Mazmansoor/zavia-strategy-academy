# Zavia Strategy Academy — V1

A minimal, static system for testing whether serious people will read, think, and write.

## What This System Does

1. **Displays a landing page** explaining Module 1
2. **Links to Stripe** for payment ($19 per module)
3. **Redirects to thank-you page** with instructions
4. **Links to Google Doc** containing the module content
5. **Links to Google Form** for submission
6. **Operator reviews submissions manually** via Google Sheets

That's it.

## What This System Does NOT Do

- No user accounts
- No authentication
- No backend
- No database
- No automation
- No progress tracking
- No analytics
- No certificates
- No community features
- No email sequences
- No upsells

## File Structure

```
docs/
├── index.html        # Landing page (paid access)
├── thank-you.html    # Post-payment instructions
├── free-access.html  # Testing/invited access (not linked publicly)
├── styles.css        # Minimal styles
├── .nojekyll         # Disable Jekyll processing
└── README.md         # This file
```

## External Services (Links Only)

| Service | Purpose | Integration |
|---------|---------|-------------|
| Stripe Payment Link | Collect $19 payment | Link on index.html |
| Google Doc | Module content (view-only) | Link on thank-you.html and free-access.html |
| Google Form | Collect submissions | Link on thank-you.html and free-access.html |
| Google Sheets | Track submissions | Connected to Google Form (automatic) |

No SDKs. No APIs. Just links.

## How Components Are Decoupled

- **Stripe** redirects to thank-you.html after payment. No webhook, no verification.
- **Google Doc** is view-only. Anyone with the link can read.
- **Google Form** collects submissions. Anyone with the link can submit.
- **Google Sheets** receives form responses automatically.
- **Operator** reviews manually. No automation.

Each component can be replaced independently:
- Stripe → Any payment link service
- Google Doc → Any document host
- Google Form → Any form service
- GitHub Pages → Any static host

## Placeholders to Replace

Before going live, replace these placeholders:

1. `https://buy.stripe.com/PLACEHOLDER` — Your Stripe payment link
2. `https://docs.google.com/document/d/PLACEHOLDER/view` — Your Google Doc link
3. `https://forms.google.com/PLACEHOLDER` — Your Google Form link
4. `zavia@example.com` — Your contact email

## Stripe Setup

1. Create a product in Stripe Dashboard
2. Set price to $19 (one-time, per module)
3. Create a Payment Link
4. Set success URL to: `https://[your-username].github.io/zavia-strategy-academy/thank-you.html`
5. Copy the payment link to index.html

## Google Form Fields

The form should collect:
- Name
- Email
- Link to submitted analysis (Google Doc or plain text)
- Checkbox: "I understand this will receive Pass or Not Yet feedback"

## Deployment

This site is deployed via GitHub Pages from the `/docs` folder.

To update:
1. Edit files in `/docs`
2. Commit and push to `main`
3. GitHub Pages rebuilds automatically

## Future Migration Notes

This system is intentionally minimal. If V1 succeeds, a more sophisticated system could be built using:

- Firebase Auth (user accounts)
- Firestore (database)
- Cloud Functions (automation)
- Stripe webhooks (payment verification)

The existing Next.js code in this repository provides a foundation for that future system. It is not used in V1.

## Philosophy

Difficulty is a filter, not a flaw.

This system tests:
- Will people pay for access to dense reading material?
- Will people do the work of writing an original analysis?
- Can quality be maintained through manual review?

If yes, build more.
If no, learn why.
