$(document).ready(function(){
	get(0, true, false);
	// paging
	$('#page-selection').on('page', function(event, num){
		bLabeled = get_radio()
		get(num - 1, false, bLabeled)}
	)
})

//--------------------------------
// update labeling info
//--------------------------------
function update(){
	num_info = check_marker()

    // check
	// if (num_info.none != 0){
	// 	alert('아직 체크 하지 못한 이미지가 존재합니다.')
	// 	return None
	// }

    label_query = {}

	$('input[type="checkbox"][id^="cb"]').each(function(){
        info = $(this).attr('info')
        if(info == 't'){info = true}
        else if (info == 'f'){info = false}
        else {return}

		id = $(this).attr('name')
		label_query[id] = info
	})

	num_info = check_marker()
	$('.labeling').empty()
	$('.labeling').text(" Bag :    " + num_info.t + "  Non-Bag :    " + num_info.f + "  Not-check :    " + num_info.none)

	$.ajax({
		type: "POST",
		data: JSON.stringify(label_query),
		url: "label/update",
		contentType: "application/json",
		dataType: "json"}).done(function(result){
			bLabeled = get_radio()
			get(0, true, bLabeled);
		})
}

//--------------------------------
// get labeling info
//--------------------------------
function get(page, bFirst, bLabeled){
    $('.row').empty();

    get_query = {
		'page': page,
		'bFirst': bFirst,
		'bLabeled': bLabeled
	};

	// post search_info
	$.post('/label/get', get_query).done(function(result){
		if (result.status == 'fail'){
			alert('정보를 읽을 수 없습니다.')
		}

		var infos = result.info
		num_info = Object.keys(result.info).length

		for (var i = 0; i < num_info; i++){
			info = infos[i]

			var tag = $(document.createElement('div')).attr('class', 'col-sm-4 col-md-3 col-lg-2 col-xl-2')
			tag.wrapInner($(document.createElement('input')).attr('type', 'checkbox').attr('id', 'cb' + i).attr('name', info.id))
			tag2 = tag.append($(document.createElement('label')).attr('for', 'cb' + i)).find('label')
			tag2.wrapInner($(document.createElement('img')).attr('src', info.url_crop).attr('width', '150px').attr('height', '150px'))

			if (bLabeled){
				if(info.labeled==1){
					attr_border = '5px solid green'
					attr_isBag = 't'
				}
				else{
					attr_border = '5px solid red'
					attr_isBag = 'f'
				}
				tag.find('input').attr('info', attr_isBag)
				tag2.find('img').css('border', attr_border)
			}
			else {
				attr_border = ''
				attr_isBag = ''
				tag.find('input').attr('info', attr_isBag)
				tag2.find('img').css('border', attr_border)
			}

            $('.row').append(tag.prop('outerHTML'))
		}

		// make navigation
		if (bFirst == true){
			$('.total').empty()
	        $('.total').text("Total : " + result.total)
			$('#page-selection').empty()
            $('#page-selection').bootpag({page: 1, total: Math.floor(result.total / 24) + 1, maxVisible: 10})
		}

		num_info = check_marker()
		$('.labeling').empty()
		$('.labeling').text(" Bag :    " + num_info.t + "  Non-Bag :    " + num_info.f + "  Not-check :    " + num_info.none)

	})
}

//--------------------------------
// mark the labeling info : green(bag) red(non-bag)
//--------------------------------
function mark(bIsBag){
	// 체크여부 확인
	if (bIsBag==true){
		attr_border = '5px solid green'
		attr_isBag = 't'
	}
	else{
		attr_border = '5px solid red'
		attr_isBag = 'f'
	}

	$('input[type="checkbox"][id^="cb"]:checked').each(function(){
		$(this).attr('info', attr_isBag)
		$('label[for="' + $(this).attr('id') + '"]').find('img').css('border', attr_border)
	})

	// 체크 해제
	$('input[type="checkbox"][id^="cb"]').prop('checked', false)

	num_info = check_marker()
	$('.labeling').empty()
	$('.labeling').text(" Bag :    " + num_info.t + "  Non-Bag :    " + num_info.f + "  Not-check :    " + num_info.none)
}

//--------------------------------
// clear the labeling info
//--------------------------------
function clear_mark(){
	attr_border = ''
	attr_isBag = ''


	$('input[type="checkbox"][id^="cb"]').each(function(){
		$(this).attr('info', attr_isBag)
		$('label[for="' + $(this).attr('id') + '"]').find('img').css('border', attr_border)
	})

	num_info = check_marker()
	$('.labeling').empty()
	$('.labeling').text(" Bag :    " + num_info.t + "  Non-Bag :    " + num_info.f + "  Not-check :    " + num_info.none)
}

//--------------------------------
// count mark info
//--------------------------------
function check_marker(){
	num_info = {'none': 0, 't': 0, 'f': 0}

	$('input[type="checkbox"][id^="cb"]').each(function(){
		info = $(this).attr('info')

		if(info == 't'){
			num_info['t'] += 1
		}
		else if(info == 'f'){
			num_info['f'] += 1
		}
		else{
			num_info['none'] += 1
		}
	})

	return num_info
}

//--------------------------------
// get radio value
//--------------------------------
function get_radio(){
	val_radio = $('input[type="radio"]:checked').val()

	if (val_radio == 'true'){
		bLabeled = true
	}
	else{
		bLabeled = false
	}

	return bLabeled

}
