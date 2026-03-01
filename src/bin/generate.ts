import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";

import openapiTS, { astToString } from "openapi-typescript";

import { StrapiClientGeneratorConfig } from "./types";



export function generateStrapiOpenapiSpecs(config: StrapiClientGeneratorConfig) {
    // exec the `npx strapi generate openapi` command to generate the OpenAPI specifications for the Strapi instance specified in the configuration
    console.log('Generating OpenAPI specifications for Strapi instance...');
    const workingDir = process.cwd();
    const absoluteStrapiPath = resolve(config.strapiPath);
    // get relative path from strapi directory to the current working directory

    // Check if spec file is already present
    const specFile = join(absoluteStrapiPath, 'specification.json');
    let exists = false;
    if (existsSync(specFile)) {
        exists = true;
    }

    // ensure the output directory exists
    const outputDir = join(workingDir, config.output);
    try {
        execSync(`mkdir -p ${outputDir}`);
    } catch (error) {
        console.error('Error ensuring output directory:', error);
    }

    // generate the OpenAPI specifications using the Strapi CLI command
    try {
        execSync(`npx strapi openapi generate`, { cwd: absoluteStrapiPath, stdio: 'inherit' });
    } catch (error) {
        console.error('Error generating OpenAPI specifications:', error);
    }

    if (exists) {
        // copy the spec file to the output directory
        const outputSpecFile = join(workingDir, config.output, 'specification.json');
        try {
            execSync(`cp ${specFile} ${outputSpecFile}`);
        } catch (error) {
            console.error('Error copying OpenAPI specification file:', error);
        }
    } else {
        // move the generated spec file from the strapi directory to the output directory
        const outputSpecFile = join(workingDir, config.output, 'specification.json');
        try {
            execSync(`mv ${specFile} ${outputSpecFile}`);
        } catch (error) {
            console.error('Error moving OpenAPI specification file:', error);
        }
    }
}

export async function generateStrapiClientTypes(config: StrapiClientGeneratorConfig) {
    // Here you would add the logic to generate the Strapi Client code from the OpenAPI specifications
    // This is a placeholder function and should be implemented with the actual logic to generate the Strapi Client code
    console.log('Generating Strapi Client types code from the OpenAPI specifications...');

    // read the specs file and generate the types using openapi-typescript
    const specsFilePath = join(process.cwd(), config.output, 'specification.json');
    const typeFilePath = join(process.cwd(), config.output, 'index.ts');

    const ast = await openapiTS(readFileSync(specsFilePath, 'utf-8'));

    writeFileSync(typeFilePath, astToString(ast));

    console.log('\nStrapi Client types code generated successfully.\n');
}

export function generateStrapiClientCode(config: StrapiClientGeneratorConfig) {
    // append client code at the end of the generated types file
    console.log('Generating Strapi Client code...');

    const typeFilePath = join(process.cwd(), config.output, 'index.ts');
    const importCode = `import { Config, strapi } from '@strapi/client';

`
    const clientCode = `

export function createClient(config: Config) {
    return strapi<paths>(config);
}
export default createClient;
`;

    writeFileSync(typeFilePath, importCode + readFileSync(typeFilePath, 'utf-8') + clientCode);

    console.log('\nStrapi Client code generated successfully.\n');
}