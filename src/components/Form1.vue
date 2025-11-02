<template>
	<v-card
		class="mb-12"
		color="white lighten-1"
	>
		<v-container>
			<v-row>
				<!-- Columna principal izquierda (8 columnas) - Campos básicos -->
				<v-col cols="8">
					<v-card>
						<v-card-title>Datos Básicos</v-card-title>
						<v-card-text>
							<v-row>
								<v-col cols="3">
									<v-select
										:items="['El Sr.', 'La Sra.', 'La Srta.']"
										label="Pronombres"
										outlined
										v-model="pronombreLocal"
										:disabled="ticket == '2'"
									/>
								</v-col>
								<v-col cols="6">
									<v-text-field
										label="Nombre"
										outlined
										:value="nombre"
										@input="$emit('update:nombre', $event)"
										:disabled="ticket == '2'"
									></v-text-field>
								</v-col>
								<v-col cols="3">
									<v-text-field
										label="CUISMP"
										outlined
										:value="cuismp"
										@input="$emit('update:cuismp', $event)"
										maxlength="5"
									></v-text-field>
								</v-col>
								<v-col cols="3">
									<v-text-field
										label="Fecha Inicio"
										type="date"
										outlined
										:value="fechaInicio"
										@input="$emit('update:fechaInicio', $event)"
									></v-text-field>
								</v-col>
								<v-col cols="3">
									<v-text-field
										label="Hora Inicio"
										type="time"
										outlined
										:value="horaInicio"
										@input="$emit('update:horaInicio', $event)"
									></v-text-field>
								</v-col>
								<v-col cols="3">
									<v-text-field
										label="Fecha Fin"
										type="date"
										outlined
										:value="fechaFin"
										@input="$emit('update:fechaFin', $event)"
									></v-text-field>
								</v-col>
								<v-col cols="3">
									<v-text-field
										label="Hora Fin"
										type="time"
										outlined
										:value="horaFin"
										@input="$emit('update:horaFin', $event)"
									></v-text-field>
								</v-col>
								<!-- Problema encontrado (campos especiales para ticket 1/2 y tipo 5) -->
								<v-col
									cols="4"
									v-if="mostrarCamposEspeciales"
								>
									<v-select
										:items="[
											'el estabilizador desconectado',
											'toma de energía averiada',
											'fuente de poder apagada',
											'otro',
										]"
										label="Problema Encontrado"
										outlined
										v-model="problemaEncontradoLocal"
									/>
								</v-col>

								<!-- Especificar otro problema -->
								<v-col
									cols="8"
									v-if="
										mostrarCamposEspeciales &&
										problemaEncontradoLocal === 'otro'
									"
								>
									<v-text-field
										label="Especificar Otro Problema"
										outlined
										v-model="otroProblemaEncontradoLocal"
									></v-text-field>
								</v-col>

								<!-- Correctivo aplicado -->
								<v-col
									cols="8"
									v-if="mostrarCampoCorrectivo"
								>
									<v-textarea
										label="Correctivo Aplicado"
										outlined
										v-model="correctivoLocal"
										rows="3"
									></v-textarea>
								</v-col>

								<!-- Causa del problema (ticket 1 y tipo 6) -->
								<v-col
									cols="4"
									v-if="mostrarCamposCausaProblema"
								>
									<v-select
										:items="[
											{ text: 'Paso de camión', value: 'paso_camion' },
											{ text: 'Climáticos', value: 'climaticos' },
											{ text: 'Intento de robo', value: 'intento_robo' },
											{ text: 'Roedor', value: 'roedor' },
											{
												text: 'Por terceros (especificar brevemente)',
												value: 'por_terceros',
											},
										]"
										item-text="text"
										item-value="value"
										label="Causa del Problema"
										outlined
										v-model="causaProblemaLocal"
									/>
								</v-col>

								<!-- Especificar otra causa -->
								<v-col
									cols="6"
									v-if="
										mostrarCamposCausaProblema &&
										causaProblemaLocal === 'por_terceros'
									"
								>
									<v-text-field
										label="Especificar Otra Causa"
										outlined
										v-model="otraCausaProblemaLocal"
									></v-text-field>
								</v-col>

								<!-- Distancia del corte (ticket 1 y tipo 6) -->
								<v-col
									cols="2"
									v-if="mostrarCamposCausaProblema"
								>
									<v-text-field
										label="Distancia del Corte (Km)"
										outlined
										v-model="distanciaCorteLoca"
										type="number"
										step="0.1"
										min="0"
									></v-text-field>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>

				<!-- Columna secundaria derecha (4 columnas) - Campos específicos -->
				<v-col cols="4">
					<v-card>
						<v-card-text>
							<v-row>
								<!-- Desplazamiento -->
								<v-col
									cols="12"
									v-if="!ocultarRadioButtons"
								>
									<v-radio-group
										v-model="desplazamientoLocal"
										label="Desplazamiento"
									>
										<v-radio
											label="SI"
											value="si"
										></v-radio>
										<v-radio
											label="NO"
											value="no"
										></v-radio>
									</v-radio-group>
								</v-col>

								<!-- Tipo de desplazamiento cuando desplazamiento = "si" -->
								<v-col
									cols="12"
									v-if="desplazamientoLocal === 'si' && !ocultarRadioButtons"
								>
									<v-select
										:items="[
											{
												text: 'Al punto de presencia de Claro',
												value: 'punto_presencia',
											},
											{ text: 'A la sede del cliente', value: 'sede_cliente' },
										]"
										item-text="text"
										item-value="value"
										label="Tipo de Desplazamiento"
										outlined
										v-model="tipoDesplazamientoLocal"
									/>
								</v-col>

								<!-- Comunicación con cliente -->
								<v-col
									cols="12"
									v-if="desplazamientoLocal === 'no' && !ocultarRadioButtons"
								>
									<v-radio-group
										v-model="comunicacionClienteLocal"
										label="Comunicación Cliente"
									>
										<v-radio
											label="SI"
											value="si"
										></v-radio>
										<v-radio
											label="NO"
											value="no"
										></v-radio>
									</v-radio-group>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<v-row> </v-row>
		</v-container>
	</v-card>
</template>

<script>
	export default {
		props: {
			cuismp: {
				type: String,
				default: null,
			},
			fechaInicio: {
				type: String,
				default: null,
			},
			horaInicio: {
				type: String,
				default: null,
			},
			fechaFin: {
				type: String,
				default: null,
			},
			horaFin: {
				type: String,
				default: null,
			},
			desplazamiento: {
				type: String,
				default: null,
			},
			pronombre: {
				type: String,
				default: null,
			},
			nombre: {
				type: String,
				default: null,
			},
			comunicacionCliente: {
				type: String,
				default: null,
			},
			ticket: {
				type: String,
				default: null,
			},
			tipo: {
				type: String,
				default: null,
			},
			problemaEncontrado: {
				type: String,
				default: null,
			},
			otroProblemaEncontrado: {
				type: String,
				default: null,
			},
			correctivo: {
				type: String,
				default: null,
			},
			tipoDesplazamiento: {
				type: String,
				default: null,
			},
			causaProblema: {
				type: String,
				default: null,
			},
			otraCausaProblema: {
				type: String,
				default: null,
			},
			distanciaCorte: {
				type: String,
				default: null,
			},
		},
		computed: {
			pronombreLocal: {
				get() {
					return this.pronombre;
				},
				set(value) {
					this.$emit("update:pronombre", value);
				},
			},
			desplazamientoLocal: {
				get() {
					return this.desplazamiento;
				},
				set(value) {
					this.$emit("update:desplazamiento", value);
				},
			},
			nombreLocal: {
				get() {
					return this.nombre;
				},
				set(value) {
					this.$emit("update:nombre", value);
				},
			},
			comunicacionClienteLocal: {
				get() {
					return this.comunicacionCliente;
				},
				set(value) {
					this.$emit("update:comunicacionCliente", value);
				},
			},

			// Computed para determinar si mostrar los campos especiales (problema encontrado)
			mostrarCamposEspeciales() {
				return (
					(this.ticket === "1" && this.tipo === "5") ||
					(this.ticket === "2" && this.tipo === "5")
				);
			},

			// Computed para determinar si mostrar el campo correctivo (solo para ticket 1 tipo 5)
			mostrarCampoCorrectivo() {
				return this.ticket === "1" && this.tipo === "5";
			},

			// Computed para determinar si mostrar los campos de causa del problema (ticket 1 tipo 6 y ticket 2 tipo 6)
			mostrarCamposCausaProblema() {
				return (
					(this.ticket === "1" && this.tipo === "6") ||
					(this.ticket === "2" && this.tipo === "6")
				);
			},

			// Computed properties para los nuevos campos
			problemaEncontradoLocal: {
				get() {
					return this.problemaEncontrado;
				},
				set(value) {
					this.$emit("update:problemaEncontrado", value);
				},
			},

			otroProblemaEncontradoLocal: {
				get() {
					return this.otroProblemaEncontrado;
				},
				set(value) {
					this.$emit("update:otroProblemaEncontrado", value);
				},
			},

			correctivoLocal: {
				get() {
					return this.correctivo;
				},
				set(value) {
					this.$emit("update:correctivo", value);
				},
			},

			tipoDesplazamientoLocal: {
				get() {
					return this.tipoDesplazamiento;
				},
				set(value) {
					this.$emit("update:tipoDesplazamiento", value);
				},
			},

			causaProblemaLocal: {
				get() {
					return this.causaProblema;
				},
				set(value) {
					this.$emit("update:causaProblema", value);
				},
			},

			otraCausaProblemaLocal: {
				get() {
					return this.otraCausaProblema;
				},
				set(value) {
					this.$emit("update:otraCausaProblema", value);
				},
			},

			distanciaCorteLoca: {
				get() {
					return this.distanciaCorte;
				},
				set(value) {
					this.$emit("update:distanciaCorte", value);
				},
			},

			// Computed para determinar si ocultar los radio buttons
			ocultarRadioButtons() {
				// Condiciones donde se ocultan los radio buttons
				const condicionesOcultar = [
					// Problema de energía comercial en site/POP tipo A
					{ ticket: "1", tipo: "2" }, // Reclamo + Problema energía comercial
					{ ticket: "2", tipo: "2" }, // Proactivo + Problema energía comercial
					{ ticket: "1", tipo: "3" }, // Reclamo + Anexo desconfigurado
					{ ticket: "1", tipo: "4" }, // Reclamo + Anexo deslogueo
					{ ticket: "1", tipo: "5" }, // Reclamo + Sistema eléctrico cliente
					{ ticket: "2", tipo: "5" }, // Proactivo + Sistema eléctrico cliente
				];

				// Verificar si la combinación actual coincide con alguna condición
				return condicionesOcultar.some(
					(condicion) =>
						this.ticket === condicion.ticket && this.tipo === condicion.tipo
				);
			},
		},
		methods: {},
	};
</script>

<style scoped>
	/* Quitar bordes y sombras de los cards internos */
	.v-card {
		box-shadow: none !important;
		border: none !important;
	}

	/* Mantener solo un borde sutil en el card principal si se desea */
	.v-card.mb-12 {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
		border: 1px solid #e0e0e0 !important;
	}
</style>
