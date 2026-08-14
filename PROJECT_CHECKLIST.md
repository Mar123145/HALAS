# Healed And Loved Animal Sanctuary (HALAS) Production Checklist

## Required Firebase Setup

- Deploy Firestore and Storage rules with `firebase deploy --only firestore:rules,storage`.
- Add your production domain in Firebase Authentication allowed domains.
- Create the first admin manually in Firestore:
  - Collection: `users`
  - Document ID: the Firebase Auth user UID
  - Required field: `role` with value `admin`
- Keep normal public signups as `role: "user"` only. Do not expose an admin signup form.

## Core Test Flow

- Sign up as a user and verify the email link opens the deployed login page.
- Log in as a user and confirm the dashboard, browse, saved pets, application, messages, and appointments pages load.
- Log in as an admin and confirm dashboard access is blocked for non-admin users.
- Add an animal with and without a photo.
- Try uploading a non-image and an image larger than 5 MB.
- Save and remove a pet from the user browse and saved-pets pages.
- Submit an adoption application.
- Approve, reject, and mark applications as reviewing from the admin dashboard.
- Schedule a visit and confirm the user can see the appointment.

## Next Refactor Targets

- Move the remaining page-level Firebase initialization to `firebase-app.js`.
- Replace remaining `alert()` calls with shared modal/toast UI.
- Replace remaining inline `onclick` handlers with delegated event listeners.
- Continue replacing Firestore-backed `innerHTML` templates with DOM creation or escaped values.
- Unify the blue/indigo and orange/amber page styling into one brand palette.
