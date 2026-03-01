
import { execSync } from 'child_process';
import { readFileSync, existsSync, lstatSync } from 'fs';
import { join } from 'path';

export function checkPathIsStrapiInstance(path: string): boolean {
    // Check if the path exists and is a directory
    if (!existsSync(path) || !lstatSync(path).isDirectory()) {
        return false;
    }

    // Check if the path contains a package.json file with "strapi" as a dependency
    const packageJsonPath = join(path, 'package.json');
    if (!existsSync(packageJsonPath)) {
        return false;
    }

    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
    };

    return dependencies && (dependencies['@strapi/strapi'] || dependencies['strapi']);
}

export function checkStrapiVersion(path: string): { major: number, minor: number, patch: number } | null {
    // exec the `npx strapi --version` command to get the current strapi version
    try {
        const version = execSync(`npx strapi --version`, { cwd: path }).toString().trim();
        const [major, minor, patch] = version.split('.').map(Number);
        if (!major || !minor || !patch) {
            return null;
        }
        return { major, minor, patch };
    } catch (error) {
        console.error('Error checking Strapi version:', error);
        return null;
    }
}

export function checkStrapi(path: string): boolean {
    if (!checkPathIsStrapiInstance(path)) {
        console.error('The provided path is not a valid Strapi instance. Please provide a valid path to a Strapi instance.');
        process.exit(1);
    }
    const version = checkStrapiVersion(path);
    if (!version || version?.major < 5) {
        console.error('The provided Strapi instance is not compatible with Strapi Client. Please provide a Strapi instance with version 5 or higher.');
        process.exit(1);
    }
    return true;
}