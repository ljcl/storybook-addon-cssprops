"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandNpmWildcard = void 0;
const fs = __importStar(require("fs"));
const _ = __importStar(require("lodash"));
const OMISSION = /\(!([^\)]+)\)/;
/**
 * Finds wildcards in npm/yarn/pnpm run commands and replaces them with all matching scripts in the
 * `package.json` file of the current directory.
 */
class ExpandNpmWildcard {
    constructor(readPackage = ExpandNpmWildcard.readPackage) {
        this.readPackage = readPackage;
    }
    static readPackage() {
        try {
            const json = fs.readFileSync('package.json', { encoding: 'utf-8' });
            return JSON.parse(json);
        }
        catch (e) {
            return {};
        }
    }
    parse(commandInfo) {
        const [, npmCmd, cmdName, args] = commandInfo.command.match(/(npm|yarn|pnpm) run (\S+)([^&]*)/) || [];
        const wildcardPosition = (cmdName || '').indexOf('*');
        // If the regex didn't match an npm script, or it has no wildcard,
        // then we have nothing to do here
        if (!cmdName || wildcardPosition === -1) {
            return commandInfo;
        }
        if (!this.scripts) {
            this.scripts = Object.keys(this.readPackage().scripts || {});
        }
        const omissionRegex = cmdName.match(OMISSION);
        const cmdNameSansOmission = cmdName.replace(OMISSION, '');
        const preWildcard = _.escapeRegExp(cmdNameSansOmission.substr(0, wildcardPosition));
        const postWildcard = _.escapeRegExp(cmdNameSansOmission.substr(wildcardPosition + 1));
        const wildcardRegex = new RegExp(`^${preWildcard}(.*?)${postWildcard}$`);
        const currentName = commandInfo.name || '';
        return this.scripts
            .map(script => {
            const match = script.match(wildcardRegex);
            if (omissionRegex) {
                const toOmit = script.match(new RegExp(omissionRegex[1]));
                if (toOmit) {
                    return;
                }
            }
            if (match) {
                return Object.assign({}, commandInfo, {
                    command: `${npmCmd} run ${script}${args}`,
                    // Will use an empty command name if command has no name and the wildcard match is empty,
                    // e.g. if `npm:watch-*` matches `npm run watch-`.
                    name: currentName + match[1],
                });
            }
        })
            .filter((commandInfo) => !!commandInfo);
    }
}
exports.ExpandNpmWildcard = ExpandNpmWildcard;
;
