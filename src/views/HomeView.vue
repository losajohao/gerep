<template>
	<v-stepper v-model="e1">
		<v-stepper-header>
			<v-stepper-step
				:complete="e1 > 1"
				step="1"
				>Selección de Opciones</v-stepper-step
			>
			<v-divider></v-divider>
			<v-stepper-step
				:complete="e1 > 2"
				step="2"
				>Llenar Datos</v-stepper-step
			>
			<v-divider></v-divider>
			<v-stepper-step step="3">Vista Previa</v-stepper-step>
		</v-stepper-header>

		<v-stepper-items>
			<!-- STEP 1 - Selección de Opciones -->
			<v-stepper-content step="1">
				<v-card
					class="mb-12"
					height="90vh"
				>
					<v-container style="max-width: 100%; margin: 0">
						<v-row
							align="center"
							style="display: flex; justify-content: space-between"
						>
							<v-col cols="auto">
								<h3>Selecciona las opciones:</h3>
							</v-col>
							<v-col cols="auto">
								<v-btn
									color="primary"
									@click="irAPaso2"
									>Continuar</v-btn
								>
								<v-btn text>Cancelar</v-btn>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="5">
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
											<v-col cols="12">
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
								</v-timeline>
							</v-col>
							<v-col cols="7">
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
											<v-col cols="12">
												<v-radio-group
													v-model="tipo"
													column
												>
													<v-radio
														:label="tipoItem.label"
														:value="tipoItem.value"
														v-for="tipoItem in tipos"
														:key="tipoItem.value"
													></v-radio>
												</v-radio-group>
											</v-col>
										</v-row>
									</v-timeline-item>
								</v-timeline>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-stepper-content>

			<!-- STEP 2 - Llenar Datos -->
			<v-stepper-content step="2">
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
				/>
				<v-btn
					color="primary"
					@click="irAPaso3"
					>Continuar</v-btn
				>
				<v-btn text>Cancelar</v-btn>
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

				<v-btn
					color="primary"
					@click="e1 = 1"
					>Volver al Paso 1</v-btn
				>
				<v-btn text>Cancelar</v-btn>
			</v-stepper-content>
		</v-stepper-items>
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
					},
					{
						label:
							"FALLA DE ENERGIA (CLIENTE) - FALLA EN SISTEMA ELECTRICO DE CLIENTE",
						value: "2",
					},
					{
						label: "PROBLEMA DE ENERGIA COMERCIAL EN SITE/POP TIPO A",
						value: "3",
					},
					{
						label: "CORTE DE FIBRA OPTICA TRONCAL DE RED - CASO FORTUITO",
						value: "4",
					},
					{ label: "PROBLEMA LAN DEL CLIENTE", value: "5" },
					{ label: "ANEXO DESCONFIGURADO", value: "6" },
					{
						label:
							"CLIENTE: CAÍDA DE SERVICIO-MANIPULACIÓN DE EQUIPOS/CABLEADO",
						value: "7",
					},
					{
						label:
							"CORTE DE FIBRA OPTICA / COBRE DE ULTIMA MILLA - CASO FORTUITO",
						value: "8",
					},
					{ label: "SATURAMIENTO ANCHO DE BANDA ALQUILADO", value: "9" },
					{ label: "TELEFONO / ANEXO AVERIADO", value: "10" },
					{ label: "JUMPER DE FIBRA AVERIADO", value: "11" },
				],
			};
		},
		computed: {
			componenteSeleccionado() {
				if (this.ticket === "1" && this.tipo === "1") return "Speach1";
				if (this.ticket === "1" && this.tipo === "2") return "Speach2";
				if (this.ticket === "2" && this.tipo === "1") return "Speach3";
				if (this.ticket === "2" && this.tipo === "2") return "Speach3";
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
				console.log("cuismp:", this.cuismp);
				console.log("fechaInicio:", this.fechaInicio);
				console.log("horaInicio:", this.horaInicio);
				console.log("fechaFin:", this.fechaFin);
				console.log("horaFin:", this.horaFin);
				console.log("desplazamiento:", this.desplazamiento);

				if (this.cuismp === null || this.cuismp === "") {
					alert("Por favor completa el campo CUISMP.");
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
				if (this.pronombre === null || this.pronombre === "") {
					alert("Por favor selecciona un pronombre.");
					return;
				}
				if (this.nombre === null || this.nombre === "") {
					alert("Por favor completa el campo Nombre.");
					return;
				}
				if (this.comunicacionCliente === null || this.comunicacionCliente === "") {
					alert("Por favor selecciona una opción de Comunicación con el cliente.");
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
