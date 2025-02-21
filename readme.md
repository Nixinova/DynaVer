# Dynamic Versioning 1.0

Dynamic Versioning, or DynaVer for short, is a specification for versioning which is very intuitive and versatile &ndash; you probably use something very similar to this naturally.
DynaVer is a superset of [SemVer](https://github.com/semver/semver), meaning all valid SemVers are valid DynaVers, albeit with subtly different semantics.

## Summary
DynaVer differs from SemVer in three ways: the major version part has been split into two parts for denoting major and minor breaking changes, some version parts may be left unset, and a post-release identifier has been added.

## Definitions
The capitalised keywords Must, Must Not, Should, Should Not, May, May Not, Mandatory, and Optional in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).

Values in `<`angle brackets`>` are variable names, values in `[`square brackets`]` are optional, and values in `(`parentheses`)` must select one of the values delimited by a pipe (`|`).

## Format
The following is the general format for a Dynamic Version: `<Number>[<Identifiers>][<Metadata>]`. **Number** can be split into between two and four parts: `<Disruptive>.<Breaking>`, `<Disruptive>.<Breaking>.<Compatible>`, and `<Disruptive>.<Breaking>.<Compatible>.<Patch>`.

### Extended layout
- `<Disruptive>.<Breaking>[.<Compatible>[.<Patch>]]([-<Pre>][_<Post>]|[_<Post>][-<Pre>])[+<Metadata>]`

### Allowed layouts
- `<Disruptive>.<Breaking>` (e.g., `1.0`)
- `<Disruptive>.<Breaking>-<Pre>` (e.g., `2.3-pre1`)
- `<Disruptive>.<Breaking>_<Post>` (e.g., `1.04_5`)
- `<Disruptive>.<Breaking>-<Pre>_<Post>` (e.g., `5.10-rc1_01`)
- `<Disruptive>.<Breaking>_<Post>-<Pre>` (e.g., `3.1_nightly-5`)
- `<Disruptive>.<Breaking>.<Compatible>` (e.g., `1.0.008`)
- `<Disruptive>.<Breaking>.<Compatible>-<Pre>` (e.g., `2.3.0-Beta.2`)
- `<Disruptive>.<Breaking>.<Compatible>_<Post>` (e.g., `6.1.9_01`)
- `<Disruptive>.<Breaking>.<Compatible>-<Pre>_<Post>` (e.g., `3.1.08-alpha1_v2`)
- `<Disruptive>.<Breaking>.<Compatible>_<Post>-<Pre>` (e.g., `1.0.4_1-rc`)
- `<Disruptive>.<Breaking>.<Compatible>.<Patch>` (e.g., `4.0.1.3`)
- `<Disruptive>.<Breaking>.<Compatible>.<Patch>-<Pre>` (e.g., `2.0.3.0-rc3`)
- `<Disruptive>.<Breaking>.<Compatible>.<Patch>_<Post>` (e.g., `1.8.0.1_3`)
- `<Disruptive>.<Breaking>.<Compatible>.<Patch>-<Pre>_<Post>` (e.g., `10.1.4.13-RC_1`)
- `<Disruptive>.<Breaking>.<Compatible>.<Patch>_<Post>-<Pre>` (e.g., `2.1.0.0_next-pre2`)

**Metadata** May be added to any of the above formats.

### Number

Each part of the **Number** segment Must be an integer number (`[0-9]`) and may be zero-padded. Each declared part is delimited by a dot (`.`). The **Number** segment Must come first in a version string.

#### Disruptive
The Mandatory **Disruptive** **Number** part Must be incremented when there are major changes made to your project that cannot be easily fixed by users.

#### Breaking
The Mandatory **Breaking** **Number** part Must be incremented when there is a change made that breaks functionality in such a way that users are able to quickly fix their projects.

#### Compatible
The Optional **Compatible** **Number** part Must be incremented only when backwards-compatible additions are made to the project.

#### Patch
The Optional **Patch** **Number** part Must be incremented only when backwards-compatible bug fixes are implemented to make existing functionality work correctly.

### Identifier

The Optional **Identifier** segment contains **Pre**, **Post**, or both in any permutation. The **Identifier** Must go after the **Number** segment and before the **Metadata**.

A version that does not include an **Identifier** (i.e., the **Identifier** segment is blank) is known as a **Full Release**.

#### Pre
The Optional **Pre** **Identifier** part May be used to mark a version that is currently in development. It Must be prefixed with a hyphen-minus character (`-`). The **Pre** **Identifier** typically follows incrementing progressions such as `-alpha` &rarr; `-beta` &rarr; `-rc` or `-dev` &rarr; `-pre`. **Pre** **Identifier**s Should only contain alphanumeric characters, dots and hyphens (`[a-zA-Z0-9.-]`).

#### Post
The Optional **Post** **Identifier** part May be used to mark a version that only differs in a slight, usually inconsequential way from its parent, such as a hotfix for a version or to fix or tweak the wording of documentation or code comments, but May also be used to mark changes that are for an unknown future release (e.g., `3.1_nightly.4`). It Must be prefixed with an underscore (`_`). **Post** **Identifier**s Should only contain alphanumeric characters, dots and underscores (`[a-zA-Z0-9._]`).

### Metadata
The Optional **Metadata** segment May be used to mark the metadata of a build. Versions with differing **Metadata** Must Not have differing features or implementations. This segment may be used to release versions for different platforms that need slightly different code or compilation, or for tagging a version with build information or a commit hash. The **Metadata** segment Must be prefixed with a plus sign (`+`). **Metadata** Should only contain alphanumeric characters, dots, underscores and hyphens (`[a-zA-Z0-9._-]`).

## Incrementing
Each part of a **Number** Must increment individually as an integer; the next **Breaking** version after `1.9` is `1.10`, which is not the same as `1.1`. All **Number** parts following the part incremented Must be reset (implicitly to `0`); `1.2.1` is followed by `1.3`. Each dot-seperated **Identifier** part Should increment in such a way that the new version sorts lexically after the previous version as described by the comparison information below. No version Must be semantically equal to any previous version &ndash; if there is already a version called `2.3` there Must Not be any other versions called `2.03`, `2.3.0`, etc, as all of these Must be treated as the exact same version.

### Example
`0.0.1` &rarr; `0.0.1.1` &rarr; `0.0.2.0` &rarr; `0.0.1` &rarr; `0.01` &rarr; `0.1.0.1` &rarr; `0.2.0` &rarr; `0.2.1` &rarr; `0.2.1_1` &rarr; ... &rarr; `0.9` &rarr; `0.10` &rarr; ... &rarr; `1.0-pre1` &rarr; `1.0-pre2` &rarr; ... &rarr; `1.0-pre10` &rarr; `1.0.0-rc` &rarr; `1.0.0+win` & `1.0.0+mac` &rarr; `1.0_1` &rarr; `1.0.0.1` &rarr; `1.0.1.0` &rarr; `1.1-dev+39f2e51` &rarr; `1.01` &rarr; ... &rarr; `1.9.0` &rarr; `1.9.1` &rarr; `1.10` &rarr; ... &rarr; `2.0-rc.1` &rarr; `2.0-rc2` &rarr; `2.0-rc2_1` &rarr; `2.00`

## Comparing
Versions Should be compared by going across from the right, comparing each **Number** part numerically, such that `2.3` = `2.03` = `02.003`. When **Compatible** and **Patch** are missing, they default to `0`, such that `1.0-pre2` < `1.0.0-pre3` and `1.6` = `1.6.0` = `1.6.0.0`. Versions with **Pre** **Identifier**s take lower precedence than their corresponding release versions, such that `0.7-pre1` < `0.7`. Versions with **Post** **Indentifier**s take higher precedence than their corresponding release versions, such that `1.6.0` < `1.6_1`. When an **Identifier** contains numbers, the numbers Must be compared numerically and independently from the surrounding characters, such that `1.4-pre4` < `1.4-pre10`. Dots May be used to force a comparison split, such that `1.0-1.8` < `1.0-12`. **Metadata** Must be ignored completely when comparing versions.

## Promoting
A version May be promoted from one **Named Range** to the next or from a pre-release version (a version that includes a **Pre** **Identifier**) to a **Full Release** at any point, and this new version need not match the incrementing criteria applied to release versions. For example, 0.7.3 could be followed by 1.00 which may only contain a single bug fix, and 1.1.0-rc3 and 1.1.0 may be the exact same version.

## Named Ranges
Versions in range `0.0.0.*` are **Pre-Alpha** versions. Versions in this range should probably not be released to the public and may be unstable, or even nonfunctional, with prevalent major bugs. Since there is only one version number to increment, any changes, breaking or patch, can be added in any new version, and so **Pre** and **Post** **Identifier**s may be useful for denoting semantic changes in this range.

Versions in range `0.0.*` are **Alpha** versions. These versions may be publicly released but may not have been thoroughly tested and so may contain major bugs. Versions in this range may increment using the colloquial format `0.0.<Feature>.<Patch>` since "**Compatible**" is deemed redundant without **Breaking** existing. Versions Should now have some semantic meaning with major features not being added in patch releases.

Versions in range `0.*` are **Beta** versions. These versions are relatively stable and should be able to be safely used but with the expectation of having a few bugs. Versions in this range are incremented using the regular **Number** format but without changes bumping the **Disruptive** part. Versions in this range now have semantic meaning, following the `0.<Breaking>.<Compatible>.<Patch>` format.

Versions after `0.*` (`1.*`, `2.*`, etc) are **Release** versions. These versions are expected to be stable and able to be used without common bugs, and versions Must now have strict semantic meaning, so that a user can receive, for example, the latest `1.6.*` version, and be able to use their software without any incompatible changes breaking it.
