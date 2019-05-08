console.log(window.location.href);

$('.like').on('click', (event) => {
	
	event.preventDefault();

console.log(window.location.href);
	
		var photo = $(this).data('class');

			$.post(window.location.href + '/vote').done((data) => {
						
						$('.vote-count').text(data.vote);
																									});
});