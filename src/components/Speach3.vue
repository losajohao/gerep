<template>
	<div>
		<v-row>
			<v-col cols="4">
				<FormDataPanel 
					:formData="formData" 
					:showPersonalFields="false"
				/>
			</v-col>
			<v-col cols="8">
				<div class="pdf-container">
					<p><strong>RESPONSABILIDAD: </strong>PROVEEDOR</p>
					<p>
						<strong>TIPIFICACION: </strong>CORTE DE FIBRA OPTICA TRONCAL DE RED - CASO FORTUITO
					</p>
					<p><strong>DETERMINACIÓN DE CAUSA:</strong></p>
					<p>
						A través de los Sistemas de Monitoreo de Claro, de manera proactiva se identificó 
						la pérdida de gestión del servicio de datos del cliente identificado con el CUISMP 
						{{ formData.cuismp }}, se generó ticket el día {{ fechaInicioFormateada }} 
						a las {{ formData.horaInicio }} horas.
					</p>
					<p><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></p>
					<p>
						Inmediatamente, Claro revisó el enlace encontrando pérdida de conectividad debido 
						a un corte en la fibra óptica troncal de la red. 
						<span v-if="formData.comunicacionCliente === 'si'">
							Se estableció comunicación con el cliente para informar sobre la incidencia y 
							los tiempos estimados de reparación.
						</span>
						<span v-if="formData.comunicacionCliente === 'no'">
							Se intentó contactar al cliente para informar sobre la incidencia sin éxito.
						</span>
						<span v-if="formData.desplazamiento === 'si'">
							Se gestionó el desplazamiento inmediato de personal técnico especializado y 
							cuadrillas de reparación al punto afectado de la red troncal.
						</span>
						<span v-if="formData.desplazamiento === 'no'">
							Se coordinó la reparación remota y el monitoreo constante del enlace.
						</span>
						El personal técnico identificó el punto exacto del corte y procedió con las 
						reparaciones necesarias, incluyendo el empalme de fibra óptica y verificación 
						de niveles de potencia. Finalmente, se verificó el restablecimiento completo 
						del servicio el {{ fechaFinFormateada }} a las {{ formData.horaFin }} horas, 
						confirmando la estabilidad del enlace.
					</p>

					<p>
						<strong>Fecha y hora inicio:</strong> {{ fechaInicioFormateada }} {{ formData.horaInicio }}
					</p>
					<p>
						<strong>Fecha y hora fin:</strong> {{ fechaFinFormateada }} {{ formData.horaFin }}
					</p>

					<v-divider class="my-4"></v-divider>
				</div>
			</v-col>
		</v-row>
	</div>
</template>
  
<script>
import FormDataPanel from './FormDataPanel.vue';

export default {
	name: 'Speach3',
	components: {
		FormDataPanel
	},
	props: {
		formData: {
			type: Object,
			required: true
		}
	},
	computed: {
		fechaInicioFormateada() {
			if (!this.formData.fechaInicio) return "";
			const fecha = new Date(this.formData.fechaInicio);
			const dia = fecha.getDate().toString().padStart(2, "0");
			const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
			const año = fecha.getFullYear().toString();
			return `${dia}/${mes}/${año}`;
		},
		fechaFinFormateada() {
			if (!this.formData.fechaFin) return "";
			const fecha = new Date(this.formData.fechaFin);
			const dia = fecha.getDate().toString().padStart(2, "0");
			const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
			const año = fecha.getFullYear().toString();
			return `${dia}/${mes}/${año}`;
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
  