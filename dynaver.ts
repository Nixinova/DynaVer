export default class DynaVer {

    protected version: string

    private numberRegex = /^(\d+)\.(\d+)(?:\.(\d+)(?:\.(\d+))?)?/
    private preIdentifierRegex = /(?<!\+.+)-([a-zA-Z\d.-]+)/
    private postIdentifierRegex = /(?<!\+.+)_([a-zA-Z\d._]+)/
    private identifierRegex = RegExp(`${this.preIdentifierRegex.source}(${this.postIdentifierRegex.source})?|${this.postIdentifierRegex.source}(${this.preIdentifierRegex.source})?`)
    private metadataRegex = /\+([\w.-]+)$/
    private dynaverRegex = RegExp(`^${this.numberRegex.source}(${this.identifierRegex.source})?(${this.metadataRegex.source})?$`)

    constructor(version: string) {
        this.version = version
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

    getVersionString(): string {
        return this.version;
    }

    getNumber(): string {
        return this.version.match(/^\d+\.\d+(\.\d+(\.\d+)?)?/)?.[0] || "";
    }

    getNumberParts(): object {
        let arr = this.getNumber().split('.').map(str => parseInt(str))
        return { disruptive: arr[0], breaking: arr[1], compatible: arr[2] || 0, patch: arr[3] || 0, ...arr }
    }

    getDisruptivePart(): number {
        return parseInt(this.version.match(this.numberRegex)?.[1] || "0")
    }

    getBreakingPart(): number {
        return parseInt(this.version.match(this.numberRegex)?.[2] || "0")
    }

    getCompatiblePart(): number {
        return parseInt(this.version.match(this.numberRegex)?.[3] || "0")
    }

    getPatchPart(): number {
        return parseInt(this.version.match(this.numberRegex)?.[4] || "0")
    }

    getIdentifierString(): string {
        return this.hasIdentifier() && this.version.match(this.identifierRegex)?.[0] || "";
    }

    getPreIdentifier(): string {
        return this.hasPreIdentifier() && this.version.match(this.preIdentifierRegex)?.[1] || "";
    }

    getPostIdentifier(): string {
        return this.hasPostIdentifier() && this.version.match(this.postIdentifierRegex)?.[1] || "";
    }

    getMetadata(): string {
        return this.hasMetadata() && this.version.match(this.metadataRegex)?.[1] || "";
    }

}
