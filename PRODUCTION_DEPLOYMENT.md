# Feedsight Production Website Deployment

This copy is configured for Firebase project `feedsight-production`.

## Before deploying

1. Confirm Email/Password Authentication is enabled.
2. Confirm Cloud Firestore exists.
3. Confirm Realtime Database exists at:
   `https://feedsight-production-default-rtdb.asia-southeast1.firebasedatabase.app`
4. Provision Firebase Storage before deploying `storage.rules` or using pet image uploads.
5. Keep the old Firebase projects available until production testing is complete.

## First admin account

New website sign-ups are intentionally created with `role: "user"`.
To create the first administrator:

1. Create/sign up the administrator account.
2. In Firestore, open `users/{UID}` for that account.
3. Change `role` to `admin` from the Firebase Console using an authorized project owner/editor account.

The production Firestore rules prevent ordinary users from changing their own role.

## Deploy

From this folder after installing Firebase CLI:

```bash
firebase login
firebase use feedsight-production
firebase deploy
```

If Storage has not been provisioned yet, deploy Hosting and Firestore rules first:

```bash
firebase deploy --only hosting,firestore:rules
```

Then provision Storage and deploy its rules:

```bash
firebase deploy --only storage
```

## Verification

After deployment:

- Open `https://feedsight-production.web.app/`.
- Create a test user and verify a `users/{UID}` document is created.
- Verify the email verification link returns to the new production site.
- Create an admin account as described above and test the admin portal.
- Test pet image upload only after Storage is provisioned and its rules are deployed.
