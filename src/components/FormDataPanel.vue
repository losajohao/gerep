<template>
	<v-card>
		<v-card-title>Datos de formulario</v-card-title>
		<v-card-text>
			<v-simple-table>
				<tbody>
					<tr v-if="showPronombre">
						<td>Pronombre</td>
						<td>
							<v-chip>{{ formData.pronombre }}</v-chip>
						</td>
					</tr>
					<tr v-if="showNombre">
						<td>Nombre</td>
						<td>
							<v-chip>{{ nombreFormateado }}</v-chip>
						</td>
					</tr>
					<tr>
						<td>CUISMP</td>
						<td>
							<v-chip>{{ formData.cuismp }}</v-chip>
						</td>
					</tr>
					<tr>
						<td>Fecha Inicio</td>
						<td>
							<v-chip>{{ fechaInicioFormateada }}</v-chip>
						</td>
					</tr>
					<tr>
						<td>Hora Inicio</td>
						<td>
							<v-chip>{{ formData.horaInicio }}</v-chip>
						</td>
					</tr>
					<tr>
						<td>Fecha Fin</td>
						<td>
							<v-chip>{{ fechaFinFormateada }}</v-chip>
						</td>
					</tr>
					<tr>
						<td>Hora Fin</td>
						<td>
							<v-chip>{{ formData.horaFin }}</v-chip>
						</td>
					</tr>
					<tr>
						<td>Desplazamiento</td>
						<td>
							<v-chip>{{ formData.desplazamiento }}</v-chip>
						</td>
					</tr>
					<tr v-if="formData.tipoDesplazamiento">
						<td>Tipo de Desplazamiento</td>
						<td>
							<v-chip>{{ tipoDesplazamientoTexto }}</v-chip>
						</td>
					</tr>
					<tr v-if="formData.comunicacionCliente">
						<td>Comunicación Cliente</td>
						<td>
							<v-chip>{{ formData.comunicacionCliente }}</v-chip>
						</td>
					</tr>
					<tr v-if="formData.problemaEncontrado">
						<td>Problema Encontrado</td>
						<td>
							<v-chip>{{ problemaEncontradoTexto }}</v-chip>
						</td>
					</tr>
					<tr v-if="formData.correctivo">
						<td>Correctivo Aplicado</td>
						<td>
							<v-chip>{{ formData.correctivo }}</v-chip>
						</td>
					</tr>
					<tr v-if="formData.causaProblema">
						<td>Causa del Problema</td>
						<td>
							<v-chip>{{ causaProblemaTexto }}</v-chip>
						</td>
					</tr>
					<tr v-if="formData.distanciaCorte">
						<td>Distancia del Corte</td>
						<td>
							<v-chip>{{ formData.distanciaCorte }} Km</v-chip>
						</td>
					</tr>
				</tbody>
			</v-simple-table>
		</v-card-text>
	</v-card>
</template>

<script>
import { formatDateLocal } from '@/utils/dateUtils';

export default {
	name: "FormDataPanel",
	props: {
		formData: {
			type: Object,
			required: true,
		},
		// Prop para controlar si mostrar campos específicos de reclamos
		showPersonalFields: {
			type: Boolean,
			default: true,
		}
	},
	computed: {
		// Mostrar pronombre solo si showPersonalFields es true y existe el dato
		showPronombre() {
			return this.showPersonalFields && this.formData.pronombre;
		},
		
		// Mostrar nombre solo si showPersonalFields es true y existe el dato
		showNombre() {
			return this.showPersonalFields && this.formData.nombre;
		},
		
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
		
		problemaEncontradoTexto() {
			if (this.formData.problemaEncontrado === 'otro' && this.formData.otroProblemaEncontrado) {
				return this.formData.otroProblemaEncontrado;
			}
			return this.formData.problemaEncontrado || "el estabilizador desconectado/toma de energía averiada/fuente de poder apagada";
		},
		
		tipoDesplazamientoTexto() {
			const tiposMap = {
				'punto_presencia': 'Al punto de presencia de Claro',
				'sede_cliente': 'A la sede del cliente'
			};
			
			return tiposMap[this.formData.tipoDesplazamiento] || this.formData.tipoDesplazamiento;
		},
		
		causaProblemaTexto() {
			if (!this.formData.causaProblema) return "";
			
			const causasMap = {
				'paso_camion': 'Paso de camión',
				'climaticos': 'Climáticos',
				'intento_robo': 'Intento de robo',
				'roedor': 'Roedor',
				'por_terceros': this.formData.otraCausaProblema || 'Por terceros'
			};
			
			return causasMap[this.formData.causaProblema] || this.formData.causaProblema;
		}
	},
};
</script>

<style scoped>
/* Estilos específicos del panel si son necesarios */
</style>
