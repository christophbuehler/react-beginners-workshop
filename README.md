# RoboChores

A task management system for robots. Project created for beginner React Workshop at [Swiss Life (Schweiz)](https://www.swisslife.ch/).

![Preview](preview-0.png)
![Preview](preview-1.png)
![Preview](preview-2.png)

## **Stack**

- [**Firebase**](https://firebase.google.com/) with [Firestore Database](https://firebase.google.com/products/firestore)
- [**Next.js 15.1**](https://nextjs.org/docs) with **App Router**
- [**React 19**](https://react.dev/)
- [**shadcn Component Library**](https://ui.shadcn.com/)
- [**Tailwind CSS**](https://tailwindcss.com/)

# Development

```bash
yarn dev
```

# Server Setup

> This is not part of the React workshop. Only the host needs to provide a running instance of the backend.

**1. Install Firebase CLI**

```bash
npm install -g firebase-tools
```

**2. Login to Firebase**

```bash
firebase login
```

**3. Initialize a Firebase project**

```bash
firebase init
```

During initialization:

1. Select nothing to create an empty project
1. Create a new Project
1. Enter a unique project id

**4. Setup Cloud Firestore**

Navigate to your project in [the Firebase Console](https://console.firebase.google.com/). Under Firestore Database, click "Create Database":

1. Use the default name and a preferred location
1. Create a test database

**5. Enable Anonymouse Authentication**

Enable email authentication in the firebase console.

**6. Add Web App**

In the Firebase Console, create a new Web App for your project:

1. Choose a name, no hosting
1. Click on Register
1. Copy the firebase config snippet and paste it into `src/lib/firebase-config.ts`. Do not worry, this data is meant to be public.
