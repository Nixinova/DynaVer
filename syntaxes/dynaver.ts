export default class DynaVer {

    private _version: string

    private numberRegex = /^(\d+)\.(\d+)(?:\.(\d+)(?:\.(\d+))?)?/
    private preIdentifierRegex = /(?<!\+.+)-([a-zA-Z\d.-]+)/
    private postIdentifierRegex = /(?<!\+.+)_([a-zA-Z\d._]+)/
    private identifierRegex = RegExp(`${this.preIdentifierRegex.source}(${this.postIdentifierRegex.source})?|${this.postIdentifierRegex.source}(${this.preIdentifierRegex.source})?`)
    private metadataRegex = /\+([\w.-]+)$/
    private dynaverRegex = RegExp(`^${this.numberRegex.source}(${this.identifierRegex.source})?(${this.metadataRegex.source})?$`)

    constructor(version: string) {
        this._version = version
    }

    // Checkers

    isValid(): boolean {
        return this.dynaverRegex.test(this.version)
    }

    hasCompatiblePart(): boolean {
        return /^(\d+\.){2}\d+/.test(this.version)
    }

    hasPatchPart(): boolean {
        return /^(\d+\.){3}\d+/.test(this.version)
    }

    hasIdentifier(): boolean {
        return this.identifierRegex.test(this.version)
    }

    hasPreIdentifier(): boolean {
        return this.hasIdentifier() && this.preIdentifierRegex.test(this.version)
    }

    hasPostIdentifier(): boolean {
        return this.hasIdentifier() && this.postIdentifierRegex.test(this.version)
    }

    hasMetadata(): boolean {
        return this.metadataRegex.test(this.version)
    }

    // Getters

    get version(): string {
        return this._version;
    }

    get number(): string {
        return this.version.match(/^\d+\.\d+(\.\d+(\.\d+)?)?/)?.[0] || "";
    }

    get numberParts(): object {
        let arr = this.number.split('.').map(str => Number(str))
        return { disruptive: arr[0], breaking: arr[1], compatible: arr[2] || 0, patch: arr[3] || 0, ...arr }
    }

    get disruptivePart(): number {
        return Number(this.version.match(this.numberRegex)?.[1] || "0")
    }

    get breakingPart(): number {
        return Number(this.version.match(this.numberRegex)?.[2] || "0")
    }

    get compatiblePart(): number {
        return Number(this.version.match(this.numberRegex)?.[3] || "0")
    }

    get patchPart(): number {
        return Number(this.version.match(this.numberRegex)?.[4] || "0")
    }

    get identifierString(): string {
        return this.hasIdentifier() && this.version.match(this.identifierRegex)?.[0] || "";
    }

    get preIdentifier(): string {
        return this.hasPreIdentifier() && this.version.match(this.preIdentifierRegex)?.[1] || "";
    }

    get postIdentifier(): string {
        return this.hasPostIdentifier() && this.version.match(this.postIdentifierRegex)?.[1] || "";
    }

    get metadata(): string {
        return this.hasMetadata() && this.version.match(this.metadataRegex)?.[1] || "";
    }

}
