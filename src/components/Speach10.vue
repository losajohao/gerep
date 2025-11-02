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
						<strong>TIPIFICACIÓN: </strong>CORTE DE FIBRA OPTICA / COBRE DE
						ULTIMA MILLA - CASO FORTUITO
					</p>
					<p><strong>RESPONSABILIDAD: </strong>TERCEROS</p>
					<p><strong>DETERMINACIÓN DE LA CAUSA:</strong></p>
					<P>
						Se identificó un corte en el cable de fibra óptica que afectó a un
						equipo ubicado en nuestro punto de presencia, desde donde se brinda
						el servicio al cliente. Dicho corte fue ocasionado por
						{{ causaProblemaTexto }}.
					</P>
					<P><strong>MEDIDAS CORRECTIVAS Y/O PREVENTIVAS TOMADAS</strong></P>
					<p>
						A través de los Sistemas de Monitoreo de Claro, de manera proactiva
						se identificó la pérdida de gestión del servicio de datos
						identificado con el CUISMP {{ formData.cuismp }}, y se generó un
						ticket el día {{ fechaInicioFormateada }} a las
						{{ formData.horaInicio }} horas. Inmediatamente, Claro revisó el
						enlace, encontrando un problema entre el local del cliente y el
						punto de presencia de Claro. {{ desplazamientoTexto
						}}<span v-if="formData.distanciaCorte">
							a {{ formData.distanciaCorte }}Km.</span
						>
						y se pudo constatar que el corte de fibra óptica fue ocasionado por
						{{ causaProblemaTexto }}. Posteriormente se realizó la fusión y
						empalme correspondientes. Finalmente, luego del correctivo, se
						superó el inconveniente el día {{ fechaFinFormateada }} a las
						{{ formData.horaFin }} horas, comprobándose el correcto
						funcionamiento y estabilidad del servicio.
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
		name: "Speach10",
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
			causaProblemaTexto() {
				if (!this.formData.causaProblema) return "terceros";

				const causasMap = {
					paso_camion: "paso de camión",
					climaticos: "factores climáticos",
					intento_robo: "intento de robo",
					roedor: "roedor",
					por_terceros: this.formData.otraCausaProblema || "terceros",
				};

				return causasMap[this.formData.causaProblema] || "terceros";
			},

			desplazamientoTexto() {
				if (this.formData.desplazamiento === "si") {
					if (this.formData.tipoDesplazamiento) {
						const tiposMap = {
							punto_presencia: "al punto de presencia de Claro",
							sede_cliente: "a la sede del cliente"
						};

						return `Posteriormente, se gestionó el desplazamiento de personal técnico especializado ${
							tiposMap[this.formData.tipoDesplazamiento] ||
							"al sitio correspondiente"
						} para la revisión de las conexiones; dicho personal encontró un corte de fibra óptica`;
					} else {
						// Si hay desplazamiento pero no se especificó el tipo
						return "Posteriormente, se gestionó el desplazamiento de personal técnico especializado para la revisión de las conexiones; dicho personal encontró un corte de fibra óptica";
					}
				}

				return "Se encontró un corte de fibra óptica";
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

