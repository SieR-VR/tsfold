import type ts from "typescript/lib/tsclibrary";
import { Result, Ok, Err } from "ts-features";

import { TsFoldContext } from "./visitor";
import { formatExpressionNode } from "./util/format";

export function getConstant(node: ts.Node, context: TsFoldContext): Result<any, {}> {
    const type: ts.Type = context.typeChecker.getTypeAtLocation(node);
    
    if (isLiteralType(type, context.ts.TypeFlags)) {
        if (isBooleanLiteralType(type, context.ts.TypeFlags)) {
            return Ok(context.typeChecker.typeToString(type) === "true");
        }
    }

    return Err({});
}

function isLiteralType(type: ts.Type, flag: typeof ts.TypeFlags): type is ts.LiteralType {
    return !!(type.flags & flag.Literal);
}

function isBooleanLiteralType(type: ts.Type, flag: typeof ts.TypeFlags): boolean {
    return !!(type.flags & flag.BooleanLiteral);
}