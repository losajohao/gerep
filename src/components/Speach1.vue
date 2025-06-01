<template>
	<div>
		<v-row>
			<v-col cols="4">
				<v-card>
					<v-card-title>Datos de formulario</v-card-title>
					<v-card-text>
						<ul>
							<li>
								<span>Pronombre:</span>
								<v-chip>{{ formData.pronombre }}</v-chip>
							</li>
							<li>
								<span>Nombre:</span> <v-chip>{{ nombreFormateado }}</v-chip>
							</li>
							<li>
								<span>CUISMP:</span> <v-chip>{{ formData.cuismp }}</v-chip>
							</li>
							<li>
								<span>Fecha Inicio:</span>
								<v-chip>{{ formData.fechaInicio }}</v-chip>
							</li>
							<li>
								<span>Hora Inicio:</span>
								<v-chip>{{ formData.horaInicio }}</v-chip>
							</li>
							<li>
								<span>Fecha Fin:</span> <v-chip>{{ formData.fechaFin }}</v-chip>
							</li>
							<li>
								<span>Hora Fin:</span> <v-chip>{{ formData.horaFin }}</v-chip>
							</li>
							<li>
								<span>Desplazamiento:</span>
								<v-chip>{{ formData.desplazamiento }}</v-chip>
							</li>
							<li>
								<span>Comunicacion Cliente:</span>
								<v-chip>{{ formData.comunicacionCliente }}</v-chip>
							</li>
						</ul>
					</v-card-text>
				</v-card>
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
						ello,
						<span v-if="formData.desplazamiento == 'si'">
							se gestionó el desplazamiento de personal técnico especializado
							hacia la sede del cliente.
						</span>
						<span v-if="formData.comunicacionCliente == 'no'">
							en comunicación con el cliente se validó un evento de energía en
							la sede del cliente
						</span>
						<span v-if="formData.comunicacionCliente == 'si'">
							tratamos de comunicarnos con el cliente, para que nos informe si
							se encontraba realizando algún trabajo o si presentó algún evento
							de energía en su sede</span
						>. Posteriormente, se verificó el restablecimiento del servicio por
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
	export default {
		name: "Speach1",
		props: {
			formData: {
				type: Object,
				required: true,
			},
		},
		computed: {
			fechaInicioFormateada() {
				if (!this.formData.fechaInicio) return "";
				const fecha = new Date(this.formData.fechaInicio);
				const dia = fecha.getDate().toString().padStart(2, "0");
				const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
				const año = fecha.getFullYear().toString();
				return `${dia}/${mes}/${año}`;
			},
			fechaFinFormateada() {
				if (!this.formData.fechaFin) return "";
				const fecha = new Date(this.formData.fechaFin);
				const dia = fecha.getDate().toString().padStart(2, "0");
				const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
				const año = fecha.getFullYear().toString();
				return `${dia}/${mes}/${año}`;
			},
			nombreFormateado() {
				if (!this.formData.nombre) return "";
				console.log("nombreFormateado:", this.formData.nombre
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "));
				return this.formData.nombre
					.split(" ")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
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
