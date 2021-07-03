$( document ).ready(function() {
    $.ajax({url: "https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576", success: function(data){
        for(let obj of data.result) {
			var prtype=$('.city-weather-prt').clone().removeClass('city-weather-prt none');
			prtype.find('.val-1').text(obj.city);
            prtype.find('.val-2').text(obj.temp_Celsius);
            $('.city-weather-main').append(prtype);
		}	
	}});

    $.ajax({url: "https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c", success: function(data){
        for(let obj of data.result) {
			var prtype=$('.dst-prt').clone().removeClass('dst-prt none');
			prtype.find('.val-1').text(obj.city);
            prtype.find('.val-2').css('background-image','url('+obj.imageUrl+')');
            $('.feature-destination-main').append(prtype);
		}	
	}});

    $(document).on('click','.form button',function(e){
        let frm = $(this).closest('form'),pass=true;
        let dta = frm.serializeArray();
        frm.find('.error').addClass('none');
        frm.find('.success').addClass('none');
        for(let a of dta){
            if(a.value==""){
                frm.find(`.err-${a.name}`).text(`${a.name} is mandatory`).removeClass('none');
                pass=false;
            }
            if(a.name=='contact' && a.value.length>0 && a.value.length!=10){
                frm.find(`.err-${a.name}`).text(`Invalid Contact No`).removeClass('none');
                pass=false;
            }
            if(a.name=='email' && a.value.length>0){
                const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(a.value)){
                    frm.find(`.err-${a.name}`).text(`Invalid Email`).removeClass('none');
                    pass=false;
                }
            }
        }
        if(!pass)
            return false;
        $(frm)[0].reset();
        frm.find('.success').removeClass('none');
        return false;
    });

    function makeTimer() {
        var endTime = new Date("10 July 2021 18:00:00 GMT+05:30");			
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $('.timer-dta').text(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    
        setInterval(function() { makeTimer(); }, 1000);
});



