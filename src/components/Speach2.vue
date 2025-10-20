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
					<p><strong>RESPONSABILIDAD: </strong>SISTEMA</p>
					<p>
						<strong>TIPIFICACION: </strong>FALLA DE ENERGIA (CLIENTE) - FALLA EN
						SISTEMA ELECTRICO DE CLIENTE
					</p>
					<p><strong>DETERMINACIÓN DE CAUSA:</strong></p>
					<p>
						A través de los Sistemas de Monitoreo de Claro, de manera proactiva
						se identificó la pérdida de gestión del servicio de datos del
						cliente identificado con el CUISMP
						{{ formData.cuismp }}, se generó ticket el día
						{{ fechaInicioFormateada }} a las {{ formData.horaInicio }} horas.
					</p>
					<p><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></p>
					<p>
						Inmediatamente, Claro revisó el enlace encontrando pérdida de
						conectividad con los equipos ubicados en la sede del cliente.
						{{ comunicacionTexto }} {{ desplazamientoTexto }} Dicho personal
						luego de las revisiones encontró un evento en el sistema eléctrico
						del cliente que afectó el funcionamiento de los equipos de
						comunicaciones. Finalmente, luego de mantener el enlace en monitoreo
						se verificó el restablecimiento del servicio el
						{{ fechaFinFormateada }} a las {{ formData.horaFin }} horas.
					</p>

					<p>
						<strong>Fecha y hora inicio:</strong> {{ fechaInicioFormateada }}
						{{ formData.horaInicio }}
					</p>
					<p>
						<strong>Fecha y hora fin:</strong> {{ fechaFinFormateada }}
						{{ formData.horaFin }}
					</p>

					<v-divider class="my-4"></v-divider>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import FormDataPanel from "./FormDataPanel.vue";
import { formatDateLocal } from '@/utils/dateUtils';

	export default {
		name: "Speach2",
		components: {
			FormDataPanel,
		},
		props: {
			formData: {
				type: Object,
				required: true,
			},
		},
		computed: {
		fechaInicioFormateada() {
			return formatDateLocal(this.formData.fechaInicio);
		},
		fechaFinFormateada() {
			return formatDateLocal(this.formData.fechaFin);
		},

			comunicacionTexto() {
				if (this.formData.comunicacionCliente === "si") {
					return "Se intentó establecer comunicación con el cliente para verificar el estado de los equipos.";
				} else if (this.formData.comunicacionCliente === "no") {
					return "No fue posible establecer comunicación directa con el cliente.";
				}
				return "";
			},

			desplazamientoTexto() {
				if (this.formData.desplazamiento === "si") {
					if (this.formData.tipoDesplazamiento === "punto_presencia") {
						return "Ante ello, se gestionó el desplazamiento de personal técnico especializado al punto de presencia de Claro para las revisiones correspondientes.";
					} else if (this.formData.tipoDesplazamiento === "sede_cliente") {
						return "Ante ello, se gestionó el desplazamiento de personal técnico especializado a la sede del cliente para las revisiones correspondientes.";
					} else {
						return "Ante ello, se gestionó el desplazamiento de personal técnico especializado al punto de presencia de Claro para las revisiones correspondientes.";
					}
				} else if (this.formData.desplazamiento === "no") {
					return "Se realizaron las verificaciones correspondientes de manera remota.";
				}
				return "";
			},
		},
	};
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
