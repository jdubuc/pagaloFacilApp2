function isNumber(event){
  var charCode = (event.which) ? event.which : event.keyCode;
  
  console.log(charCode);
  
  if(charCode==8||charCode==9||charCode==37||charCode==39||charCode==46){
  	return true;
  }
  
  if (charCode > 31 && (charCode < 48 || charCode > 57))
  	return false;
  	
  return true;
} 

$(document).ready(function() {

	/*$.ajax({
		url: "https://www.pagalofacil.com/services/ServicioCobro.php",
		type: "POST",
		data: {accion: "checkStatus",usuario:sessionStorage.getItem("user") },
		dataType: 'json',
		success: function(data){
			//console.log(data);
			
			if(!data.success)
			{
				Materialize.toast(data.message, 4000);
				window.location.href="index.html";
			}
			
		}
	});*/

	//------------------------------validaciones-formulario-de-pago-------------------------------------------------


	/*$('#sample_search').keypress(function(e){
		var n = e.keyCode;

		if(!isNumber(e)||$(this).val().length>8){
			return false;
		}
	});*/
	$('#cvv').keypress(function(e){
		var n = e.keyCode;

		if(!isNumber(e)||$(this).val().length>2){
			return false;
		}
	});

	$('#cedula,#tdc,#monto').keypress(function(e){
		var n = e.keyCode;

		if(!isNumber(e)){
			return false;
		}
	});

	$('#nombre').unbind('keypress').keypress(function(e){
		var charCode = e.keyCode || e.which;
		
		  if(charCode==8||charCode==9||charCode==37||charCode==39||charCode==46){
		  	return true;
		  }
		
		var c = String.fromCharCode(charCode);

		if(!/^[\sñÑA-Za-z _]*[\sñÑA-Za-z][\sñÑA-Za-z _]*$/.test(c)){
			return false;
		}
	});
//------------------------------fin-validaciones-formulario-de-pago-------------------------------------------------

	

});

