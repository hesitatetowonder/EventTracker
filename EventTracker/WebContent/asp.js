$(document).ready(function() {
	getListOfDays();
});

function getListofDays() {
	var myReq = $.ajax({
		type : "GET",
		url : "api/days",
		dataType : "json"
	});
	myReq.done(function(data, status) {
		quizTable(data);
	});
	myReq.fail(function(xhr, status, error) {
		console.log('It blew up again');
	});
}


function clear(name) {
	$('#' + name).remove();
}

function quizTable(data) {
	var table = $('<table id="Quizzes"><thead><tr><th>Quizzes</th></tr></thead>');
	$('#content').append(table);
	data.forEach(function(element, index) {
		var tr = $('<tr>');
		var td = $('<td id=' + element.id + '>');
		var viewButton = $('<input type = "button" id="' + element.id
				+ '" value="view" name="view"/>');
		viewButton.on('click', function(e) {
			console.log(element)
			getQuestions(element.id, element.name);
		});
		td.text(element.name);
		table.append(tr);
		tr.append(td);
		tr.append(viewButton);
	});
}