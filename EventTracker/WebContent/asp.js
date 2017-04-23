$(document).ready(function() {
	getSleep();
});

function getSleep() {
	var myReq = $.ajax({
		type : "GET",
		url : "api/sleep",
		dataType : "json"
	});
	myReq.done(function(data, status) {
		sleepTable(data);
	});
	myReq.fail(function(xhr, status, error) {
		console.log('It blew up again');
	});
}


function clear(name) {
	$('#' + name).remove();
}

function sleepTable(data) {
	var table = $('<table id="Sleep"><thead><tr><th>Sleep Tracker</th></tr></thead>');
	$('#content').append(table);
	data.forEach(function(element, index) {
		var tr = $('<tr>');
		var td = $('<td id=' + element.id + '>' + element.dayOfWeek + '</td>');
		var viewButton = $('<input type = "button" id="' + element.id
				+ '" value="view" name="view"/>');
		viewButton.on('click', function(e) {
			clear('Sleep');
		var table1 = $('<table id="Day"><thead><tr><th>' + element.dayOfWeek + '</th></thead>');
		var tr1 = $('<tr>');
		var td1 = $('<td>Sleep Time : '+element.sleepTime+' Wake Time : '+element.wakeTime+' Time asleep : '
				+(element.sleepTime-element.wakeTime)+' Quality : '+element.quality);
				
		$('#content').append(table1);
				table1.append(tr1);
				tr1.append(td1);

		});
	
		td.text(element.name);
		table.append(tr);
		tr.append(td);
		tr.append(viewButton);
	});
}