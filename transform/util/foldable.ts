import type ts from "typescript/lib/tsclibrary";
import { TsFoldContext } from "../visitor";

export interface Foldable<T = any> {
    actual: T;
}

export function makeNodeWithFoldable(foldable: Foldable, context: TsFoldContext): ts.Node {
    if (typeof foldable.actual === "string") {
        return context.factory.createStringLiteral(foldable.actual);
    }

    if (typeof foldable.actual === "number") {
        return context.factory.createNumericLiteral(foldable.actual);
    }

    if (typeof foldable.actual === "boolean") {
        return foldable.actual 
            ? context.factory.createTrue()
            : context.factory.createFalse();
    }

    if (foldable.actual === null) {
        return context.factory.createNull();
    }

    if (foldable.actual === undefined) {
        return context.factory.createIdentifier("undefined");
    }
    
    throw new Error(`Unknown foldable type: ${foldable.actual}`);
}