$('#btnSubmit').on('click', function(e) {

  //e.preventDefault();
  var email = $("#email").val();
  var datosIncompletos = false;

  //e.preventDefault();

  if(email == "" )
  {
    datosIncompletos = true;
    Materialize.toast('Debe ingresar un email', 4000);   
  }

  $(".invalid").each(function()
  { 
    datosIncompletos = true;
    Materialize.toast('Debe corregir los errores del formulario', 4000);
  })

  if(datosIncompletos)
  {
    e.preventDefault();
  }
  else
  { 
    console.log(email); 
    $.ajax({   
      url: "https://pagalofacil.com/services/emailReset.php",
        withCredentials: true,
      type: "POST",
      data: {accion: "emailReset", email: email},
      dataType: 'json',
      success: function(data){  
        console.log(data); 
         e.preventDefault();
        if(data.success)
        {
          Materialize.toast("se envio un email a su correo con el link para el reinicio de contraseña", 4000);
          window.location="https://pagalofacil.com/login.html";

        }
        else
        {
          Materialize.toast(data.message, 4000);   
          e.preventDefault();
        }
      }
    });
  }

}); 
 
