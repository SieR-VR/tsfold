import type ts from "typescript/lib/tsclibrary";
import { Result, Ok, Err } from "ts-features";

import { TsFoldContext } from "../visitor";
import { formatExpressionNode } from "../util/format";
import { Foldable } from "../util/foldable";
import { getConstant } from "../constant";

const prefixUnaryOperatorMap = new Map<ts.PrefixUnaryOperator, (value: any) => any>([
    [40, (value) => +value],
    [41, (value) => -value],
    [46, (value) => ++value],
    [47, (value) => --value],
    [54, (value) => !value],
    [55, (value) => ~value],
]);

export function prefixUnary(node: ts.PrefixUnaryExpression, context: TsFoldContext, visitChild: (node: ts.Node) => Result<Foldable, ts.Node>): Result<Foldable, ts.Node> {
    return visitChild(node.operand).map_or_else((node) => {
        return Err(node);
    }, (foldable) => {
        try {
            const operator = prefixUnaryOperatorMap.get(node.operator);
            if (operator) {
                return Ok({
                    actual: operator(foldable.actual),
                });
            }
            
            throw new Error(`Unknown prefix unary operator: ${node.operator}`);
        }
        catch (error) {
            console.error(formatExpressionNode(node, context));
            return Err(node);
        }
    });
}