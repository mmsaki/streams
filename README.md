# Getting started

Install dependencies

```zsh
pnpm install
```

## Testing

Run

```zsh
pnpm test
```

## Testing config

- Using `babel.config.js` configuration see more on [documentation](https://babeljs.io/docs/)

# Concat Stream server

Run

```zsh
pnpm run concat-stream
```

On separate terminal send out a message

```zsh
curl -d message='hello' localhost:5000
```
