<template>
	<v-stepper v-model="e1">
		<v-stepper-header>
			<v-stepper-step
				:complete="e1 > 1"
				step="1"
			>
				Name of step 1
			</v-stepper-step>

			<v-divider></v-divider>

			<v-stepper-step
				:complete="e1 > 2"
				step="2"
			>
				Name of step 2
			</v-stepper-step>

			<v-divider></v-divider>

			<v-stepper-step step="3"> Name of step 3 </v-stepper-step>
		</v-stepper-header>

		<v-stepper-items>
			<v-stepper-content step="1">
				<v-card
					class="mb-12"
					height="400px"
				>
					<template>
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
													label="proactivo"
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
													label="Energia cliente"
													value="2"
												></v-radio>
											</v-radio-group>
										</v-col>
									</v-row>
								</v-timeline-item>
							</v-timeline>
						</v-container>
					</template>
				</v-card>

				<v-btn
					color="primary"
					@click="e1 = 2"
				>
					Continue
				</v-btn>

				<v-btn text> Cancel </v-btn>
			</v-stepper-content>

			<v-stepper-content step="2">
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
								<v-radio-group row v-model="desplazamiento">
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
					@click="e1 = 3"
				>
					Continue
				</v-btn>

				<v-btn text> Cancel </v-btn>
			</v-stepper-content>

			<v-stepper-content step="3">
				<v-card
					class="mb-12"
					color="grey lighten-1"
					height="200px"
				></v-card>

				<v-btn
					color="primary"
					@click="e1 = 1"
				>
					Continue
				</v-btn>

				<v-btn text> Cancel </v-btn>
			</v-stepper-content>
		</v-stepper-items>
	</v-stepper>
</template>

<script>
	export default {
		data() {
			return {
				e1: 1,
				tipo: null,
				ticket: null,
				cuismp: null,
				fechaHoraInicio: null,
				fechaHoraFin: null,
				desplazamiento: null,
			};
		},
	};
</script>
