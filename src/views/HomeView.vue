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
								<div>
									<v-btn
										color="primary"
										@click="irAPaso2"
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
							:ticket="ticket"
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
	import Form1 from "../components/Form1.vue";

	export default {
		components: { Speach1, Speach2, Speach3, Form1 },
		data() {
			return {
				e1: 1, // Comienza en el primer paso
				tipo: null,
				ticket: null,
				cuismp: null,
				fechaInicio: null,
				horaInicio: null,
				fechaFin: null,
				horaFin: null,
				desplazamiento: null,
				pronombre: null,
				nombre: null,
				comunicacionCliente: null,
				tipos: [
					{
						label:
							"FALLA DE ENERGIA (CLIENTE) - SERVICIO RESTABLECIDO POR POWER ON",
						value: "1",
						estado: true,
					},
					{
						label:
							"FALLA DE ENERGIA (CLIENTE) - FALLA EN SISTEMA ELECTRICO DE CLIENTE",
						value: "2",
						estado: false,
					},
					{
						label: "PROBLEMA DE ENERGIA COMERCIAL EN SITE/POP TIPO A",
						value: "3",
						estado: false,
					},
					{
						label: "CORTE DE FIBRA OPTICA TRONCAL DE RED - CASO FORTUITO",
						value: "4",
						estado: false,
					},
					{ label: "PROBLEMA LAN DEL CLIENTE", value: "5", estado: false },
					{ label: "ANEXO DESCONFIGURADO", value: "6", estado: false },
					{
						label:
							"CLIENTE: CAÍDA DE SERVICIO-MANIPULACIÓN DE EQUIPOS/CABLEADO",
						value: "7",
						estado: false,
					},
					{
						label:
							"CORTE DE FIBRA OPTICA / COBRE DE ULTIMA MILLA - CASO FORTUITO",
						value: "8",
						estado: false,
					},
					{
						label: "SATURAMIENTO ANCHO DE BANDA ALQUILADO",
						value: "9",
						estado: false,
					},
					{ label: "TELEFONO / ANEXO AVERIADO", value: "10", estado: false },
					{ label: "JUMPER DE FIBRA AVERIADO", value: "11", estado: false },
				],
			};
		},
		computed: {
			tiposFiltrados() {
				return this.tipos.filter((tipo) => tipo.estado);
			},
			componenteSeleccionado() {
				if (this.ticket === "1" && this.tipo === "1") return "Speach1";
				if (this.ticket === "2" && this.tipo === "1") return "Speach2";
				return null;
			},
		},
		methods: {
			irAPaso2() {
				if (!this.ticket || !this.tipo) {
					alert("Por favor selecciona las opciones en el paso 1.");
					return;
				}
				this.e1 = 2;
			},
			irAPaso3() {
				if (this.cuismp === null || this.cuismp === "") {
					alert("Por favor ingrese el campo CUISMP.");
					return;
				}
				if (this.fechaInicio === null || this.fechaInicio === "") {
					alert("Por favor completa el campo Fecha de Inicio.");
					return;
				}
				if (this.horaInicio === null || this.horaInicio === "") {
					alert("Por favor completa el campo Hora de Inicio.");
					return;
				}
				if (this.fechaFin === null || this.fechaFin === "") {
					alert("Por favor completa el campo Fecha de Fin.");
					return;
				}
				if (this.horaFin === null || this.horaFin === "") {
					alert("Por favor completa el campo Hora de Fin.");
					return;
				}
				if (this.desplazamiento === null || this.desplazamiento === "") {
					alert("Por favor selecciona una opción de Desplazamiento.");
					return;
				}
				if (
					this.ticket == "1" &&
					(this.pronombre === null || this.pronombre === "")
				) {
					alert("Por favor selecciona un pronombre.");
					return;
				}
				if (
					this.ticket == "1" &&
					(this.nombre === null || this.nombre === "")
				) {
					alert("Por favor completa el campo Nombre.");
					return;
				}
				if (
					this.comunicacionCliente === null ||
					this.comunicacionCliente === ""
				) {
					alert(
						"Por favor selecciona una opción de Comunicación con el cliente."
					);
					return;
				}

				this.e1 = 3;
			},
			irAPaso1() {
				this.e1 = 1;
				this.tipo = null;
				this.ticket = null;
				this.cuismp = null;
				this.fechaInicio = null;
				this.horaInicio = null;
				this.fechaFin = null;
				this.horaFin = null;
				this.desplazamiento = null;
				this.pronombre = null;
				this.nombre = null;
				this.comunicacionCliente = null;
			},
		},
	};
</script>
