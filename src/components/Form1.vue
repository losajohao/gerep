<template>
	<v-card
		class="mb-12"
		color="white lighten-1"
	>
		<v-container>
			<v-row>
				<v-col cols="2">
					<v-select
						:items="['El Sr.', 'La Sra.', 'La Srta.']"
						label="Pronombres"
						outlined
						v-model="pronombreLocal"
					/>
				</v-col>
				<v-col cols="8">
					<v-text-field
						label="Nombre"
						outlined
						:value="nombre"
						@input="$emit('update:nombre', $event)"
					></v-text-field>
				</v-col>
				<v-col cols="2">
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
				<v-col cols="4">
					<v-radio-group
						row
						v-model="desplazamientoLocal"
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
				<v-col
					cols="6"
					v-if="desplazamientoLocal === 'no'"
				>
					<v-radio-group
						row
						v-model="comunicacionClienteLocal"
					>
						<v-radio
							label="Comunicación con el cliente SI"
							value="si"
						></v-radio>
						<v-radio
							label="Comunicación con el cliente NO"
							value="no"
						></v-radio>
					</v-radio-group>
				</v-col>
			</v-row>
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
		},
	};
</script>
