let currentStar = 0;

// The ready() event is fired when the DOM is fully loaded
$(document).ready(function() {
	$('#submit').on('click', () => read());
	$('.star').on('mouseover', event => starHover(parseInt(event.target.id)));
	$('.star').on('mouseout', event => starClear());
	$('.star').on('click', event => starClick(parseInt(event.target.id)));
	read();
});

const read = () => {
	// Send XHR request to Express path
	$.ajax({
		url: '/readmymind'
	})
	.done(result => {
		// Result will be a JSON object
		const items = result.messages.map(message =>
			`<li>${message.prediction} <span class="bold">${message.value}<span</li>`
		);
		$('#results').html(`<ul>${items.join('\n')}</ul>`);
	})
	.fail(err => {
		$('#error').html('Error');
		$('#error').show();
	});
}

/** Rating handlers */

// Handler for star mouseover event
const starHover = number => {
	for (let i = 1; i <= 5; i++) {
		$('#' + i).attr('src', `img/star-${number >= i ? 'on' : 'off'}.png`);
	}
};

// Handler for star mouseout event
const starClear = number => {
	if (!currentStar) {
		$('.star').attr('src', `img/star-off.png`);
	} else {
		starHover(currentStar);
	}
};

// Handler for star click event
const starClick = number => {
	currentStar = number;
	$('#rating-message').hide();

	// Send rating to server
	$.ajax({
		url: `/rating?stars=${currentStar}`
	})
	.done(result => {
		console.log(result);
		// Result will be a JSON object
		$('#votes').text(result.messages.votes);
		$('#ratingAvg').text(result.messages.ratingAvg.toFixed(2));
		$('#rating-message').show();
	})
	.fail(err => {
		$('#error').html('Error');
		$('#error').show();
	});
};
