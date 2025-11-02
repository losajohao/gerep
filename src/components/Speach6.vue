<template>
	<div>
		<v-row>
			<v-col cols="4">
				<FormDataPanel 
					:formData="formData" 
					:showPersonalFields="true"
				/>
			</v-col>
			<v-col cols="8">
				<div class="pdf-container">
					<p><strong>TIPO DE INC: </strong>RECLAMO – DESLOGUEO</p>
					<p>
						<strong>TIPIFICACIÓN: </strong>ANEXO DESCONFIGURADO / DESLOGUEO
					</p>
					<p><strong>RESPONSABILIDAD: </strong>CLARO</p>
					<p><strong>DETERMINACIÓN DE LA CAUSA:</strong></p>
					<p>
						El inconveniente se originó por un problema en la configuración de los anexos 
						ubicados en la sede del cliente.
					</p>
					<p><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></p>
					<p>
						El cliente, {{ formData.pronombre }} {{ nombreFormateado }}, reportó inconvenientes 
						con los anexos de la sede identificada con el CUISMP {{ formData.cuismp }}. Se 
						generó un ticket el día {{ fechaInicioFormateada }} a las {{ formData.horaInicio }} 
						horas. Inmediatamente, Claro se comunicó con el cliente para coordinar una ventana 
						de trabajo y, según la disponibilidad del cliente, se programó la revisión para el 
						día {{ fechaInicioFormateada }} a las {{ formData.horaInicio }} horas. Luego de las 
						revisiones correspondientes por parte del personal técnico especializado, se encontró 
						el anexo deslogueado, por lo cual se procedió con la reconfiguración. Seguidamente, 
						en base a la disponibilidad del cliente, se realizó la validación de los anexos. 
						Finalmente, luego de los correctivos, se verificó el correcto funcionamiento y 
						estabilidad del servicio el día {{ fechaFinFormateada }} a las {{ formData.horaFin }} 
						horas.
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
import { formatDateLocal } from '@/utils/dateUtils';

export default {
	name: 'Speach6',
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
		return formatDateLocal(this.formData.fechaInicio);
	},
	fechaFinFormateada() {
		return formatDateLocal(this.formData.fechaFin);
	},
	nombreFormateado() {
			if (!this.formData.nombre) return "";
			return this.formData.nombre
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
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
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	font-family: "Roboto", sans-serif;
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
