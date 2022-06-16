import { CommandInfo } from '../command';
import { CommandParser } from './command-parser';
/**
 * Replace placeholders with additional arguments.
 */
export declare class ExpandArguments implements CommandParser {
    private readonly additionalArguments;
    constructor(additionalArguments: string[]);
    parse(commandInfo: CommandInfo): CommandInfo & {
        command: string;
    };
}
