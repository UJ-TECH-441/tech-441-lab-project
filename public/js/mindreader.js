// The ready() event is fired when the DOM is fully loaded
$(document).ready(function() {
	$('#submit').on('click', () => read());
	read();
});

const read = () => {
	fetch(`/readmymind`)
	.then(resp => resp.json())
	.then(result => {
		// Result will be a JSON object
		const items = result.messages.map(message =>
			`<li>${message.prediction} <span class="bold">${message.value}<span</li>`
		);
		$('#results').html(`<ul>${items.join('\n')}</ul>`);
	})
	.catch(err => {
		console.error(err);
		$('#error').html('Error');
		$('#error').show();
	});

};
