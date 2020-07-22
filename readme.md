# Dynamic Versioning

Dynamic Versioning, or DynaVer for short, is a specification for versioning which is very intuitive and versatile -- you probably use something very similar to this naturally. DynaVer is a superset of [SemVer](https://github.com/semver/semver), meaning all valid SemVers are valid DynaVers.

## Format
*Note: Values in `<`angle brackets`>` are variable names, values in `[`square brackets`]` are optional, and values in `(`parentheses`)` must select one of the values delimited by a pipe (`|`).*

The following is the general format for a Dynamic Version: `<Number>[<Identifiers>][<Metadata>]`. **Number** can be split into between two and four segments: `<Disruptive>.<Incompatible>`, `<Disruptive>.<Incompatible>.<Compatible>`, and `<Disruptive>.<Incompatible>.<Compatible>.<Patch>`.

**Extended layout:**
- `<Disruptive>.<Incompatible>[.<Compatible>[.<Patch>]]([-<Pre>][_<Post>]|[_<Post>][-<Pre>])[(+|~)<Metadata>]`

**Allowed layouts:**
- `<Disruptive>.<Incompatible>` (e.g., `1.0`)
- `<Disruptive>.<Incompatible>-<Pre>` (e.g., `2.3-pre1`)
- `<Disruptive>.<Incompatible>_<Post>` (e.g., `1.04_5`)
- `<Disruptive>.<Incompatible>-<Pre>_<Post>` (e.g., `5.10-rc1_01`)
- `<Disruptive>.<Incompatible>_<Post>-<Pre>` (e.g., `3.1_nightly-5`)
- `<Disruptive>.<Incompatible>.<Compatible>` (e.g., `1.0.008`)
- `<Disruptive>.<Incompatible>.<Compatible>-<Pre>` (e.g., `2.3.0-Beta.2`)
- `<Disruptive>.<Incompatible>.<Compatible>_<Post>` (e.g., `6.1.9_01`)
- `<Disruptive>.<Incompatible>.<Compatible>-<Pre>_<Post>` (e.g., `3.1.08-alpha1_v2`)
- `<Disruptive>.<Incompatible>.<Compatible>_<Post>-<Pre>` (e.g., `1.0.04_1-rc`)
- `<Disruptive>.<Incompatible>.<Compatible>.<Patch>` (e.g., `2.0.1.3`)
- `<Disruptive>.<Incompatible>.<Compatible>.<Patch>-<Pre>` (e.g., `2.0.3.0-rc3`)
- `<Disruptive>.<Incompatible>.<Compatible>.<Patch>_<Post>` (e.g., `1.0.0.1_3`)
- `<Disruptive>.<Incompatible>.<Compatible>.<Patch>-<Pre>_<Post>` (e.g., `10.1.4.13-RC_1`)
- `<Disruptive>.<Incompatible>.<Compatible>.<Patch>_<Post>-<Pre>` (e.g., `2.1.0.0_next-pre2`)

**Metadata** may be added to any of the above formats

**SemVer layout:**

While DynaVer allows four **Number** parts, SemVer only allows three. Additionally, many environments that use SemVer do not allow metadata. Therefore, the following format must be used in SemVer environments, such as npm:

`<Disruptive>.<Incompatible>.<Compatible>-<Patch>[(-<Pre>|_<Post>)]`

### Number

Each part of the **Number** segment must be an integer number (`[0-9]`) and may be zero-padded. Each declared part is delimited by a dot (`.`). The **Number** segment must come first in a version string.

#### Disruptive
The **Disruptive** **Number** must be incremented whenever there is a change made to the project which drastically breaks or disrupts existing functionality for many of your users.

#### Incompatible
The **Incompatible** **Number** must be incremented whenever there is a change made that breaks minor existing functionality for some users who are following your documentation correctly.

#### Compatible
The optional **Compatible** **Number** must be incremented whenever only backwards-compatable changes are made to the project.

#### Patch
The optional **Patch** **Number** must be incremented whenever only backwards-compatable bug fixes are made which make existing functionality work correctly as described by your documentation.

### Identifier

The **Identifier** segment can contain **Pre**, **Post**, or both in any permutation. The **Identifier** must go after the **Number** segment and before the **Metadata**. **Identifier**s should only contain alphanumeric characters and full stops (`[a-zA-Z0-9.]`).

#### Pre
The optional **Pre** **Identifier** may be used to mark a version that is currently in development. It must be prefixed with a hyphen-minus character (`-`).

#### Post
The optional **Post** **Identifier** may be used to mark a version that only differs in a slight, usually inconsequential way from its parent, such as a hotfix for a version or to fix or tweak the wording of documentation or code comments, but may also be used to mark changes that are for an unknown future release. It must be prefixed with an underscore (`_`).

### Metadata
The optional **Metadata** segment may be used to mark the metadata of a build. Versions with differing **Metadata** must not have differing features or implementations, and so is recommended for releasing versions for different platforms that need slightly different code or compilation, or for tagging a version with build information or Git hashes. The **Metadata** segment must be prefixed with a plus sign (`+`); if this character is not allowed to be used in your program, or the version is being used in a URL, it may be replaced with a tilde (`~`). **Metadata** should only contain alphanumeric characters, dots, underscores and hyphens (`[a-zA-Z0-9._-]`).

## Incrementing
Each part of a **Number** must increment individually as an integer; the incompatible version after `1.9` is `1.10`, which is not the same as `1.1`. All **Number** parts following the part incremented must be reset (implicitly to `0`); `1.2.1` is followed by `1.3`. Each dot-seperated **Identifier** part should increment in such a way that the new version sorts lexically after the previous version as described by the comparison information below. The **Pre** segment typically follows progressions such as `-alpha` -> `-beta` -> `-rc` or `-dev` -> `-pre`. The **Post** segment is typically a single number representing the recompilation count, such as `_1` -> `_2`, etc.

### Example
`0.0.1` -> `0.0.1.1` -> `0.0.2.0` -> `0.0.1` -> `0.01` -> `0.1.0.1` -> `0.2.0` -> `0.2.1` -> `0.2.1_1` -> ... -> `0.9` -> `0.10` -> ... -> `1.0-pre1` -> `1.0-pre2` -> ... -> `1.0-pre10` -> `1.0.0-rc` -> `1.0.0+win` & `1.0.0+mac` -> `1.0_1` -> `1.0.0.1` -> `1.0.1.0` -> `1.1-dev+39f2e51` -> `1.01` -> ... -> `1.9.0` -> `1.9.1` -> `1.10` -> ... -> `2.0-rc.1` -> `2.0-rc2` -> `2.0-rc2_1` -> `2.00`

## Comparing
Versions should be compared by going across from the right, comparing each **Number** part numerically. When **Compatible** and **Patch** are missing, they default to `0`, such that `1.0-pre2` < `1.0.0-pre3` and `1.06` = `1.6` = `1.6.0` = `1.6.0.0`. Versions with **Pre** **Identifier**s take lower precedence than their corresponding release versions, such that `0.7-pre1` < `0.7`. Versions with **Post** **Indentifier**s take higher precedence than their corresponding release versions, such that `1.6.0` < `1.6_1`. When two versions contain inconsistent dot-seperated **Identifier** parts, the dots should be removed when comparing, such that `1.0-A.B` < `1.0-AC`. When an **Identifier** contains numbers, the numbers should be compared numerically and independently from the surrounding characters, such that `1.4-pre4` < `1.4-pre10`. **Metadata** must be ignored completely when comparing versions.

## Named ranges
Versions in range `0.0.0.*` are Pre-Alpha versions. Versions in this range should probably not be released to the public and may be unstable, or even nonfunctional, with prevalent major bugs. Since there is only one version number to increment, any changes, breaking or patch, can be added in any new version, and so **Pre** and **Post** **Identifier**s may be useful for denoting semantic changes in this range.

Versions in range `0.0.*` are Alpha versions. These versions may be publicly released but may not have been thoroughly tested and may contain major bugs. Versions in this range may increment using the colloquial format `0.0.<Feature>.<Patch>` since "**Compatible**" is deemed redundant without **Incompatible** existing. Versions should now have some semantic meaning with major features not being added in patch releases.

Versions in range `0.*` are Beta versions. These versions are relatively stable and should be able to be safely used but with the expectation of having a few bugs. Versions in this range are incremented using the regular **Number** format but without changes bumping the **Disruptive** part. Versions in this range should now have semantic meaning, following the `0.<Incompatible>.<Compatible>.<Patch>` format.

Versions after `0.*` (`1.*`, `2.*`, etc) are Release versions. These versions are expected to be stable and able to be used without common bugs, and versions have the expectation of having strict semantic meaning, so that a user can declare they want to receive, for example, only `1.6.*` versions, and they should be able to use their software without any incompatible changes breaking it.

## Upgrading
A version may be upgraded from one development phase or to the next or a pre-release to full release at any point, and the new version does not need to match the upgrading criteria applied to release versions. For example, 0.7.3 could be followed by 1.00 which may only contain a single bug fix, and 1.1.0-rc3 and 1.1.0 may be the exact same version.
