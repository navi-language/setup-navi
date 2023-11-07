# Setup Navi

GitHub Actions for Setup [Navi](https://navi-lang.org).

## Usage

Use the latest stable version:

```yaml
- uses: navi-language/setup-navi@v1
```

If you wants special a Navi version:

```yml
- uses: navi-language/setup-navi@v1
  with:
    navi-version: 0.9.0-nightly
```

Use `navi-version: nightly` to use the latest nightly version.

```yml
- uses: navi-language/setup-navi@v1
  with:
    navi-version: nightly
```
