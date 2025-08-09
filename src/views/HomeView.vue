<template>
	<v-stepper v-model="e1">
		<v-stepper-header>
			<v-stepper-step
				:complete="e1 > 1"
				step="1"
			>
				Selección de Opciones
			</v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step
				:complete="e1 > 2"
				step="2"
			>
				Llenar Datos
			</v-stepper-step>
			<v-divider></v-divider>
			<v-stepper-step step="3"> Vista Previa </v-stepper-step>
		</v-stepper-header>

		<v-card>
			<v-stepper-items>
				<!-- STEP 1 -->
				<v-stepper-content step="1">
					<v-card
						class="pa-4 elevation-0"
						flat
					>
						<v-container fluid>
							<v-row
								align="center"
								justify="space-between"
							>
								<h3>Selecciona las opciones:</h3>
								
								<!-- Alerta para combinación inválida -->
								<v-alert
									v-if="ticket && tipo && !combinacionValida"
									type="warning"
									outlined
									class="mb-4"
								>
									⚠️ La combinación seleccionada no está disponible. Por favor, selecciona otra opción.
								</v-alert>
								
								<div>
									<v-btn
										color="primary"
										@click="irAPaso2"
										:disabled="!combinacionValida"
										>Continuar</v-btn
									>
									<v-btn text>Cancelar</v-btn>
								</div>
							</v-row>

							<v-row>
								<v-col
									cols="12"
									md="5"
								>
									<v-timeline dense>
										<v-timeline-item
											color="primary"
											small
										>
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
										</v-timeline-item>
									</v-timeline>
								</v-col>
								<v-col
									cols="12"
									md="7"
								>
									<v-timeline dense>
										<v-timeline-item
											color="primary"
											small
										>
											<v-radio-group
												v-model="tipo"
												column
											>
												<v-radio
													v-for="tipoItem in tiposFiltrados"
													:key="tipoItem.value"
													:label="tipoItem.label"
													:value="tipoItem.value"
												></v-radio>
											</v-radio-group>
										</v-timeline-item>
									</v-timeline>
								</v-col>
							</v-row>
						</v-container>
					</v-card>
				</v-stepper-content>

				<!-- STEP 2 -->
				<v-stepper-content step="2">
					<v-card class="pa-4 elevation-0 rounded">
						<Form1
							:cuismp.sync="cuismp"
							:fechaInicio.sync="fechaInicio"
							:horaInicio.sync="horaInicio"
							:fechaFin.sync="fechaFin"
							:horaFin.sync="horaFin"
							:desplazamiento.sync="desplazamiento"
							:pronombre.sync="pronombre"
							:nombre.sync="nombre"
							:comunicacionCliente.sync="comunicacionCliente"
							:problemaEncontrado.sync="problemaEncontrado"
							:otroProblemaEncontrado.sync="otroProblemaEncontrado"
							:correctivo.sync="correctivo"
							:ticket="ticket"
							:tipo="tipo"
						/>
						<v-btn
							color="primary"
							@click="irAPaso3"
							>Continuar</v-btn
						>
						<v-btn text>Cancelar</v-btn>
					</v-card>
				</v-stepper-content>

				<!-- STEP 3 -->
				<v-stepper-content step="3">
					<v-card class="pa-4 elevation-0 rounded grey lighten-4">
						<v-toolbar
							color="primary"
							dark
							flat
						>
							<v-toolbar-title>Visualización del Documento</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-btn
								outlined
								color="white"
								@click="irAPaso1"
								>Volver al Paso 1</v-btn
							>
						</v-toolbar>
						<v-card-text>
							<component
								:is="componenteSeleccionado"
								v-if="ticket && tipo"
								:formData="{
									cuismp: cuismp,
									fechaInicio: fechaInicio,
									horaInicio: horaInicio,
									fechaFin: fechaFin,
									horaFin: horaFin,
									desplazamiento: desplazamiento,
									pronombre: pronombre,
									nombre: nombre,
									comunicacionCliente: comunicacionCliente,
									problemaEncontrado: problemaEncontrado,
									otroProblemaEncontrado: otroProblemaEncontrado,
									correctivo: correctivo,
								}"
							/>
							<div v-else>
								Por favor regresa al paso 1 y selecciona las opciones.
							</div>
						</v-card-text>
					</v-card>
				</v-stepper-content>
			</v-stepper-items>
		</v-card>
	</v-stepper>
</template>

<script>
	import Speach1 from "../components/Speach1.vue";
	import Speach2 from "../components/Speach2.vue";
	import Speach3 from "../components/Speach3.vue";
	import Speach4 from "../components/Speach4.vue";
	import Speach5 from "../components/Speach5.vue";
	import Speach6 from "../components/Speach6.vue";
	import Speach7 from "../components/Speach7.vue";
	import Speach8 from "../components/Speach8.vue";
	import Form1 from "../components/Form1.vue";

	export default {
		components: { Speach1, Speach2, Speach3, Speach4, Speach5, Speach6, Speach7, Speach8, Form1 },
		data() {
			return {
				// Ya no necesitamos el composable en data, trabajamos directamente con el store
			};
		},
		
		computed: {
			// Usar currentStep en lugar de e1 - directamente del store para mejor reactividad
			e1() {
				return this.$store.getters['stepper/currentStep'];
			},
			
			// Propiedades computadas del formulario - directamente del store
			ticket: {
				get() {
					return this.$store.getters['stepper/formData'].ticket;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'ticket', value });
				}
			},
			
			tipo: {
				get() {
					return this.$store.getters['stepper/formData'].tipo;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'tipo', value });
				}
			},
			
			cuismp: {
				get() {
					return this.$store.getters['stepper/formData'].cuismp;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'cuismp', value });
				}
			},
			
			fechaInicio: {
				get() {
					return this.$store.getters['stepper/formData'].fechaInicio;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'fechaInicio', value });
				}
			},
			
			horaInicio: {
				get() {
					return this.$store.getters['stepper/formData'].horaInicio;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'horaInicio', value });
				}
			},
			
			fechaFin: {
				get() {
					return this.$store.getters['stepper/formData'].fechaFin;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'fechaFin', value });
				}
			},
			
			horaFin: {
				get() {
					return this.$store.getters['stepper/formData'].horaFin;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'horaFin', value });
				}
			},
			
			desplazamiento: {
				get() {
					return this.$store.getters['stepper/formData'].desplazamiento;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'desplazamiento', value });
				}
			},
			
			pronombre: {
				get() {
					return this.$store.getters['stepper/formData'].pronombre;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'pronombre', value });
				}
			},
			
			nombre: {
				get() {
					return this.$store.getters['stepper/formData'].nombre;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'nombre', value });
				}
			},
			
			comunicacionCliente: {
				get() {
					return this.$store.getters['stepper/formData'].comunicacionCliente;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'comunicacionCliente', value });
				}
			},
			
			problemaEncontrado: {
				get() {
					return this.$store.getters['stepper/formData'].problemaEncontrado;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'problemaEncontrado', value });
				}
			},
			
			otroProblemaEncontrado: {
				get() {
					return this.$store.getters['stepper/formData'].otroProblemaEncontrado;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'otroProblemaEncontrado', value });
				}
			},
			
			correctivo: {
				get() {
					return this.$store.getters['stepper/formData'].correctivo;
				},
				set(value) {
					this.$store.dispatch('stepper/updateFormField', { field: 'correctivo', value });
				}
			},
			
			// Computed del store
			tiposFiltrados() {
				return this.$store.getters['stepper/tiposValidos'];
			},
			
			combinacionValida() {
				return this.$store.getters['stepper/combinacionValida'];
			},
			
			componenteSeleccionado() {
				return this.$store.getters['stepper/componenteSeleccionado'];
			},
			
			formData() {
				return this.$store.getters['stepper/formData'];
			}
		},
		
		methods: {
			irAPaso2() {
				this.$store.dispatch('stepper/goToStep', 2).catch(error => {
					console.error('Error al ir al paso 2:', error);
					alert(error.message);
				});
			},
			
			irAPaso3() {
				this.$store.dispatch('stepper/goToStep', 3).catch(error => {
					alert(error.message);
				});
			},
			
			irAPaso1() {
				this.$store.dispatch('stepper/resetStepper');
			}
		}
	};
</script>
