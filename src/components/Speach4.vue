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
					<p><strong>TIPO DE INC: </strong>RECLAMO</p>
					<p>
						<strong>TIPIFICACIÓN: </strong>PROBLEMA DE ENERGIA COMERCIAL EN SITE/POP TIPO A
					</p>
					<p><strong>RESPONSABILIDAD: </strong>TERCEROS</p>
					<p><strong>DETERMINACIÓN DE LA CAUSA:</strong></p>
					<p>
						El inconveniente se originó por una externalidad ajena al control de Claro, 
						ocasionada por un corte de energía eléctrica no programado que afectó al punto 
						de presencia desde el cual se aprovisionan los servicios del cliente.
					</p>
					<p><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></p>
					<p>
						El cliente, {{ formData.pronombre }} {{ nombreFormateado }}, reportó problemas 
						con su servicio de datos identificado con el CUISMP {{ formData.cuismp }}, 
						generándose un ticket el día {{ fechaInicioFormateada }} a las 
						{{ formData.horaInicio }} horas. Inmediatamente, Claro procedió con la revisión 
						del enlace, encontrando un inconveniente originado por motivos ajenos a nuestro 
						control, debido a una interrupción en el suministro eléctrico (corte de energía 
						comercial no programado) en la zona donde se ubica nuestro punto de presencia, 
						el cual aprovisiona los servicios del cliente. Claro actuó diligentemente, ya 
						que el respaldo eléctrico funcionó de manera adecuada; sin embargo, se presentó 
						una falla en el sistema de contingencia eléctrica, lo que generó la afectación 
						en los servicios del cliente. Ante ello, se tomaron acciones correctivas inmediatas, 
						desplazando personal técnico especializado para atender la incidencia, logrando 
						restablecer el fluido eléctrico en el punto de presencia. Finalmente, se verificó 
						la operatividad y estabilidad del servicio el día {{ fechaFinFormateada }} a las 
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
	name: 'Speach4',
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
