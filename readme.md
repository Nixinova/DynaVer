# Dynamic Versioning

Dynamic Versioning, or DynaVer for short, is a specification for versioning which is very intuitive and versatile -- you probably use something very similar to this naturally. DynaVer is a superset of [SemVer](https://github.com/semver/semver), meaning all valid SemVers are valid DynaVers.

## Format
*Note: Values in `<`angle brackets`>` are variable names, values in `[`square brackets`]` are optional, and values in `(`parentheses`)` must select one of the values delimited by a pipe (`|`).*

The following is the general format for a Dynamic Version: `<Number>[<Identifier>][<Metadata>]`. **Number** can be split into between two and four segments: `<Disruptive>.<Breaking>`, `<Disruptive>.<Breaking>.<Feature>`, and `<Disruptive>.<Breaking>.<Feature>.<Fix>`.

**Extended layout:**
- `<Disruptive>.<Breaking>[.<Feature>[.<Fix>]][((-|~)<Pre>|_<Post>)][+<Metadata>]`

**Allowed layouts:**
- `<Disruptive>.<Breaking>` (e.g., `1.0`)
- `<Disruptive>.<Breaking>-<Pre>` (e.g., `2.3-pre1`)
- `<Disruptive>.<Breaking>-<Pre>+<Metadata>` (e.g., `0.4-pre1+build5`)
- `<Disruptive>.<Breaking>_<Post>` (e.g., `1.4_5`)
- `<Disruptive>.<Breaking>_<Post>+<Metadata>` (e.g., `3.1_2+bump-deps`)
- `<Disruptive>.<Breaking>+<Metadata>` (e.g., `0.8+5`)
- `<Disruptive>.<Breaking>.<Feature>` (e.g., `1.0.8`)
- `<Disruptive>.<Breaking>.<Feature>-<Pre>` (e.g., `2.3.0-beta2`)
- `<Disruptive>.<Breaking>.<Feature>-<Pre>+<Metadata>` (e.g., `1.6.7-alpha1+2020.05`)
- `<Disruptive>.<Breaking>.<Feature>_<Post>` (e.g., `6.1.9_1`)
- `<Disruptive>.<Breaking>.<Feature>_<Post>+<Metadata>` (e.g., `2.2.3_1+recompiled`)
- `<Disruptive>.<Breaking>.<Feature>+<Metadata>` (e.g., `1.9.0+release.1`)
- `<Disruptive>.<Breaking>.<Feature>.<Fix>` (e.g., `2.0.1.3`)
- `<Disruptive>.<Breaking>.<Feature>.<Fix>-<Pre>` (e.g., `2.0.3.0-rc3`)
- `<Disruptive>.<Breaking>.<Feature>.<Fix>-<Pre>+<Metadata>` (e.g., `0.9.4.2-dev+3`)
- `<Disruptive>.<Breaking>.<Feature>.<Fix>_<Post>` (e.g., `1.0.0.1_3`)
- `<Disruptive>.<Breaking>.<Feature>.<Fix>_<Post>+<Metadata>` (e.g., `3.1.4.5_1+20200610`)
- `<Disruptive>.<Breaking>.<Feature>.<Fix>+<Metadata>` (e.g., `2.0.1.0+1e73fa6`)

### Number

Each part of the **Number** segment must be an integer number (`[0-9]`) and may be zero-padded. Each declared part is delimited by a dot (`.`). The **Number** segment must come first in a version string.

#### Disruptive
The **Disruptive** **Number** must be incremented whenever there is a change made to the project which drastically breaks or disrupts existing functionality for many of your users.

#### Breaking
The **Breaking** **Number** must be incremented whenever there is a change made that breaks existing functionality for some users who are following your documentation correctly.

#### Feature
The optional **Feature** **Number** must be incremented whenever backwards-compatable changes are made to the project.

#### Fix
The optional **Fix** **Number** must be incremented only when backwards-compatable bug fixes are made which make existing functionality work correctly as described by your documentation.

### Identifier

The **Identifier** segment can either contain **Pre** or **Post**, but not both. The **Identifier** must go after the **Number** segment and before the **Metadata**. **Identifier**s should only contain alphanumeric characters, full stops, underscores and hyphens (`[a-zA-Z0-9._-]`).

### Pre
The optional **Pre** **Identifier** may be used to affix a version that is currently in development. The **Pre** identifier must be prefixed with a hyphen-minus character (`-`); if this character is not allowed to be used in your program, it may be replaced with a tilde (`~`).

### Post
The optional **Post** **Identifier** may be used to mark a version that is currently in development. The **Post** identifier must be prefixed with an underscore (`_`).

### Metadata
The optional **Metadata** segment may be used to mark the metadata of a build. The **Metadata** segment must be prefixed with a plus sign (`+`). **Metadata** should only contain alphanumeric characters, dots, underscores and hyphens (`[a-zA-Z0-9._-]`).

## Incrementing
Each part of a **Number** must increment individually as an integer; the version after `1.9` could be `1.10`, which is not the same as `1.1`. All **Number** parts following the part incremented must be reset (implicitly to `0`); `1.2.1` is followed by `1.3`. Each dot-seperated **Identifier** part should increment in such a way that the new version sorts lexically after the previous version; when two versions contain inconsistent dot-seperated parts, the dots should be removed when comparing (e.g., `1.0-pre.1` < `1.0-pre2`). The **Pre** segment typically follows progressions such as `-alpha.<*>` -> `-beta.<*>` -> `-rc.<*>` or `-dev.<*>` -> `-pre.<*>`. The **Post** segment is typically a single number representing the recompilation count.

### Example
`0.1` -> `0.1.0.1` -> `0.2` -> `0.2.1` -> `0.2.1_1` -> `1.0-pre` -> `1.0-rc` -> `1.0+1` -> `1.0_1+2` -> `1.0.0.1+3` -> `1.0.1+4`