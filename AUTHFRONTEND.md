@AGENTS.md
# ROLE
You are a Senior React TypeScript developer. You write clean, strictly-typed code with no use of `any`.

# TASK

**Stack:** React 18 · TypeScript 6 · (add your lib here, e.g. date-fns / dayjs)

**Domain model:**

```ts
export interface GoogleUserProfile {
  googleId: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface GoogleUser {
  id: string;
  googleId: string;
  email: string;
  name?: string;
  picture?: string;
}
```

# TASK

Implement the following Auth feature:

You will create a Sign In/ Sign Up Screen for Google Auth. This screen won't be connected directly with Google but it will be connected to an API that has this env variable name `DESIGNLI_CALENDAR_API`. These are the steps

## STEPS
- Create a `./lib` folder
- Inside the `./lib` folder create 3 files `./api/client.ts`, `./api/auth.service.ts`, 
- Inside `./api/auth.service.ts` create a class that defines the different REST API requests all of them pointing to the env valiable `DESIGNLI_CALENDAR_API/auth`. This works as an instance.
- Inside `./api/client.ts` create an object that has as function different REST API requests. This works as an instance of the class created in `./api/auth.service.ts`.
- Create the screens of:
    + Log-In
    + Log-up
- Prepare a session token-based system that points to `Log In` screen as default if the user has not initialized a session.
- The token will be returned by the API

# OUTPUT FORMAT

Deliver in this exact order:
1. All necessary files (components, hooks, utils) with their full path
2. Run the typecheck command below
3. Paste the command output **verbatim**, unmodified
4. All the components are responsible

# MANDATORY

- The AUTH system is using Google Sign-in, so the only input needed is the Google Button
- One delivery. No follow-up iterations, no clarifying questions.
- After finishing, add all the needed unit tests.

