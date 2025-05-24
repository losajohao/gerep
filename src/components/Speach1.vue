<template>
	<div class="pdf-container">
		<h1 class="title">Reporte de Reclamos - Corte de fibra</h1>

		<p>
			A traves de los gestores de monitoreo de Claro, se detectó la interrupción
			total del servicio de datos del cliente identificado con el CUISMP
			{{ formData.cuismp }} y se genero el ticket, el día {{ fechaInicioFormateada }} a las {{ formData.horaInicio }}
			horas. Por motivos ajenos a nuestro control, causado por la interrupción
			en el suministro eléctrico (Corte de energía comercial no programado) en
			la zona donde se ubica nuestro punto de presencia, afectó a dicho punto de
			presencia del cual se aprovisiona los servicios del cliente. CLARO actuó
			diligentemente puesto que el respaldo eléctrico operó normalmente, sin
			embargo, más adelante se presentó un problema con la contingencia
			eléctrica, lo que a su vez produjo la afectación en los servicios del
			cliente. En vista de ello, CLARO tomó las acciones correctivas
			<span v-if="formData.desplazamiento == 'si'">
				, desplazando personal especializado para realizar los correctivos del
				caso
			</span>
			, restableciendo el fluido eléctrico en el punto de presencia a través del
			sistema de contingencia eléctrico y verificando el restablecimiento del
			servicio el día {{ fechaFinFormateada }} a las {{ formData.horaFin }} horas.
		</p>

		<p><strong>Fecha y hora inicio:</strong> {{ fechaInicioFormateada }} {{ formData.horaInicio }}</p>
		<p><strong>Fecha y hora fin:</strong> {{ fechaFinFormateada }} {{ formData.horaFin }}</p>

		<v-divider class="my-4"></v-divider>
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
