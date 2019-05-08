var $image = $('.image');

$image.hide();

$('#specie').on('change' , () => {

/*
var optionText = $("#specie option:selected").text();


        var image = "<div class ='form-group'><label for ='name'> Image * : </label><input type ='file' id ='photo' name ='photo' class ='form-control form-control-sm'/></div>";

        if (optionText == 'Animal' || optionText == 'animal' || optionText == 'plant' || optionText == 'Plant') {

        					$('#baby').after(image);
        } else {

						$('.name-add .form-group:nth-last-child(2)').remove()

        }

        */
var optionText = $("#specie option:selected").text();

        if (optionText == 'Animal' || optionText == 'animal' || optionText == 'plant' || optionText == 'Plant') {

        									$image.show();
        } else {

													$image.hide();

        }

})