// Function to slide the jumbrotron up past top of screen
// and after that, spawn champ select modal
var jumbotronToModal = function(){
	// $('.space20pct').slideToggle();
	// $('.jumbotron').animate({"margin-left": '10%', "margin-right": '10%'}, 600)
	// $('.jumbotron').slideToggle();
}



$(document).on('ready', function() {


	// User Login
	// Currently spoofed, need to add
	//   backend oauth2
	$('#btn-sign-in').on('click', function(e){
		e.preventDefault();
		console.log("Login button clicked")
	})

	// Switch from Jumbotron view to Modal
	$('#show-modal').on('click', function(){
		$('#champion-list').empty();
		jumbotronToModal();

		var row = '<div class="row"></div>'
		var col = '<div class="col-sm-2"></h3></div>'
		var rowCounter = 6;
		for (var i = 0; i < champion.name.length; i++) {
			rowCounter++;
			var champName = champion.name[i];
			var imageSrc = champion.image[champion.name[i].toLowerCase()];
			if (champName == "Kha'Zix")
				imageSrc = champion.image.khazix
			if (champName == "Jarvan IV")
				imageSrc = champion.image.jarvaniv
			if (champName == "Lee Sin")
				imageSrc = champion.image.leesin
			if (rowCounter > 5) {
				rowCounter = 0;
				$('#champion-list').append(row);
			}

			$('#champion-list').find('.row').last().append($(col).html('<img class="champion-image" src="'+imageSrc+'"><h4>' + champion.name[i] + '</h4>'))	
			
		}
	})

	$('#champion-list').on('mouseenter', '.champion-image', function(){
		$(this).addClass('highlighted')
	})

	$('#champion-list').on('mouseleave', '.champion-image', function(){
		$(this).removeClass('highlighted')
	})

	// $('#champion-list').on('click', '.champion-image', function(){
	// 	var selectButton = '<button id="select-button" class="btn btn-primary btn-sm">Select<br/>Champion</button>'
	// 	console.log($(this).closest('div'));
	// 	$(this).closest('div').animate({top: "-10px"}, 200);
	// 	$(this).closest('div').append(selectButton)
	// 	$(this).removeClass('highlighted')
	// })

	$('#champion-list').on('click', '.champion-image', function(){
		$('.champion-list-modal').modal('hide')
		$('.champion-list-modal').on('hidden.bs.modal', function(){
			$('.champion-details-modal').modal('show')
		})

		// Populate the new modal with champion info
		// This would be so much easier in Angular
		var champName = $(this).closest('div').find('h4').text()
		$('.champion-details-modal').find('.modal-title').text(champName)
		var imageSrc = champion.image[champName.toLowerCase()]
		$('#champion-details').find('#champion-details-main-image').remove();
		$('#champion-details').prepend('<img id="champion-details-main-image" class="center-block img-circle" src="'+imageSrc+'"/>')
	})

	// **INSERT HERE** //
	/* When an individual champion's icon is clicked inside the modal:
		 1) Get that champion's synergies and which comps it works in
		 2) Create (or populate template of) a new modal
		 	a) Champion Icon
		 	b) Champion Name
		 	c) 6/6 col row
		 		i) Top 3 synergies
		 		ii) Which team comps does the champ work in
 		3) Use css card flip to swap displayed modal
	*/

	// Switch back to jumbotron main view
	// $('body').on('click', '.modal-backdrop', function(){
	// 	console.log('backdrop click')
	// 	jumbotronToModal();
	// })

});