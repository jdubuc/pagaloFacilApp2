$(document).ready(function() {

	$('select').material_select();

	iniciarSistema();

	$.ajax({   
      	url: "https://pagalofacil.com/services/ServicioUsuario.php",
      	type: "POST",
      	data: {accion: "cargarComboAnoTarjeta" },
      	dataType: 'json',
      	success: function(data){
        //console.log(data);	
        	var $anoTarjeta = $("#expirationDateYear").empty().html(' ');

      		if(data.success)
      		{
          		$anoTarjeta.append($("<option></option>").attr("value","").text("Año").attr("disabled", true).attr("selected", true));
           
          		$.each( data.result_ano, function( key, value ) {
          			if(key == 0)
          			{
          				$anoTarjeta.append($("<option></option>").attr("value",value).text(value).attr("selected", true));
          			}
          			else
          			{
          				$anoTarjeta.append($("<option></option>").attr("value",value).text(value));
          			}
            		
          		});

          		$anoTarjeta.trigger('contentChanged');
  			}
  			else{
  				alert(data.message);
  			}
     	}
  	});

  	$('select').on('contentChanged', function() {
	    // re-initialize (update)
	    $(this).material_select();
	}); 


	$('#boton-atras-user').click(function() {
		console.log("click");
		window.location.href="index.html";
	});

	
//-----------------------------------boton-seguir-tdc-------------------------------------------------------------------
	$('#boton-seguir-tdc').click(function() {
	
		if($('#monto').val()==""|| $('#detalle').val()=="" ){
			Materialize.toast("Aviso: Complete los campos", 2000);		}
		else { 
			$("#panel-tdc").show();$("#panel-detalle").hide();
		}
		
	});
	
	$('#boton-atras-detalle2').click(function() {
		
		$("#panel-detalle").show();$("#panel-tdc").hide();
		
	});

//-----------------------------------boton-borrar-tdc-------------------------------------------------------------------

	$('#boton-borrar-detalle').click(function() {
		$('#monto').val('');
		$('#detalle').val('');
	});

	$('#boton-borrar-tdc').click(function() {
		$('#nombre').val('');
		$('#cedula').val('');
		$('#tdc').val('');
		$('#cvv').val('');
		$('#email').val('');
	});

//------------------------------------------boton de pago-------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------
	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

	function amountFormat(amount){
		amount = amount.replaceAll(' ','').replace(',','.');
		return amount.substr(0,amount.length-2);
	}

	$('#boton-pagar').click(function() {
		if($('#monto').val()!="" && $('#detalle').val()!="" && $('#nombre').val()!="" && $('#cedula').val()!=""
			&& $('#tdc').val()!="" && $('#cvv').val()!="" && $('#expirationDateMonth option:selected').val()!=""
			&& $('#expirationDateYear option:selected').val()!=""){

			$('.button-footer').find('.row.preloader').removeClass('hide');
			$('.action_buttons').addClass('hide');

			$.ajax({
				url:'https://pagalofacil.com/services/instapago.php',
				method:'POST',
				data:{
					user:$("#sample_search").val(),
					payment:
					{

						amount:$('#monto').val(),//monto
						description:$('#detalle').val(),//detalle
						cardHolder:$('#nombre').val(),//nombre
						cardHolderID:$('#cedula').val(),//cedula
						cardNumber:$('#tdc').val(),//numero TDC
						cvc:$('#cvv').val(), //codigo cvv
						expirationDateMonth:$('#expirationDateMonth option:selected').val(), //mes expiracion
						expirationDateYear:$('#expirationDateYear option:selected').val()    //a�0�9o expiracion
					},
					email:$("#email").val()
				}
			}).done(function (data) {
				
				data = JSON.parse(data);
				
				if(data['success']===true){
					
					$('#voucher').html(data['voucher']);
					$('#voucher').html($('#voucher').text());

					$('#modal1').openModal();
					
				}
				else
				{
					Materialize.toast(data['message'], 2000);
					$('.button-footer').find('.row.preloader').addClass('hide');
					$('.action_buttons').removeClass('hide');
				}

			}).fail(function () {
				$('.button-footer').find('.row.preloader').addClass('hide');
				$('.action_buttons').removeClass('hide');
			});
		}
		else{
			Materialize.toast("Error, Complete los campos", 2000);
		}

	});
	//---------------------------------------------FIN BOTON DE PAGO-----------------------------
	

	$('.link-logout').on('click', function(e) {
		
		console.log("cerrar sesion ");
		sessionStorage.clear();
		$.ajax({
			url: "https://pagalofacil.com/services/ServicioUsuario.php",
			type: "POST",
			data: {accion: "cerrarSesion"},
			dataType: 'json',
			success: function(data){
				
				if(data.success)
				{
					if(data.flag){
						window.location="https://pagalofacil.com/index.html";
						sessionStorage.clear();
						Materialize.toast("Sesion cerrada", 4000);
					}

				}
				else
				{
					Materialize.toast("No se pudo cerrar sesion, error", 4000);
				}
			}
		});
	});

});


function iniciarSistema(){
	
	iniciarventana();
	var valid=sessionStorage.getItem("d_s");
	
	if(valid){
		console.log("sesion iniciada");		
		$('#sample_search').val(sessionStorage.getItem("user"));

		//link-login
		$("#banner-oper").show();
		$("#banner-registro").hide();
		$(".link-registro").hide();
		$(".link-login").hide();
		$(".link-perfil").show();
		$(".link-logout").show();
		$('#tipo').css('display', '');
	}
	else{
		console.log("NO login");
		$("#banner-oper").hide();
		$("#banner-registro").show();
		$(".link-registro").show();
		$(".link-login").show();
		$(".link-perfil").hide();
		$(".link-logout").hide();
		$('#tipo').css('display', 'none');
	}

}

function iniciarventana(){
	$("#panel-detalle").show();
	$("#panel-tdc").hide();
}