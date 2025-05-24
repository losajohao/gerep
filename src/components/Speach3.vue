<template>
    <div class="pdf-container">
      <h2>PROACTIVO - CORTE  DE FRIBRA</h2>
  
      <p>
        A través de los Sistemas de Monitoreo de Claro, de manera proactiva se identificó la pérdida de gestión del servicio de datos del cliente identificado con el CUISMP 1122334455, se generó ticket el día 2025-05-03 a las 16:00 horas.
        Inmediatamente, Claro revisó el enlace encontrando pérdida de conectividad con los equipos ubicados en la sede del cliente.
        A las 16:30 horas, se intentó llamar sin éxito al 123456789.
        Ante ello, se gestionó el desplazamiento de personal técnico al punto de presencia de Claro para las revisiones correspondientes.
        Dicho personal luego de las revisiones no encontró evento alguno en la red de Claro.
        Finalmente, luego de mantener el enlace en monitoreo se verificó el restablecimiento del servicio por intervención manual el día 2025-05-03 a las 18:00 horas.
      </p>
  
      <p><strong>Fecha y hora inicio:</strong> 2025-05-03 16:00</p>
      <p><strong>Fecha y hora fin:</strong> 2025-05-03 18:00</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Speach3',
    props: {
      formData: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .pdf-container {
    width: 210mm; /* ancho A4 */
    background: white;
    padding: 20mm;
    margin: 0 auto;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    font-family: 'Roboto', sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  
  h2 {
    margin-top: 20px;
    font-size: 18px;
    color: #444;
  }
  </style>
  