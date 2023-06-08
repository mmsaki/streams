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

### 2. readable streams

1. `stream.pip(...)`
1. `stream.once('end', function () {})`

   > you probably won't need to call these very often

1. `stream.read()`
1. `stream.on('readable', function () {})`

   > **note**: you can let a module or `.pipe()` take care of calling those

1. **paused mode** - default behavior with automatic backpressure
1. **flowing mode** - data is consumed as soon as chunks are available (no backpressure), you can turn it on by:
   1. `stream.resume()`
   1. `stream.on('data', function (buf) {})`

### 3. transform stream

1. ALL readable AND writable method streams are available
1. `input -> transform -> output`

### 4. duplex stream

eg. echo server `echo-stream.js` with `net.createServer()`

1. Run `pnpm run duplex-stream`
1. Open another terminal and run `nc localhost 5000`
1. Type hello in the terminal, it returns hello (echo server)
1. Run a proxy-server `pnpm run proxy-stream` at 5001
1. Connect to proxy server `nc localhost 50001`

> let's build a vpn, for a better one you can use libsodium

1. create an echo server in `src/echo-stream.js` and run

   ```zsh
   pnpm run echo-stream
   ```

1. create a vpn proxy server `src/vpn-stream.js` and run in a separate terminal

   ```zsh
   pnpm run vpn-stream
   ```

1. create a vpn client `src/vpn-client.js` and run in a separate terminal

   ```zsh
   pnpm run vpn-client
   ```

   > Inside the client terminal type data, the more data you send - it will return back the decrytped data after the buffer is filed

## 5. Object streams

Normally you can only read and write buffers and strings with streams. However, if you initalize a stream in `objectMode`, you can use any kind of object (except for `null`)

> You can use 'through2' by call the `through.obj to activate object streaming mode

1. Create `src/object-stream.js` and run

   ```zsh
   pnpm run object-stream
   ```

1. Type any data in the terminal

   > This will return a tally of the length of the data (bytes) and the total size of data we have seen so far, `obj= { length: 3, total: 174 }`. We also have an `end` function that runs when read input is stopped with control + c

### core streams in node

1. `fs.createReadStream()`
1. `fs.createWriteStream()`
1. `process.stdin`, `process.stderror`
1. `ps.stdin`, `ps.stdout`,`ps.stderror` e.g in `src/child-process.js`
1. `net.connect()`, `tls.connect()`
1. `net.createServer(function (stream) {})`
1. `tls.createServer(opts, function(stream) {})`

## 6. https core streams

```js
// req: readable, res: writable
http.createServer(function (req, res {}))

// req: writable res: readable
var req = http.request(opts, function (res) {})
```

1. create a server

   ```zsh
   pnpm run http-server
   ```

1. create a client
   ```zsh
   pnpm run http-client
   ```

## 7. crypto core streams

We can create streams for creating hashes

1. create hash-stream in `src/hash-stream.js` and run

   ```zsh
   pnpm run hash-stream
   ```

1. Add input into terminal, hit control + d and it will return hashes of the data or

   ```zsh
   echo -n input-data | node src/hash-stream.js; echo

   # equal to this
   echo -n input-data | shasum -a 256
   ```

## 8. Zlib core streams

1. `zlib.createGzip(opts)` - transforms stream to compress with gzip
1. `zlib.createGunzip(opts)` - transform stream to uncompress with gzip
1. `zlib.createDeflate(optst)` - transform stream to compress with deflate
1. `zlib.createDeflateRaw(opts)` - transform stream to compress with raw deflate
1. `zlib.createInflate(opts)` - transform stream to uncompress with deflate
1. `zlib.createInflateRaw(opts)` - transform stream to uncompress with raw deflate
1. `zlib.createUnzip(opts)` - transform stream to uncompress gzip and deflate

Create a gzip streams

1. Create gzip file

   ```zsh
   gzip -<greets.txt > greets.txt.gz
   ```

   > run `gunzip < greets.txt.gz` to check the contents of the file

1. Create `src/gunzip-stream.js` and run

   ```zsh
   pnpm run gunzip-stream
   ```

   > **Note**: This program does the same thing as `gunzip < greets.txt.gz` only difference is we added crypto hashing to our pipeline stream.
   > The hash should match the result from our original file `shasum -a 512 < greets.txt` also same as `gunzip < greets.txt.gz | shasum -a 512`

## 9. Split2 streams

Split input on newlines - This program counts the number of lines of input, like `wc -l`

1. Create stream in `src/line-stream.js`

   ```zsh
   pnpm run line-stream
   ```

   > This return the same as running `wc -l greets.txt`

1. We can also add custom regex by white space to stream words
   ```zsh
   pnpm run word-stream
   ```

## 10. Websocket stream

We can also use streams in the browser

1. Create websocket stream in `src/websocket-stream.js`

1. Create websocker client in `src/websocket-client.js`

1. Add content to the public folder that you will be serving in `public/index.html`

1. Install browserify `pnpm i -g browserify` and run

   ```zsh
   pnpm run websocket-bundle

   # or

   browserify scr/websocket-client.js > public/bundle.js
   ```

   > **Note**: You can also use tools like watchify of budo to recompile everytime you modify your file

1. Run the server

   ```zsh
   pnpm run websocket-server
   ```

1. Go to `http://localhost:5000`

   > Enter in the text input.
   > **Note**: If you make a mistake in the `src/websocket-client.js`, you might fix it and need to regenerate a new bundle + clear the browser cache.

1. While websocket server is still running, create a websocket cli tool in `src/websocket-cli.js` and run

   ```zsh
   pnpm run websocket-cli
   ```

   > This will give same result as in the browser on stdin

## 11. [`collect-stream`](https://www.npmjs.com/package/collect-stream)

Can be useful for testing

Collect a stream's output into a single buffer - for object stream, collect output into an array of objects

1. create a collect stream in `src/collect-stream.js`

## 12. [`to2`](https://www.npmjs.com/package/to2)

Can replace any through2 with to2 if it's an only readable stream

## 13. [`duplexify`](https://www.npmjs.com/package/duplexify)

If you need to create a directory and write to it after

## 14. [`pump`](https://www.npmjs.com/package/pump)

Allows handling of errors when your stream has many pipes which usually crashes your server if one of them encounter an error e.g in `src/vpn-stream.js`

## 15. [`Pumpify`](https://www.npmjs.com/package/pumpify)

## 16. [`end-of-stream`](https://www.npmjs.com/package/end-of-stream)

## 17. [`rpc-stream`](https://www.npmjs.com/package/rpc-stream)

Call methods defined by a remote endpoint

1. Create rpc stream server in `src/rpc-server.js` and run

   ```zsh
   pnpm run rpc-server
   ```

1. Create rpc client in `src/rpc-client.js` and run
   ```zsh
   pnpm run rpc-client
   ```

## 18. [`multiplex`](https://www.npmjs.com/package/multiplex)

1. create multiplex server in `scr/multiplex-server.js` and run
   ```zsh
   pnpm run multiplex-server
   ```
1. Create a client in `scr/multiplex-client.js` and run

   ```zsh
   pnpm run multiplex-client
   ```

## 19. [`webrtc-swarm`](https://www.npmjs.com/package/webrtc-swarm)

other deps: `signal-hub`, `simple-peer`

1. Create a server in `src/p2p-stream.js` and run

   ```zsh
   pnpm run p2p-stream
   ```

1. Create client in `src/p2p-client.js` and run

   ```zsh
   pnpm run p2p-client
   ```
