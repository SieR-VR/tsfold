# ts-fold: Compile-time variable folding for typescript

- Made up with ts 5.2 transform api
- Still in developing

## To-Dos

- Define "What is foldable" 
- Solve the "halting-problem" in some cases

## Before defining foldable variable

In functional languages, they define "pure function"

eg. in typescript,

```typescript

function somePureFunction(a: number, b: number): number {
    return a + b;
}

```

This may always returns same outputs for same inputs.

And, it not changes other values like global-variables.

## And.. constants

Foldable comes from "constants" and "pure function".

So, we should define "constants" in typescript.

## Constants?

It is confusing that knowing what is "constants" in typescript.

But our strong system, also known as "type checker" solves this.

