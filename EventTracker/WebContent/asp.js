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
			byIndex(element);	
});

		
		function byIndex(element){
			var lengthSleep=(element.wakeTime+24)-element.sleepTime;
			var table1 = $('<table id="Day"><thead><tr><th>' + element.dayOfWeek + '</th></thead>');
			var tr1 = $('<tr>');
			var td1 = $('<td>Went to sleep at : '+element.sleepTime+'</td>');
			var td2 = $('<td>Woke up at : '+element.wakeTime+'</td>');
			var td3 = $('<td>Asleep for : '+lengthSleep+'</td>');
			var td4 = $('<td>Quality of sleep : '+element.quality+'</td>');
			var returnButton = $('<input type = "button" id="' + element.id
					+ '" value="Home" name="view"/>');
			returnButton.on('click', function(e) {
				clear('Day');
				getSleep();
			});
			var updateButton=$('<input type="button" id="'+element.id+'" value="edit" name="edit"/>');
			updateButton.on('click', function(e) {
					clear('Day');
					updateSleep(element.id)
		});
			var deleteButton=$('<input type="button" id="'+element.id+'" value="delete" name="delete"/>');
			deleteButton.on('click', function(e) {
				clear('Day');
				deleteSleep(element.id);
			});
			function deleteSleep(id) {
		          var myReq = $.ajax({
		                type: "DELETE",
		                url: "api/sleep/"+id
		            });
		            
		          myReq.done(function(data, status) {
		              clear('Day');
		              getSleep();
		            });
		            
		          myReq.fail(function(xhr, status, error) {
		                console.log('It blew up again');
		                clear('Fred');
		                pokes();
		            });
	}
			
			function updateSleep(id){
			    var form = $('<form id="forms">');
			    var dayOfWeek = $('<label for="Day of Week">Day of Week<select> <option select="select" value="Sunday">Sunday</option>'+
			    		'<option value="Monday">Monday</option><option value="Tuesday">Tuesday</option>'+
			    		'<option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option>'+
			    		'<option value="Friday">Friday</option><option value="Saturday">Saturday</option></select></label>');
			    var sleepTime=$('<label for="Bed">Bed time</label><input type="number" name="sleepTime" id="bed" min="1" max="24"/>');
			    var wakeTime=$('<label for="Wake time">Wake time</label><input type="number" name="wakeTime" id="wake" min="1" max="24"/>');
			    var quality=$('<label for="Qualtiy">Quality</label><input type="number" name="quality" id="quality" min="1" max="10"/>');
			    var submit = $('<input type="submit" placholder="GO"/>');


			    $('#content').append(form);
			    form.append(dayOfWeek);
			    form.append(sleepTime);
			    form.append(wakeTime);
			    form.append(quality);
			    form.append(submit);
			    submit.on('click', function(e) {
			        e.preventDefault();
			        var newDayOfWeek = $('select').val();
			        var newSleepTime = $('#bed').val();
			        var newWakeTime = $('#wake').val();
			        var newQuality = $('#quality').val();
			        var updatedSleep = 
			        {
			        	id:id,
			            dayOfWeek: newDayOfWeek,
			            sleepTime: newSleepTime,
			            wakeTime: newWakeTime,
			            quality: newQuality
			        }
			        var myReq = $.ajax({
			            type: "PUT",
			            url: "api/sleep/"+id,
			            dataType: "json",
			            contentType: "application/json",
			            data: JSON.stringify(updatedSleep)
			        });

			        myReq.done(function(data, status) {
			            clear('form');
			            getSleep();
			        });
			        myReq.fail(function(xhr, status, error) {
			            console.log('It blew up again');
			        });
			    });	
			}

			
			$('#content').append(table1);
			table1.append(tr1);
			tr1.append(td1);
			td1.append(td2);
			td2.append(td3);
			td3.append(td4);
			table1.append(returnButton);
			table1.append(updateButton);
			table1.append(deleteButton);
			}
		
		td.text(element.name);
		table.append(tr);
		tr.append(td);
		tr.append(viewButton);
	});
	var newButton = $('<input type = "button" id = "New" value="New" name="New"/>');
	newButton.on('click', function(e) {
		clear('Sleep');
		createSleep();
	});
	table.append(newButton);
}
function createSleep(){
	    var form = $('<form id="forms">');
	    var dayOfWeek = $('<label for="Day of Week">Day of Week<select> <option select="select" value="Sunday">Sunday</option>'+
	    		'<option value="Monday">Monday</option><option value="Tuesday">Tuesday</option>'+
	    		'<option value="Wednesday">Wednesday</option><option value="Thursday">Thursday</option>'+
	    		'<option value="Friday">Friday</option><option value="Saturday">Saturday</option></select></label>');
	    var sleepTime=$('<label for="Bed">Bed time</label><input type="number" name="sleepTime" id="bed" min="1" max="24"/>');
	    var wakeTime=$('<label for="Wake time">Wake time</label><input type="number" name="wakeTime" id="wake" min="1" max="24"/>');
	    var quality=$('<label for="Qualtiy">Quality</label><input type="number" name="quality" id="quality" min="1" max="10"/>');
	    var submit = $('<input type="submit" placholder="GO"/>');


	    $('#content').append(form);
	    form.append(dayOfWeek);
	    form.append(sleepTime);
	    form.append(wakeTime);
	    form.append(quality);
	    form.append(submit);
	    submit.on('click', function(e) {
	        e.preventDefault();
	        var newDayOfWeek = $('select').val();
	        var newSleepTime = $('#bed').val();
	        var newWakeTime = $('#wake').val();
	        var newQuality = $('#quality').val();
	        var newSleep = 
	        {
	            dayOfWeek: newDayOfWeek,
	            sleepTime: newSleepTime,
	            wakeTime: newWakeTime,
	            quality: newQuality
	        }
	        var myReq = $.ajax({
	            type: "POST",
	            url: "api/sleep",
	            dataType: "json",
	            contentType: "application/json",
	            data: JSON.stringify(newSleep)
	        });

	        myReq.done(function(data, status) {
	            clear('form');
	            getSleep();
	        });
	        myReq.fail(function(xhr, status, error) {
	            console.log('It blew up again');
	        });
	    });
}



