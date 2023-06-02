import type ts from "typescript/lib/tsclibrary";
import { Result, Ok, Err } from "ts-features";

import { prefixUnary } from "./pure/prefixUnary";

export interface TsFoldContext {
    // avoid to import actual value of ts
    ts: typeof ts;

    // the main context for transform
    transformationContext: ts.TransformationContext;

    // the whole program ejected by user
    program: ts.Program;

    // shorthand property for program.getTypeChecker() 
    typeChecker: ts.TypeChecker;

    // shorthand property for transformationContext.factory
    factory: ts.NodeFactory;

    // top-level source file
    sourceFile: ts.SourceFile;

    // any other context
    [key: string]: any;
}

export function makeFileVisitor(context: TsFoldContext): (node: ts.SourceFile) => ts.SourceFile {
    return (node: ts.SourceFile) => {
        // console.log(node.fileName);
        return context.ts.visitEachChild(node, makeVisitor(context), context.transformationContext);
    }
}

export function makeVisitor(context: TsFoldContext): (node: ts.Node) => ts.Node {
    return (node: ts.Node) => {
        if (context.ts.isPrefixUnaryExpression(node)) {
            return prefixUnary(node, context, (node) => {
                return Err(context.ts.visitEachChild(node, makeVisitor(context), context.transformationContext));
            });
        }

        return context.ts.visitEachChild(node, makeVisitor(context), context.transformationContext);
    }
}
