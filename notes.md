# Netwoking protocols

# Other

- Netcat

  ```zsh
  nc www.google.com 80
  GET / HTTP/1.0
  Host: www.google.com

  ```

- curl

  ```zsh
  curl -I -s google.com
  ```

- [Unix Commands](https://github.com/FrontendMasters/fmmn/blob/master/day1/unix.md)

# Network Protocols

- [Hypertext Transfer Protocol (HTTP) rfc2616 - web](https://datatracker.ietf.org/doc/html/rfc2616)
- [Simple Mail Transfer Protocol (smtp) rfc821 - email](https://datatracker.ietf.org/doc/html/rfc821)
- [Internet Relay Chat (irc) rfc2812 - chat](https://datatracker.ietf.org/doc/html/rfc2812)

# Streams (with node)

- we can compose streaming abstractions
- we can operate on data chunk by chunk

1. Through2 `npm install through2`
   a.) **through(write, end)** - with through there are 2 parameters: `write` and `end`

   - `function write (buf, enc, next) {}`
   - `function end () {}`
   - Call`next()` when you're ready for the next chunk. If you don't call `next()`, your stream will hang!
   - call `this.push(VALUE)` inside the callback to put VALUE into the streams output.
   - use a `VALUE` of `null` to end the stream

   b.) If you dont give through any arguments, these are the default values for write and end:

   - `function write (buf, enc, next) {this.push(buf); next()}`
   - `function end () {this.push(null)}`
     - this means that `though()` with no arguments will pass everything written as input directly though to its output

   ```js
   function toUpper() {
   	return through(function (buf, enc, next) {
   		// next(null, buf.toString(), toUpperCase())
   		this.push(buf.toString(), toUppercase());
   		next();
   	});
   }
   ```

1. Core Stream (readable-stream) `npm install readable-stream` vs Through2

   - `new Transform({ transform: write, flush: end, ...})`
   - `through2(opts={...}, write, end)`

1. Concat Stream `npm install concat-stream`
   - See example
   ```zsh
   pnpm run concat-stream
   ```

## Stream types

1. **readable** - produces data: you can pipe FROM it - (fs.readstream) `readable.pipe(A)`
1. **writable** - consumes data: you can pipe TO it (concat-stream) `A.pipe(writable)`
1. **transform** - consumes data, producing transformed data (throught2) `A.pipe(transform).pipe(B)`
1. **duplex** - consumes data separately from producing it (eg. telephone, bidirectional streams) `A.pipe(duplex).pipe(A)`

### 1. writable streams

1. `.write(buf)`
1. `.end()`
1. `.end(buf)`
1. `on.('finish', function () {})`
1. `(...).pipe(stream)`

```zsh
pnpm run write-stream
```
