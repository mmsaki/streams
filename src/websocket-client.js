var wsock = require('websocket-stream');
var through = require('through2');
var html = require('yo-yo');

const stream = wsock('ws://' + location.host);
const root = document.body.appendChild(document.createElement('div'));
const output = [];
update();

stream.pipe(
	through(function (buf, enc, next) {
		output.push(buf.toString());
		update();
		next();
	})
);

function update() {
	html.update(
		root,
		html`<div>
			<form onsubmit="${onSubmit}">
				<input type="text" name="msg" />
			</form>
			<pre>${output.join('')}</pre>
		</div>`
	);
	function onSubmit(event) {
		event.preventDefault();
		stream.write(this.elements.msg.value + '\n');
		this.reset();
	}
}
