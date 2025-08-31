<template>
	<div class="indicadores-container">
		<v-container fluid>
			<!-- Primera fila - Gráficos -->
			<v-row>
				<v-col cols="4">
					<v-card class="tabla-card">
						<v-card-title class="card-header">
							<v-icon
								class="mr-2"
								color="white"
								>mdi-chart-bar</v-icon
							>
							Anexos por Mes
						</v-card-title>

						<v-card-text>
							<!-- Estado de carga -->
							<div
								v-if="loadingGrafico"
								class="text-center py-4"
							>
								<v-progress-circular
									indeterminate
									color="#C76B6B"
								></v-progress-circular>
								<p class="mt-2">Cargando gráfico...</p>
							</div>

							<!-- Gráfico de barras -->
							<div v-else class="chart-container">
								<div v-if="anexosPorMes.length === 0" class="text-center py-8">
									<v-icon size="64" color="#C76B6B">mdi-chart-bar</v-icon>
									<p class="mt-2 text-h6">No hay datos para mostrar</p>
									<p class="text-body-2 text--secondary">Agrega algunas visitas para ver el gráfico</p>
								</div>
								<canvas
									v-else
									ref="chartCanvas"
									style="height: 100%; width: 100%;"
								></canvas>
							</div>
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="4">
					<v-card class="tabla-card">
						<v-card-title class="card-header">
							<v-icon
								class="mr-2"
								color="white"
								>mdi-cellphone</v-icon
							>
							Anexos por Modelo
						</v-card-title>

						<v-card-text>
							<!-- Estado de carga -->
							<div
								v-if="loadingGraficoModelo"
								class="text-center py-4"
							>
								<v-progress-circular
									indeterminate
									color="#C76B6B"
								></v-progress-circular>
								<p class="mt-2">Cargando gráfico...</p>
							</div>

							<!-- Gráfico de barras -->
							<div v-else class="chart-container">
								<div v-if="anexosPorModelo.length === 0" class="text-center py-8">
									<v-icon size="64" color="#C76B6B">mdi-cellphone</v-icon>
									<p class="mt-2 text-h6">No hay datos para mostrar</p>
									<p class="text-body-2 text--secondary">Agrega algunas visitas para ver el gráfico</p>
								</div>
								<canvas
									v-else
									ref="chartCanvasModelo"
									style="height: 100%; width: 100%;"
								></canvas>
							</div>
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="4">
					<v-card class="tabla-card">
						<v-card-title class="card-header">
							<v-icon
								class="mr-2"
								color="white"
								>mdi-chart-pie</v-icon
							>
							Responsabilidades
						</v-card-title>

						<v-card-text>
							<!-- Estado de carga -->
							<div
								v-if="loadingGraficoTorta"
								class="text-center py-4"
							>
								<v-progress-circular
									indeterminate
									color="#C76B6B"
								></v-progress-circular>
								<p class="mt-2">Cargando gráfico...</p>
							</div>

							<!-- Gráfico de torta -->
							<div v-else class="chart-container">
								<div v-if="porcentajesPorResponsabilidad.length === 0" class="text-center py-8">
									<v-icon size="64" color="#C76B6B">mdi-chart-pie</v-icon>
									<p class="mt-2 text-h6">No hay datos para mostrar</p>
									<p class="text-body-2 text--secondary">Agrega algunas visitas para ver el gráfico</p>
								</div>
								<canvas
									v-else
									ref="chartCanvasTorta"
									style="height: 100%; width: 100%;"
								></canvas>
							</div>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<!-- Segunda fila - Tablas -->
			<v-row class="mt-4">
				<v-col cols="6">
					<v-card class="tabla-card">
						<v-card-title class="card-header d-flex justify-space-between align-center">
							<div class="d-flex align-center">
								<v-icon
									class="mr-2"
									color="white"
									>mdi-table-large</v-icon
								>
								tipificaciones por Responsable
							</div>
							<v-select
								v-model="filtroResponsable"
								:items="responsablesDisponibles"
								label="Filtrar por responsable"
								clearable
								dense
								hide-details
								solo
								class="filtro-responsable"
								style="max-width: 200px;"
								prepend-icon="mdi-account"
							></v-select>
						</v-card-title>

						<v-card-text>
							<!-- Estado de carga -->
							<div
								v-if="loading"
								class="text-center py-4"
							>
								<v-progress-circular
									indeterminate
									color="#C76B6B"
								></v-progress-circular>
								<p class="mt-2">Cargando...</p>
							</div>

							<!-- Tabla de datos -->
							<div v-else>
								<v-data-table
									:headers="headers"
									:items="tipificacionesData"
									:items-per-page="5"
									class="elevation-0"
								>
									<template v-slot:[`item.responsabilidad`]="{ item }">
										<v-chip
											:color="getResponsabilidadColor(item.responsabilidad)"
											dark
											small
										>
											{{ item.responsabilidad }}
										</v-chip>
									</template>
								</v-data-table>
							</div>
						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols="6">
					<v-card class="tabla-card">
						<v-card-title class="card-header d-flex justify-space-between align-center">
							<div class="d-flex align-center">
								<v-icon
									class="mr-2"
									color="white"
									>mdi-calendar-month</v-icon
								>
								Anexos por Mes y Distrito Fiscal
							</div>
							<v-select
								v-model="filtroMes"
								:items="mesesDisponibles"
								label="Filtrar por mes"
								clearable
								dense
								hide-details
								solo
								class="filtro-mes"
								style="max-width: 200px;"
								prepend-icon="mdi-calendar"
							></v-select>
						</v-card-title>

						<v-card-text>
							<!-- Estado de carga -->
							<div
								v-if="loadingMesDistrito"
								class="text-center py-4"
							>
								<v-progress-circular
									indeterminate
									color="#C76B6B"
								></v-progress-circular>
								<p class="mt-2">Cargando...</p>
							</div>

							<!-- Tabla de datos -->
							<div v-else>
								<v-data-table
									:headers="headersMesDistrito"
									:items="anexosMesDistritoData"
									:items-per-page="5"
									class="elevation-0"
								>
									<template v-slot:[`item.mes`]="{ item }">
										<v-chip
											color="#C76B6B"
											dark
											small
										>
											{{ item.mes }}
										</v-chip>
									</template>
									<template v-slot:[`item.distrito`]="{ item }">
										<v-chip
											color="#F1A7A7"
											dark
											small
										>
											{{ item.distrito }}
										</v-chip>
									</template>
								</v-data-table>
							</div>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import IndicadoresService from "@/services/indicadoresService";
	import { RESPONSABLES } from "@/constants/responsables";
	import {
		Chart,
		CategoryScale,
		LinearScale,
		BarElement,
		BarController,
		ArcElement,
		PieController,
		Title,
		Tooltip,
		Legend
	} from 'chart.js';

	// Registrar componentes de Chart.js
	Chart.register(CategoryScale, LinearScale, BarElement, BarController, ArcElement, PieController, Title, Tooltip, Legend);

	export default {
		name: "IndicadoresView",
		data() {
			return {
				tipificaciones: [],
				anexosMesDistrito: [],
				anexosPorMes: [],
				anexosPorModelo: [],
				porcentajesPorResponsabilidad: [],
				filtroMes: null,
				filtroResponsable: null,
				loading: true,
				loadingMesDistrito: true,
				loadingGrafico: true,
				loadingGraficoModelo: true,
				loadingGraficoTorta: true,
				chart: null,
				chartModelo: null,
				chartTorta: null,
				headers: [
					{
						text: "Responsable",
						value: "responsabilidad",
						align: "center",
						sortable: true,
					},
					{
						text: "Tipificación",
						value: "tipificacion",
						sortable: true,
					},
					{
						text: "Total",
						value: "total",
						align: "center",
						sortable: true,
					},
				],
				headersMesDistrito: [
					{
						text: "Mes",
						value: "mes",
						align: "center",
						sortable: true,
					},
					{
						text: "Distrito Fiscal",
						value: "distrito",
						align: "center",
						sortable: true,
					},
					{
						text: "Total Anexos",
						value: "totalAnexos",
						align: "center",
						sortable: true,
					},
				],
			};
		},
		computed: {
			tipificacionesData() {
				if (!this.filtroResponsable) {
					return this.tipificaciones;
				}
				return this.tipificaciones.filter(item => item.responsabilidad === this.filtroResponsable);
			},
			anexosMesDistritoData() {
				if (!this.filtroMes) {
					return this.anexosMesDistrito;
				}
				return this.anexosMesDistrito.filter(item => item.mes === this.filtroMes);
			},
			mesesDisponibles() {
				const meses = [...new Set(this.anexosMesDistrito.map(item => item.mes))];
				return meses.sort();
			},
			responsablesDisponibles() {
				const responsables = [...new Set(this.tipificaciones.map(item => item.responsabilidad))];
				return responsables.sort();
			},
		},
		async mounted() {
			await Promise.all([
				this.cargarTipificaciones(),
				this.cargarAnexosMesDistrito(),
				this.cargarAnexosPorMes(),
				this.cargarAnexosPorModelo(),
				this.cargarPorcentajesPorResponsabilidad()
			]);
		},
		methods: {
			async cargarTipificaciones() {
				try {
					this.loading = true;
					this.tipificaciones =
						await IndicadoresService.obtenerTipificaciones();
				} catch (error) {
					console.error("Error cargando tipificaciones:", error);
					this.tipificaciones = [];
				} finally {
					this.loading = false;
				}
			},
			async cargarAnexosMesDistrito() {
				try {
					this.loadingMesDistrito = true;
					this.anexosMesDistrito =
						await IndicadoresService.obtenerAnexosPorMesYDistrito();
				} catch (error) {
					console.error("Error cargando anexos por mes y distrito:", error);
					this.anexosMesDistrito = [];
				} finally {
					this.loadingMesDistrito = false;
				}
			},
			async cargarAnexosPorMes() {
				try {
					this.loadingGrafico = true;
					this.anexosPorMes = await IndicadoresService.obtenerAnexosPorMes();
					console.log('Anexos por mes cargados:', this.anexosPorMes);
					
					// Esperar a que el DOM se actualice y el canvas esté disponible
					await this.$nextTick();
					
					// Esperar un poco más para asegurar que el canvas esté renderizado
					setTimeout(() => {
						if (this.anexosPorMes.length > 0) {
							this.crearGrafico();
						}
					}, 100);
				} catch (error) {
					console.error("Error cargando anexos por mes:", error);
					this.anexosPorMes = [];
				} finally {
					this.loadingGrafico = false;
				}
			},
			crearGrafico() {
				if (this.chart) {
					this.chart.destroy();
				}

				// Verificar que hay datos
				if (!this.anexosPorMes || this.anexosPorMes.length === 0) {
					console.warn('No hay datos para mostrar en el gráfico');
					return;
				}

				console.log('Datos para el gráfico:', this.anexosPorMes);

				const ctx = this.$refs.chartCanvas.getContext('2d');
				
				// Generar colores con diferentes intensidades para cada barra
				const coloresBarras = ['#2E5984', '#4A90A4', '#5DADE2', '#85C1E9', '#AED6F1'];
				const backgroundColors = this.anexosPorMes.map((_, index) => {
					return coloresBarras[index % coloresBarras.length];
				});
				const borderColors = this.anexosPorMes.map((_, index) => {
					// Usar un tono más oscuro para el borde
					const coloresOscuros = ['#1B3A5C', '#2E5984', '#4A90A4', '#5DADE2', '#85C1E9'];
					return coloresOscuros[index % coloresOscuros.length];
				});

				this.chart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: this.anexosPorMes.map(item => item.mes),
						datasets: [{
							label: 'Cantidad de Anexos',
							data: this.anexosPorMes.map(item => item.total),
							backgroundColor: backgroundColors,
							borderColor: borderColors,
							borderWidth: 1,
						}]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							title: {
								display: true,
								text: 'Anexos por Mes',
								font: {
									size: 16,
									weight: 'bold'
								},
								color: '#C76B6B'
							},
							legend: {
								display: true,
								position: 'top'
							}
						},
						scales: {
							y: {
								beginAtZero: true,
								ticks: {
									stepSize: 1,
									color: '#666'
								},
								grid: {
									color: 'rgba(0, 0, 0, 0.1)'
								}
							},
							x: {
								ticks: {
									color: '#666'
								},
								grid: {
									display: false
								}
							}
						}
					}
				});

				console.log('Gráfico creado:', this.chart);
			},
			async cargarAnexosPorModelo() {
				try {
					this.loadingGraficoModelo = true;
					this.anexosPorModelo = await IndicadoresService.obtenerAnexosPorModelo();
					console.log('Anexos por modelo cargados:', this.anexosPorModelo);
					
					// Esperar a que el DOM se actualice y el canvas esté disponible
					await this.$nextTick();
					
					// Esperar un poco más para asegurar que el canvas esté renderizado
					setTimeout(() => {
						if (this.anexosPorModelo.length > 0) {
							this.crearGraficoModelo();
						}
					}, 100);
				} catch (error) {
					console.error("Error cargando anexos por modelo:", error);
					this.anexosPorModelo = [];
				} finally {
					this.loadingGraficoModelo = false;
				}
			},
			crearGraficoModelo() {
				if (this.chartModelo) {
					this.chartModelo.destroy();
				}

				// Verificar que hay datos
				if (!this.anexosPorModelo || this.anexosPorModelo.length === 0) {
					console.warn('No hay datos para mostrar en el gráfico de modelos');
					return;
				}

				console.log('Datos para el gráfico de modelos:', this.anexosPorModelo);

				const ctx = this.$refs.chartCanvasModelo.getContext('2d');
				
				// Generar colores con diferentes intensidades para cada barra
				const coloresBarrasModelo = ['#2E5984', '#4A90A4', '#5DADE2', '#85C1E9', '#AED6F1'];
				const backgroundColorsModelo = this.anexosPorModelo.map((_, index) => {
					return coloresBarrasModelo[index % coloresBarrasModelo.length];
				});
				const borderColorsModelo = this.anexosPorModelo.map((_, index) => {
					// Usar un tono más oscuro para el borde
					const coloresOscuros = ['#1B3A5C', '#2E5984', '#4A90A4', '#5DADE2', '#85C1E9'];
					return coloresOscuros[index % coloresOscuros.length];
				});

				this.chartModelo = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: this.anexosPorModelo.map(item => item.modelo),
						datasets: [{
							label: 'Cantidad de Anexos',
							data: this.anexosPorModelo.map(item => item.total),
							backgroundColor: backgroundColorsModelo,
							borderColor: borderColorsModelo,
							borderWidth: 1,
						}]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							title: {
								display: true,
								text: 'Anexos por Modelo',
								font: {
									size: 16,
									weight: 'bold'
								},
								color: '#C76B6B'
							},
							legend: {
								display: true,
								position: 'top'
							}
						},
						scales: {
							y: {
								beginAtZero: true,
								ticks: {
									stepSize: 1,
									color: '#666'
								},
								grid: {
									color: 'rgba(0, 0, 0, 0.1)'
								}
							},
							x: {
								ticks: {
									color: '#666',
									maxRotation: 45
								},
								grid: {
									display: false
								}
							}
						}
					}
				});

				console.log('Gráfico de modelos creado:', this.chartModelo);
			},
			async cargarPorcentajesPorResponsabilidad() {
				try {
					this.loadingGraficoTorta = true;
					this.porcentajesPorResponsabilidad = await IndicadoresService.obtenerPorcentajesPorResponsabilidad();
					console.log('Porcentajes por responsabilidad cargados:', this.porcentajesPorResponsabilidad);
					
					// Esperar a que el DOM se actualice y el canvas esté disponible
					await this.$nextTick();
					
					// Esperar un poco más para asegurar que el canvas esté renderizado
					setTimeout(() => {
						if (this.porcentajesPorResponsabilidad.length > 0) {
							this.crearGraficoTorta();
						}
					}, 100);
				} catch (error) {
					console.error("Error cargando porcentajes por responsabilidad:", error);
					this.porcentajesPorResponsabilidad = [];
				} finally {
					this.loadingGraficoTorta = false;
				}
			},
			crearGraficoTorta() {
				if (this.chartTorta) {
					this.chartTorta.destroy();
				}

				// Verificar que hay datos
				if (!this.porcentajesPorResponsabilidad || this.porcentajesPorResponsabilidad.length === 0) {
					console.warn('No hay datos para mostrar en el gráfico de torta');
					return;
				}

				console.log('Datos para el gráfico de torta:', this.porcentajesPorResponsabilidad);

				const ctx = this.$refs.chartCanvasTorta.getContext('2d');
				
				// Colores mates en tonos azules para el gráfico de torta
				const coloresDefinidos = ['#2E5984', '#4A90A4', '#5DADE2', '#85C1E9', '#AED6F1'];
				const colores = {};
				RESPONSABLES.forEach((responsable, index) => {
					colores[responsable.value] = coloresDefinidos[index] || '#5D6D7E';
				});
				
				const backgroundColors = this.porcentajesPorResponsabilidad.map(item => {
					// Limpiar y normalizar el valor de responsabilidad (minúsculas según constantes)
					const responsabilidadLimpia = item.responsabilidad.toString().trim().toLowerCase();
					console.log('Responsabilidad original:', `"${item.responsabilidad}"`, 'Limpia:', `"${responsabilidadLimpia}"`, 'Color:', colores[responsabilidadLimpia]);
					return colores[responsabilidadLimpia] || '#C76B6B';
				});
				
				this.chartTorta = new Chart(ctx, {
					type: 'pie',
					data: {
						labels: this.porcentajesPorResponsabilidad.map(item => item.responsabilidad),
						datasets: [{
							data: this.porcentajesPorResponsabilidad.map(item => item.total),
							backgroundColor: backgroundColors,
							borderColor: '#ffffff',
							borderWidth: 2,
						}]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						layout: {
							padding: {
								top: 10,
								bottom: 10
							}
						},
						plugins: {
							title: {
								display: true,
								text: 'Distribución por Responsabilidad',
								font: {
									size: 14,
									weight: 'bold'
								},
								color: '#C76B6B',
								padding: {
									bottom: 10
								}
							},
							legend: {
								display: true,
								position: 'bottom',
								labels: {
									padding: 15,
									usePointStyle: true,
									font: {
										size: 12
									}
								}
							},
							tooltip: {
								backgroundColor: 'rgba(52, 152, 219, 0.9)',
								titleColor: 'white',
								bodyColor: 'white',
								borderColor: '#3498DB',
								borderWidth: 1,
								callbacks: {
									label: function(context) {
										const item = this.porcentajesPorResponsabilidad[context.dataIndex];
										return `${context.label}: ${item.total} (${item.porcentaje}%)`;
									}.bind(this)
								}
							}
						}
					}
				});

				console.log('Gráfico de torta creado:', this.chartTorta);
			},
			getResponsabilidadColor(responsabilidad) {
				// Usar los mismos colores mates azules que en el gráfico de torta
				const coloresDefinidos = ['#2E5984', '#4A90A4', '#5DADE2', '#85C1E9', '#AED6F1'];
				const colores = {};
				RESPONSABLES.forEach((responsable, index) => {
					colores[responsable.value] = coloresDefinidos[index] || '#5D6D7E';
				});
				
				const responsabilidadLimpia = responsabilidad.toString().trim().toLowerCase();
				return colores[responsabilidadLimpia] || "#5D6D7E";
			},
		},
		beforeDestroy() {
			if (this.chart) {
				this.chart.destroy();
			}
			if (this.chartModelo) {
				this.chartModelo.destroy();
			}
			if (this.chartTorta) {
				this.chartTorta.destroy();
			}
		},
	};
</script>

<style scoped>
	.indicadores-container {
		padding: 20px;
		background-color: #fafafa;
		min-height: 100vh;
	}

	.header-section {
		text-align: center;
		margin-bottom: 30px;
	}

	.page-title {
		color: #c76b6b;
		font-size: 2.5rem;
		font-weight: 300;
		margin-bottom: 10px;
	}

	.page-subtitle {
		color: #666;
		font-size: 1.2rem;
		margin: 0;
	}

	.tabla-card {
		border-radius: 12px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.card-header {
		background: linear-gradient(135deg, #c76b6b 0%, #f1a7a7 100%);
		color: white;
		border-radius: 12px 12px 0 0;
	}

	.filtro-mes,
	.filtro-responsable {
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 8px;
	}

	.filtro-mes >>> .v-input__control,
	.filtro-responsable >>> .v-input__control {
		min-height: 40px;
	}

	.filtro-mes >>> .v-select__selection,
	.filtro-responsable >>> .v-select__selection {
		color: #333 !important;
	}

	.filtro-mes >>> .v-label,
	.filtro-responsable >>> .v-label {
		color: #666 !important;
	}

	.filtro-mes >>> .v-icon,
	.filtro-responsable >>> .v-icon {
		color: #666 !important;
	}

	/* Asegurar altura uniforme en todos los gráficos */
	.tabla-card .v-card-text {
		min-height: 420px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	/* Contenedor de gráficos con altura fija */
	.chart-container {
		height: 350px;
		width: 100%;
		position: relative;
	}
</style>
