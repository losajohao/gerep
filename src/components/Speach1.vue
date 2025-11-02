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
					<p><strong>RESPONSABILIDAD: </strong>CLIENTE</p>
					<p>
						<strong>TIPIFICACION: </strong>FALLA DE ENERGIA (CLIENTE) - SERVICIO
						RESTABLECIDO POR POWER ON
					</p>
					<p><strong>DETERMINACIÓN DE CAUSA:</strong></p>
					<P>
						El inconveniente se originó por un evento de energía en la sede del
						cliente, afectando los equipos de comunicaciones.
					</P>
					<P><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></P>
					<p>
						El cliente, {{ formData.pronombre }} {{ nombreFormateado }}, reportó
						inconvenientes con el servicio de datos identificado con el CUISMP
						{{ formData.cuismp }}, se genero el ticket el día
						{{ fechaInicioFormateada }} a las
						{{ formData.horaInicio }}
						horas. Inmediatamente, Claro revisó el enlace encontrando pérdida de
						conectividad con los equipos ubicados en la sede del cliente. Ante
						ello, {{ desplazamientoTexto }} {{ comunicacionTexto }}.
						Posteriormente, se verificó el restablecimiento del servicio por
						encendido de equipos sin la intervención del personal de Claro.
						Finalmente, se comprobó el correcto funcionamiento y estabilidad del
						servicio el {{ fechaFinFormateada }} a las
						{{ formData.horaFin }} horas.
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
		name: "Speach1",
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
			nombreFormateado() {
				if (!this.formData.nombre) return "";
				return this.formData.nombre
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
			},

			desplazamientoTexto() {
				if (this.formData.desplazamiento === "si") {
					if (this.formData.tipoDesplazamiento === "sede_cliente") {
						return "se gestionó el desplazamiento de personal técnico especializado a la sede del cliente.";
					} else if (this.formData.tipoDesplazamiento === "punto_presencia") {
						return "se gestionó el desplazamiento de personal técnico especializado al punto de presencia de Claro.";
					} else {
						return "se gestionó el desplazamiento de personal técnico especializado hacia la sede del cliente.";
					}
				}
				return "";
			},

			comunicacionTexto() {
				if (this.formData.comunicacionCliente === "no") {
					return "En comunicación con el cliente se validó un evento de energía en la sede del cliente";
				} else if (this.formData.comunicacionCliente === "si") {
					return "Tratamos de comunicarnos con el cliente, para que nos informe si se encontraba realizando algún trabajo o si presentó algún evento de energía en su sede";
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
