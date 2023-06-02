import type ts from "typescript/lib/tsclibrary";
import { makeFileVisitor } from "./visitor";

const factory: ts.CustomTransformersModuleFactory = ({ typescript }) => ({
    create: (createInfo) => ({
        before: [
            (context) => (sourceFile) => makeFileVisitor({
                ts: typescript,
                transformationContext: context,
                program: createInfo.program,
                typeChecker: createInfo.program.getTypeChecker(),
                factory: context.factory,
                sourceFile,
            })(sourceFile)
        ]
    })
});

export = factory;