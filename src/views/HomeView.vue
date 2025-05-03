<template>
	<v-stepper v-model="e1">
		<v-stepper-header>
			<v-stepper-step
				:complete="e1 > 1"
				step="1"
				>Name of Step 1</v-stepper-step
			>
			<v-divider></v-divider>
			<v-stepper-step
				:complete="e1 > 2"
				step="2"
				>Name of Step 2</v-stepper-step
			>
			<v-divider></v-divider>
			<v-stepper-step step="3">Name of Step 3</v-stepper-step>
		</v-stepper-header>

		<v-stepper-items>
			<!-- STEP 1 - Llenar Datos -->
			<v-stepper-content step="1">
				<v-card
					class="mb-12"
					color="grey lighten-1"
				>
					<v-container>
						<v-row>
							<v-col cols="12">
								<v-text-field
									label="CUISMP"
									outlined
									v-model="cuismp"
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									label="Fecha y Hora Inicio"
									type="datetime-local"
									outlined
									v-model="fechaHoraInicio"
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									label="Fecha y Hora Fin"
									type="datetime-local"
									outlined
									v-model="fechaHoraFin"
								></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-radio-group
									row
									v-model="desplazamiento"
								>
									<v-radio
										label="Desplazamiento SI"
										value="si"
									></v-radio>
									<v-radio
										label="Desplazamiento NO"
										value="no"
									></v-radio>
								</v-radio-group>
							</v-col>
						</v-row>
					</v-container>
				</v-card>

				<v-btn
					color="primary"
					@click="irAPaso2"
					>Continue</v-btn
				>
				<v-btn text>Cancel</v-btn>
			</v-stepper-content>

			<!-- STEP 2 - Selección de Opciones -->
			<v-stepper-content step="2">
				<v-card
					class="mb-12"
					height="400px"
				>
					<v-container style="max-width: 600px; margin: 0">
						<h3>Selecciona las opciones:</h3>
						<br />
						<v-timeline
							dense
							clipped
						>
							<v-timeline-item
								class="mb-4"
								color="blue"
								icon-color="blue lighten-2"
								small
							>
								<v-row justify="space-between">
									<v-col cols="7">
										<v-radio-group
											v-model="ticket"
											column
										>
											<v-radio
												label="Reclamos"
												value="1"
											></v-radio>
											<v-radio
												label="Proactivo"
												value="2"
											></v-radio>
										</v-radio-group>
									</v-col>
								</v-row>
							</v-timeline-item>

							<v-timeline-item
								class="mb-4"
								color="blue"
								icon-color="blue lighten-2"
								small
							>
								<v-row justify="space-between">
									<v-col cols="7">
										<v-radio-group
											v-model="tipo"
											column
										>
											<v-radio
												label="Corte de fibra"
												value="1"
											></v-radio>
											<v-radio
												label="Energía cliente"
												value="2"
											></v-radio>
										</v-radio-group>
									</v-col>
								</v-row>
							</v-timeline-item>
						</v-timeline>
					</v-container>
				</v-card>

				<v-btn
					color="primary"
					@click="irAPaso3"
					>Continue</v-btn
				>
				<v-btn text>Cancel</v-btn>
			</v-stepper-content>

			<!-- STEP 3 - Visualización del Speach -->
			<v-stepper-content step="3">
				<v-card
					class="mb-12"
					color="grey lighten-1"
				>
					<v-toolbar
						color="primary"
						dark
					>
						<v-toolbar-title>Visualización del Documento</v-toolbar-title>
					</v-toolbar>

					<v-card-text>
						<component
							:is="componenteSeleccionado"
							v-if="ticket && tipo"
							:formData="{
								cuismp: cuismp,
								fechaHoraInicio: fechaHoraInicio,
								fechaHoraFin: fechaHoraFin,
								desplazamiento: desplazamiento,
							}"
						/>

						<div v-else>
							Por favor regresa al paso 2 y selecciona las opciones.
						</div>
					</v-card-text>
				</v-card>

				<v-btn
					color="primary"
					@click="e1 = 2"
					>Volver al Paso 2</v-btn
				>
				<v-btn text>Cancel</v-btn>
			</v-stepper-content>
		</v-stepper-items>
	</v-stepper>
</template>

<script>
	import Speach1 from "../components/Speach1.vue";
	import Speach2 from "../components/Speach2.vue";
	import Speach3 from "../components/Speach3.vue";

	export default {
		components: { Speach1, Speach2, Speach3 },
		data() {
			return {
				e1: 1, // Comienza en el primer paso
				tipo: null,
				ticket: null,
				cuismp: null,
				fechaHoraInicio: null,
				fechaHoraFin: null,
				desplazamiento: null,
			};
		},
		computed: {
			componenteSeleccionado() {
				if (this.ticket === "1" && this.tipo === "1") return "Speach1";
				if (this.ticket === "1" && this.tipo === "2") return "Speach2";
				if (this.ticket === "2" && this.tipo === "1") return "Speach3";
				return null;
			},
		},
		methods: {
			irAPaso2() {
				if (
					!this.cuismp ||
					!this.fechaHoraInicio ||
					!this.fechaHoraFin ||
					!this.desplazamiento
				) {
					alert("Por favor completa todos los campos del paso 1.");
					return;
				}
				this.e1 = 2;
			},
			irAPaso3() {
				if (!this.ticket || !this.tipo) {
					alert("Por favor selecciona las opciones en el paso 2.");
					return;
				}
				this.e1 = 3;
			},
		},
	};
</script>
