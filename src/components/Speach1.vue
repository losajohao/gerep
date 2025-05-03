<template>
  <div class="pdf-container">
    <h1 class="title">Reporte de Incidencias</h1>

    <p>
      A través de los gestores de monitoreo de Claro, se detectó la interrupción total del servicio de datos del cliente identificado con el CUISMP {{ formData.cuismp1 }} y se generó el ticket, el día {{ formData.fechaInicio1.split(' ')[0] }} a las {{ formData.fechaInicio1.split(' ')[1] }} horas.
      Por motivos ajenos a nuestro control, causado por {{ formData.causa1 }}, afectó a dicho punto de presencia del cual se aprovisiona los servicios del cliente.
      CLARO actuó diligentemente puesto que {{ formData.accion1 }}, sin embargo, más adelante se presentó un problema con {{ formData.contingencia1 }}, lo que a su vez produjo la afectación en los servicios del cliente.
      En vista de ello, CLARO tomó las acciones correctivas inmediatas desplazando {{ formData.personal1 }} para realizar los correctivos del caso, restableciendo {{ formData.servicio1 }} y verificando el restablecimiento del servicio el día {{ formData.fechaFin1.split(' ')[0] }} a las {{ formData.fechaFin1.split(' ')[1] }} horas.
    </p>

    <p><strong>Fecha y hora inicio:</strong> {{ formData.fechaInicio1 }}</p>
    <p><strong>Fecha y hora fin:</strong> {{ formData.fechaFin1 }}</p>

    <v-divider class="my-4"></v-divider>

    <h2>*********CORTE DE FO RECLAMO CLIENTE******************++</h2>

    <p>
      El cliente {{ formData.cliente2 }} reportó la interrupción total de su servicio de datos, identificado con el CUISMP {{ formData.cuismp2 }}, y se generó ticket el día {{ formData.fechaInicio2.split(' ')[0] }} a las {{ formData.horaReporte2 }} horas.
      Inmediatamente, Claro revisó el enlace encontrando un problema entre el local del cliente y punto de presencia de Claro de donde se atiende al cliente.
      Posteriormente, se gestionó el desplazamiento de {{ formData.personal2 }} al punto de presencia de donde se atiende el cliente para la revisión de las conexiones.
      Dicho personal encontró un corte del cable de fibra óptica ubicado a {{ formData.distanciaCorte2 }} desde el punto de presencia de Claro hacia el local del cliente.
      Por consiguiente, el personal técnico se desplazó buscando el punto de corte del cable y procedió con la reparación del mismo.
      El personal técnico pudo constatar que el corte del cable de fibra óptica fue ocasionado por {{ formData.causa2 }}, el cual fue solucionado realizando el empalme del mismo.
      Finalmente, luego del correctivo, se verificó el restablecimiento del servicio el {{ formData.fechaFin2.split(' ')[0] }} a las {{ formData.fechaFin2.split(' ')[1] }}, comprobándose el correcto funcionamiento y estabilidad del servicio.
    </p>

    <p><strong>Fecha y hora inicio:</strong> {{ formData.fechaInicio2 }}</p>
    <p><strong>Fecha y hora fin:</strong> {{ formData.fechaFin2 }}</p>

    <v-divider class="my-4"></v-divider>

    <h2>****SIN SERVICIO MONITOREO - FALLA ENERGÍA CLIENTE****************+</h2>

    <p>
      A través de los Sistemas de Monitoreo de Claro, de manera proactiva se identificó la pérdida de gestión del servicio de datos del cliente identificado con el CUISMP {{ formData.cuismp3 }}, se generó ticket el día {{ formData.fechaInicio3.split(' ')[0] }} a las {{ formData.horaReporte3 }} horas.
      Inmediatamente, Claro revisó el enlace encontrando pérdida de conectividad con los equipos ubicados en la sede del cliente.
      A las {{ formData.horaLlamada3 }} horas, se intentó llamar sin éxito al {{ formData.contacto3 }}.
      Ante ello, se gestionó el desplazamiento de {{ formData.personal3 }} al punto de presencia de Claro para las revisiones correspondientes.
      Dicho personal luego de las revisiones no encontró evento alguno en la red de Claro.
      Finalmente, luego de mantener el enlace en monitoreo se verificó el restablecimiento del servicio por {{ formData.motivoRestablecimiento3 }} el día {{ formData.fechaFin3.split(' ')[0] }} a las {{ formData.fechaFin3.split(' ')[1] }} horas.
    </p>

    <p><strong>Fecha y hora inicio:</strong> {{ formData.fechaInicio3 }}</p>
    <p><strong>Fecha y hora fin:</strong> {{ formData.fechaFin3 }}</p>
  </div>
</template>

<script>
export default {
  name: 'Speach1',
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
