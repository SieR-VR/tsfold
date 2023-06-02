import ts from "typescript/lib/tsclibrary";

import { TsFoldContext } from "../visitor";

export function formatType(type: ts.Type, context: TsFoldContext): string {
    const container = type.symbol && type.symbol.escapedName.toString();
    const typeString = context.typeChecker.typeToString(type);

    return `${container ?? "anonymous"} [${typeString}]`;
}

export function formatExpressionNode(node: ts.Expression, context: TsFoldContext): string {
    const fileName = context.sourceFile.fileName;
    const startPos = context.ts.getLineAndCharacterOfPosition(
        context.sourceFile,
        node.pos
    );

    const typeString = formatType(context.typeChecker.getTypeAtLocation(node), context);

    return `${fileName}:${formatPos(startPos)} ${typeString}`;
}

export function formatPos(pos: ts.LineAndCharacter): string {
    return `${(pos.line + 1)}:${(pos.character + 1)}`;
}