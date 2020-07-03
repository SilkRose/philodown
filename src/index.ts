import * as fs from 'fs/promises';

import config from '../config.json';
import { live } from './live';
import { join } from 'path';
import yargs = require('yargs');

export interface Arguments {
    live: boolean;
    query: string;
}

const argv: Arguments = yargs.options({
    live: { type: 'boolean', default: false, alias: 'l' },
    query: { type: 'string', default: '', alias: 'q' }
}).argv;

const outputPath = join(__dirname, '..', config.outputPath);

export const outputPaths = {
    output: outputPath,
    images: join(outputPath, 'images'),
    metadata: join(outputPath, 'metadata'),
    commentMetadata: join(outputPath, 'metadata', 'comments'),
    imageMetadata: join(outputPath, 'metadata', 'images')
};

async function main() {
    await fs.mkdir(outputPaths.output, { recursive: true });
    await fs.mkdir(outputPaths.images, { recursive: true });
    await fs.mkdir(outputPaths.metadata, { recursive: true });
    await fs.mkdir(outputPaths.commentMetadata, { recursive: true });
    await fs.mkdir(outputPaths.imageMetadata, { recursive: true });

    if (argv.live) {
        return live(argv);
    }
}

main().catch(console.error);
