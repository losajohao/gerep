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
					<p><strong>TIPO DE INC: </strong>PROACTIVO</p>
					<p>
						<strong>TIPIFICACIÓN: </strong>FALLA DE ENERGIA (CLIENTE) - FALLA EN SISTEMA ELECTRICO DE CLIENTE
					</p>
					<p><strong>RESPONSABILIDAD: </strong>CLIENTE</p>
					<p><strong>DETERMINACIÓN DE LA CAUSA:</strong></p>
					<p>
						El inconveniente se originó por un problema de energía en la sede del cliente, 
						afectando los equipos de comunicaciones.
					</p>
					<p><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></p>
					<p>
						A través de los Sistemas de Monitoreo de Claro, de manera proactiva se identificó 
						la pérdida de gestión del servicio de datos identificado con el CUISMP 
						{{ formData.cuismp }}, y se generó un ticket el día {{ fechaInicioFormateada }} 
						a las {{ formData.horaInicio }} horas. Inmediatamente, Claro revisó el enlace, 
						encontrando un problema con el equipo ubicado en la sede del cliente. Posteriormente, 
						en comunicación con el cliente y de acuerdo a su disponibilidad se gestionó el 
						desplazamiento de personal técnico especializado a la sede del cliente. Luego de las 
						revisiones correspondientes, se encontró {{ problemaEncontradoTexto }}, por lo cual 
						se procedió con los correctivos correspondiente. Finalmente, se verificó el correcto 
						funcionamiento y estabilidad del servicio el día {{ fechaFinFormateada }} a las 
						{{ formData.horaFin }} horas.
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
	name: 'Speach7',
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
		problemaEncontradoTexto() {
			if (this.formData.problemaEncontrado === 'otro' && this.formData.otroProblemaEncontrado) {
				return this.formData.otroProblemaEncontrado;
			}
			return this.formData.problemaEncontrado || "el estabilizador desconectado/toma de energía averiada/fuente de poder apagada";
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
