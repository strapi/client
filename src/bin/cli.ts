import { writeFileSync, readFileSync } from 'fs';

import { Command } from 'commander';

import { checkStrapi } from './check-configuration';
import { generateStrapiClientCode, generateStrapiClientTypes, generateStrapiOpenapiSpecs } from './generate';
import { StrapiClientGeneratorConfig } from './types';

const program = new Command();

program
    .name('strapi-client')
    .description('A CLI for Strapi Client')
    .version('1.0.0');

/**
 * The init command initializes a new Strapi Client configuration. 
 * It takes a required argument <path> which specifies the path to a Strapi instance.
 * Then it generates a `strapi-client.config.json` file in the current working directory with the provided path and options.
 */
program.command('init')
    .description('Initialize a new Strapi Client configuration')
    .argument('<path>', 'the path to a strapi instance')
    .option('-o, --output [file]', 'the output folder for the generated code', 'src/strapi-client/')
    .action((str, options) => {
        console.log('Initializing Strapi Client configuration...');

        checkStrapi(str);

        // generate the strapi-client.config.json file in the current working directory with the provided path and options
        const config: StrapiClientGeneratorConfig = {
            strapiPath: str,
            output: options.output,
        };

        // Write the config to a file
        writeFileSync('strapi-client.config.json', JSON.stringify(config, null, 2));

        console.log('\nStrapi Client configuration initialized successfully.\n');
        console.log('Strapi instance path:', str);
        console.log('Client generated output folder:', options.output);

        console.log('\nTo generate the client, run the following command:\n');
        console.log('  strapi-client generate');
    });

/**
 * The generate command generates code for a Strapi instance.
 * It uses the configuration provided by the init command or the options passed directly to it.
 * The generated code can be used to interact with the Strapi instance specified in the configuration.
 */
program.command('generate')
    .description('Generate code for a Strapi instance')
    .action(async () => {
        console.log('Generating code for Strapi instance...');

        // load the configuration from strapi-client.config.json
        const config = JSON.parse(readFileSync('strapi-client.config.json', 'utf-8'));
        console.log('\nUsing configuration from strapi-client.config.json');

        checkStrapi(config.strapiPath);

        generateStrapiOpenapiSpecs(config);
        await generateStrapiClientTypes(config);
        generateStrapiClientCode(config);
    });

program.parse();
