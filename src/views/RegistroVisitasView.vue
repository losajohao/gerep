<template>
	<v-container fluid>
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-title class="d-flex justify-space-between align-center">
						<span
							class="text-h5"
							style="color: #c76b6b"
							>Registro de visitas</span
						>
						<div class="d-flex gap-2">
							<v-btn
								icon
								color="#C76B6B"
								@click="refrescarVisitas"
								:loading="loading"
								title="Refrescar lista"
							>
								<v-icon>mdi-refresh</v-icon>
							</v-btn>
							<v-btn
								color="#C76B6B"
								dark
								@click="abrirDialogo()"
							>
								<v-icon left>mdi-plus</v-icon>
								Nueva visita
							</v-btn>
						</div>
					</v-card-title>

					<!-- Filtros -->
					<v-card-text>
						<v-row>
							<v-col
								cols="12"
								md="2"
							>
								<v-text-field
									v-model="filtro.nombre"
									label="Buscar por personal"
									prepend-inner-icon="mdi-magnify"
									outlined
									dense
									clearable
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="4"
							>
								<v-select
									v-model="filtro.estado"
									:items="estadosVisita"
									label="Filtrar por estado"
									outlined
									dense
									clearable
								></v-select>
							</v-col>
							<v-col
								cols="12"
								md="4"
							>
								<v-text-field
									v-model="filtro.fecha"
									label="Filtrar por fecha revisión"
									type="date"
									outlined
									dense
									clearable
								></v-text-field>
							</v-col>
						</v-row>
					</v-card-text>

					<!-- Tabla de datos -->
					<v-data-table
						:headers="headers"
						:items="visitasFiltradas"
						:loading="loading"
						class="elevation-0"
						:items-per-page="10"
					>
						<template v-slot:item.fecha="{ item }">
							{{ formatearFecha(item.fecha) }}
						</template>

						<template v-slot:item.estadoInicial="{ item }">
							<v-chip
								:color="item.estadoInicial ? 'success' : 'error'"
								text-color="white"
								small
							>
								{{ item.estadoInicial ? "Activo" : "Inactivo" }}
							</v-chip>
						</template>

						<template v-slot:item.estadoFinal="{ item }">
							<v-chip
								:color="item.estadoFinal ? 'success' : 'error'"
								text-color="white"
								small
							>
								{{ item.estadoFinal ? "Activo" : "Inactivo" }}
							</v-chip>
						</template>

						<template v-slot:item.distritoFiscal="{ item }">
							{{ getTextoDistrito(item.distritoFiscal) }}
						</template>

						<template v-slot:item.tipificacion="{ item }">
							{{ getTextoTipificacion(item.tipificacion) }}
						</template>

						<template v-slot:item.modelo="{ item }">
							{{ getTextoModelo(item.modelo) }}
						</template>

						<template v-slot:item.responsable="{ item }">
							{{ getTextoResponsable(item.responsable) }}
						</template>

						            <template v-slot:item.nombrePersonal="{ item }">
              {{ item.nombrePersonal }}
            </template>

            <template v-slot:item.switch="{ item }">
              <v-chip
                :color="item.switch ? 'success' : 'error'"
                text-color="white"
                small
              >
                {{ item.switch ? 'Sí' : 'No' }}
              </v-chip>
            </template>

            <template v-slot:item.clienteConflicto="{ item }">
              <v-chip
                :color="item.clienteConflicto ? 'error' : 'success'"
                text-color="white"
                small
              >
                {{ item.clienteConflicto ? 'Sí' : 'No' }}
              </v-chip>
            </template>

            <template v-slot:item.detalleClienteConflicto="{ item }">
              <span v-if="item.detalleClienteConflicto" class="text-body-2">
                {{ item.detalleClienteConflicto }}
              </span>
              <span v-else class="text-caption grey--text">
                Sin detalle
              </span>
            </template>

						<template v-slot:item.acciones="{ item }">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										icon
										small
										color="#C76B6B"
										@click="abrirDialogo(item)"
										v-bind="attrs"
										v-on="on"
									>
										<v-icon>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Editar visita</span>
							</v-tooltip>
							
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										icon
										small
										color="red"
										@click="confirmarEliminar(item)"
										:disabled="eliminando || loading"
										:loading="eliminando && visitaAEliminar?.id === item.id"
										v-bind="attrs"
										v-on="on"
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Eliminar visita</span>
							</v-tooltip>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>

		<!-- Diálogo para crear/editar -->
		<v-dialog
			v-model="dialogo"
			max-width="900px"
			persistent
		>
			<v-card>
				<v-card-title
					class="text-h6"
					style="color: #c76b6b"
				>
					{{ editando ? "Editar visita" : "Nueva visita" }}
				</v-card-title>

				<v-card-text>
					<v-form
						ref="form"
						v-model="formularioValido"
					>
						<v-row>
							<!-- Fila 1: Identificadores principales -->
							<v-col
								cols="12"
								md="3"
							>
								<v-select
									v-model="visitaForm.distritoFiscal"
									:items="distritosFiscales"
									label="Distrito Fiscal"
									:rules="[reglas.requerido]"
									outlined
									dense
								></v-select>
							</v-col>
							<v-col
								cols="12"
								md="6"
							>
								<v-select
									v-model="visitaForm.tipificacion"
									:items="tipificaciones"
									label="Tipificación"
									:rules="[reglas.requerido]"
									outlined
									dense
								></v-select>
							</v-col>
							<v-col
								cols="12"
								md="3"
							>
								<v-text-field
									v-model="visitaForm.fechaRevision"
									label="Fecha (DD/MM/YYYY)"
									:rules="[reglas.requerido, reglas.fecha]"
									outlined
									dense
									maxlength="10"
									placeholder="31/12/2024"
								></v-text-field>
							</v-col>
							<!-- Fila 2: Códigos -->
							<v-col
								cols="12"
								md="2"
							>
								<v-text-field
									v-model="visitaForm.cid"
									label="CID"
									:rules="[reglas.cid]"
									outlined
									dense
									maxlength="10"
									placeholder="1234567890"
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="2"
							>
								<v-text-field
									v-model="visitaForm.cuismp"
									label="CUISMP"
									:rules="[reglas.cuismp]"
									outlined
									dense
									maxlength="5"
									placeholder="12345"
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="2"
							>
								<v-text-field
									v-model="visitaForm.anexo"
									label="Anexo"
									:rules="[reglas.requerido, reglas.anexo]"
									outlined
									dense
									maxlength="5"
									placeholder="12345"
								></v-text-field>
							</v-col>

							<!-- Fila 3: Información técnica -->
							<v-col
								cols="12"
								md="3"
							>
								<v-text-field
									v-model="visitaForm.mac"
									label="MAC"
									:rules="[reglas.mac]"
									outlined
									dense
									maxlength="12"
									placeholder="50CD22043040"
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="3"
							>
								<v-text-field
									v-model="visitaForm.serie"
									label="Serie"
									:rules="[reglas.serie]"
									outlined
									dense
									maxlength="12"
									placeholder="22WZ455000LW"
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="2"
							>
								<v-text-field
									v-model="visitaForm.ticket"
									label="Ticket"
									:rules="[reglas.ticket]"
									outlined
									dense
									maxlength="10"
									placeholder="21789760"
								></v-text-field>
							</v-col>

							<!-- Fila 4: Responsable y Estados -->
							<v-col
								cols="12"
								md="5"
							>
								<v-text-field
									v-model="visitaForm.nombrePersonal"
									label="Nombre de personal (Opcional)"
									:rules="[reglas.soloLetras]"
									outlined
									dense
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="3"
							>
								<v-select
									v-model="visitaForm.responsable"
									:items="responsables"
									label="Responsable"
									:rules="[reglas.requerido]"
									outlined
									dense
								></v-select>
							</v-col>
              <v-col
								cols="12"
								md="2"
							>
								<v-select
									v-model="visitaForm.modelo"
									:items="modelos"
									label="Modelo"
									outlined
									dense
								></v-select>
							</v-col>
              <v-col
								cols="12"
								md="6"
							>
								<v-text-field
									v-model="visitaForm.sede"
									label="Sede"
									:rules="[reglas.soloLetras]"
									outlined
									dense
								></v-text-field>
							</v-col>
              <v-col
								cols="12"
								md="6"
							>
								<v-text-field
									v-model="visitaForm.cargo"
									label="Cargo (Opcional)"
									:rules="[reglas.soloLetras]"
									outlined
									dense
								></v-text-field>
							</v-col>
							<v-col
								cols="12"
								md="3"
							>
								<v-label class="mb-2">Estado Inicial Anexo</v-label>
								<div class="d-flex align-center">
									<v-switch
										v-model="visitaForm.estadoInicial"
										:true-value="true"
										:false-value="false"
										inset
										dense
										class="mr-2"
									></v-switch>
									<span
										class="text-body-2"
										:class="
											visitaForm.estadoInicial ? 'success--text' : 'error--text'
										"
									>
										{{ visitaForm.estadoInicial ? "Activo" : "Inactivo" }}
									</span>
								</div>
							</v-col>

							<v-col
								cols="12"
								md="3"
							>
								<v-label class="mb-2">Estado Final Anexo</v-label>
								<div class="d-flex align-center">
									<v-switch
										v-model="visitaForm.estadoFinal"
										:true-value="true"
										:false-value="false"
										inset
										dense
										class="mr-2"
									></v-switch>
									<span
										class="text-body-2"
										:class="
											visitaForm.estadoFinal ? 'success--text' : 'error--text'
										"
									>
										{{ visitaForm.estadoFinal ? "Activo" : "Inactivo" }}
									</span>
								</div>
							</v-col>

							<!-- Fila 5: Campos adicionales -->

							
							

							<!-- Fila 6: Otros campos -->
							
							<v-col
								cols="12"
								md="6"
							>
								<v-label class="mb-2">¿Cuenta con switch de Claro?</v-label>
								<div class="d-flex align-center">
									<v-switch
										v-model="visitaForm.switch"
										:true-value="true"
										:false-value="false"
										inset
										dense
										class="mr-2"
									></v-switch>
									<span class="text-body-2" :class="visitaForm.switch ? 'success--text' : 'error--text'">
										{{ visitaForm.switch ? 'Sí' : 'No' }}
									</span>
								</div>
							</v-col>
							<v-col
								cols="12"
								md="6"
							>
								<v-label class="mb-2">¿Hay equipos del cliente que hacen conflicto con equipos de Claro?</v-label>
								<div class="d-flex align-center">
									<v-switch
										v-model="visitaForm.clienteConflicto"
										:true-value="true"
										:false-value="false"
										inset
										dense
										class="mr-2"
									></v-switch>
									<span class="text-body-2" :class="visitaForm.clienteConflicto ? 'success--text' : 'error--text'">
										{{ visitaForm.clienteConflicto ? 'Sí' : 'No' }}
									</span>
								</div>
							</v-col>

							<!-- Campo condicionado para detalle del conflicto -->
							<v-col
								v-if="visitaForm.clienteConflicto"
								cols="6"
							>
								<v-textarea
									v-model="visitaForm.detalleClienteConflicto"
									label="Detalle del conflicto con equipos del cliente"
									outlined
									dense
									rows="3"
									placeholder="Describa brevemente el conflicto entre equipos..."
								></v-textarea>
							</v-col>

							<!-- Fila 7: Observaciones -->
							<v-col cols="6">
								<v-textarea
									v-model="visitaForm.observaciones"
									label="Observaciones"
									outlined
									dense
									rows="3"
								></v-textarea>
							</v-col>
						</v-row>
					</v-form>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						text
						@click="cerrarDialogo"
						>Cancelar</v-btn
					>
					<v-btn
						color="#C76B6B"
						dark
						@click="guardarVisita"
						:disabled="!formularioValido"
						:loading="guardando"
					>
						{{ editando ? "Actualizar" : "Guardar" }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Diálogo de confirmación para eliminar -->
		<v-dialog
			v-model="dialogoEliminar"
			max-width="500px"
			persistent
		>
			<v-card>
				<v-card-title class="text-h6 red--text">
					<v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
					Confirmar eliminación
				</v-card-title>
				<v-card-text>
					<div class="mb-3">
						<strong>⚠️ Esta acción no se puede deshacer</strong>
					</div>
					<div class="mb-2">
						¿Estás seguro de que deseas eliminar esta visita ?
					</div>
					<v-card 
						v-if="visitaAEliminar" 
						outlined 
						class="pa-3 grey lighten-5"
					>
						<div class="text-body-2">
							<div><strong>Ticket:</strong> {{ visitaAEliminar.ticket || 'N/A' }}</div>
							<div><strong>Anexo:</strong> {{ visitaAEliminar.anexo || 'N/A' }}</div>
							<div><strong>Personal:</strong> {{ visitaAEliminar.nombrePersonal || 'N/A' }}</div>
							<div><strong>Distrito:</strong> {{ getTextoDistrito(visitaAEliminar.distritoFiscal) }}</div>
							<div><strong>Fecha:</strong> {{ visitaAEliminar.fechaRevision || 'N/A' }}</div>
						</div>
					</v-card>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						text
						@click="cancelarEliminacion"
						:disabled="eliminando"
					>
						Cancelar
					</v-btn>
					<v-btn
						color="red"
						dark
						@click="eliminarVisita"
						:loading="eliminando"
						:disabled="eliminando"
					>
						<v-icon left>mdi-delete</v-icon>
						Eliminar definitivamente
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Snackbar para notificaciones -->
		<v-snackbar
			v-model="snackbar.show"
			:color="snackbar.color"
			timeout="3000"
		>
			{{ snackbar.mensaje }}
			<template v-slot:action="{ attrs }">
				<v-btn
					text
					v-bind="attrs"
					@click="snackbar.show = false"
					>Cerrar</v-btn
				>
			</template>
		</v-snackbar>
	</v-container>
</template>

<script>
	import { DISTRITOS_FISCALES } from "@/constants/distritosFiscales";
	import { TIPIFICACIONES } from "@/constants/tipificaciones";
	import { RESPONSABLES } from "@/constants/responsables";
	import { MODELOS } from "@/constants/modelos";
	import VisitasService from "@/services/visitasService";

	export default {
		name: "RegistroVisitasView",
					data() {
			return {
				loading: true,
				guardando: false,
				eliminando: false,
				dialogo: false,
				dialogoEliminar: false,
				editando: false,
				formularioValido: false,
				visitaAEliminar: null,

				// Filtros
				filtro: {
					nombre: "",
					estado: "",
					fecha: "",
				},

				// Headers de la tabla
				headers: [
					{ text: "Distrito Fiscal", value: "distritoFiscal", sortable: true },
					{ text: "CID", value: "cid", sortable: true, width: "80px" },
					{ text: "CUISMP", value: "cuismp", sortable: true, width: "80px" },
					{ text: "Anexos", value: "anexo", sortable: true, width: "80px" },
					{ text: "Modelo", value: "modelo", sortable: true, width: "80px" },
					{ text: "MAC", value: "mac", sortable: true },
					{ text: "Serie", value: "serie", sortable: true },
					{ text: "Fecha", value: "fechaRevision", sortable: true },
					{ text: "Tipificación", value: "tipificacion", sortable: true },
					{ text: "Responsable", value: "responsable", sortable: true },
					{ text: "Nombre Personal", value: "nombrePersonal", sortable: true },
					{
						text: "Estado Inicial",
						value: "estadoInicial",
						sortable: true,
						width: "120px",
					},
					{
						text: "Estado Final",
						value: "estadoFinal",
						sortable: true,
						width: "120px",
					},
									{ text: "Switch Claro", value: "switch", sortable: true, width: "100px" },
				{ text: "Cliente Conflicto", value: "clienteConflicto", sortable: true, width: "120px" },
				{ text: "Detalle Conflicto", value: "detalleClienteConflicto", sortable: true },
				{
					text: "Acciones",
					value: "acciones",
					sortable: false,
					width: "120px",
				},
				],

				// Estados disponibles
				estadosVisita: [
					{ text: "Activo", value: "activo" },
					{ text: "Inactivo", value: "inactivo" },
					{ text: "En revisión", value: "en_revision" },
					{ text: "Mantenimiento", value: "mantenimiento" },
				],

				// Distritos fiscales
				distritosFiscales: DISTRITOS_FISCALES,

				// Tipificaciones
				tipificaciones: TIPIFICACIONES,

				// Responsables
				responsables: RESPONSABLES,

				// Modelos
				modelos: MODELOS,

				// Formulario
				visitaForm: {
					id: null,
					ticket: "",
					anexo: "",
					modelo: "",
					cargo: "",
					responsable: "",
					nombrePersonal: "",
					estadoInicial: false,
					estadoFinal: false,
					distritoFiscal: null,
					tipificacion: null,
					cid: "",
					cuismp: "",
					sede: "",
					mac: "",
					serie: "",
					fechaRevision: "",
					observaciones: "",
					switch: false,
					clienteConflicto: false,
					detalleClienteConflicto: "",
				},

								// Datos de registros desde Firebase
				visitas: [],

				// Snackbar
				snackbar: {
					show: false,
					mensaje: "",
					color: "success",
				},

				// Reglas de validación reutilizables
				reglas: {
					requerido: (v) => !!v || "Este campo es requerido",
					email: (v) => !v || /.+@.+\..+/.test(v) || "Email debe ser válido",
					telefono: (v) =>
						!v || /^[+]?[\d\s-()]+$/.test(v) || "Teléfono debe ser válido",
					cid: (v) => this.validarSoloNumeros(v, 10, "CID"),
					cuismp: (v) => this.validarSoloNumeros(v, 5, "CUISMP"),
					anexo: (v) => this.validarSoloNumeros(v, 5, "Anexo"),
					ticket: (v) => this.validarSoloNumeros(v, 10, "Ticket"),
					mac: (v) => this.validarAlfanumerico(v, 12, "MAC", "[A-Za-z0-9]"),
					serie: (v) => this.validarAlfanumerico(v, 12, "Serie", "[A-Za-z0-9]"),
					fecha: (v) => this.validarFormatoFecha(v),
					soloLetras: (v) => this.validarSoloLetras(v),
					numeroMaximo: (max, campo) => (v) =>
						this.validarSoloNumeros(v, max, campo),
				},
			};
		},

		mounted() {
			this.cargarVisitas();
		},

		computed: {
			visitasFiltradas() {
				return this.visitas.filter((visita) => {
					const coincideNombre =
						!this.filtro.nombre ||
						visita.nombrePersonal
							.toLowerCase()
							.includes(this.filtro.nombre.toLowerCase());
					const coincideEstado =
						!this.filtro.estado ||
						visita.estadoInicial === this.filtro.estado ||
						visita.estadoFinal === this.filtro.estado;
					const coincideFecha =
						!this.filtro.fecha || visita.fechaRevision === this.filtro.fecha;

					return coincideNombre && coincideEstado && coincideFecha;
				});
			},
		},

		methods: {
			abrirDialogo(visita = null) {
				if (visita) {
					this.editando = true;
					// Crear una copia profunda para evitar mutaciones accidentales
					this.visitaForm = { 
						...visita,
						// Asegurar que los campos booleanos tengan valores correctos
						estadoInicial: Boolean(visita.estadoInicial),
						estadoFinal: Boolean(visita.estadoFinal),
						switch: Boolean(visita.switch),
						clienteConflicto: Boolean(visita.clienteConflicto)
					};
					console.log('Editando visita:', this.visitaForm);
				} else {
					this.editando = false;
					this.resetearFormulario();
				}
				this.dialogo = true;
			},

			cerrarDialogo() {
				this.dialogo = false;
				this.resetearFormulario();
				if (this.$refs.form) {
					this.$refs.form.resetValidation();
				}
			},

			resetearFormulario() {
				this.visitaForm = {
					id: null,
					ticket: "",
					anexo: "",
					modelo: "",
					cargo: "",
					responsable: "",
					nombrePersonal: "",
					estadoInicial: false,
					estadoFinal: false,
					distritoFiscal: null,
					tipificacion: null,
					cid: "",
					cuismp: "",
					sede: "",
					mac: "",
					serie: "",
					fechaRevision: "",
					observaciones: "",
					switch: false,
					clienteConflicto: false,
					detalleClienteConflicto: "",
				};
			},

			async cargarVisitas() {
				this.loading = true;
				try {
					// Debug: verificar estado de autenticación
					console.log('Estado de autenticación:', this.$store.getters['auth/isAuthenticated']);
					console.log('Usuario actual:', this.$store.getters['auth/currentUser']);
					
					this.visitas = await VisitasService.obtenerVisitas();
					console.log(`✅ Cargadas ${this.visitas.length} visitas`);
				} catch (error) {
					console.error('Error cargando visitas:', error);
					this.mostrarSnackbar(error.message || 'Error al cargar las visitas', 'error');
				} finally {
					this.loading = false;
				}
			},

			async refrescarVisitas() {
				try {
					this.loading = true;
					this.visitas = await VisitasService.obtenerVisitas();
					console.log('🔄 Visitas refrescadas');
					this.mostrarSnackbar('📋 Lista actualizada', 'info');
				} catch (error) {
					console.error('Error refrescando visitas:', error);
					this.mostrarSnackbar('❌ Error al refrescar la lista', 'error');
				} finally {
					this.loading = false;
				}
			},

			async guardarVisita() {
				if (!this.$refs.form.validate()) return;

				this.guardando = true;

				try {
					if (this.editando) {
						// Validar que el ID esté presente para la actualización
						if (!this.visitaForm.id) {
							throw new Error('Error: ID de visita no encontrado para actualización');
						}
						
						// Actualizar visita existente
						console.log('Iniciando actualización de visita ID:', this.visitaForm.id);
						
						const visitaActualizada = await VisitasService.actualizarVisita(
							this.visitaForm.id,
							this.visitaForm
						);
						
						// Actualizar en la lista local
						const index = this.visitas.findIndex(
							(v) => v.id === this.visitaForm.id
						);
						if (index !== -1) {
							this.visitas.splice(index, 1, visitaActualizada);
							console.log('Visita actualizada en la lista local');
						} else {
							console.warn('No se encontró la visita en la lista local para actualizar');
							// Recargar todas las visitas si no se encuentra
							await this.cargarVisitas();
						}
						
						this.mostrarSnackbar("✅ Visita actualizada correctamente", "success");
					} else {
						// Crear nueva visita
						const nuevaVisita = await VisitasService.crearVisita(this.visitaForm);
						this.visitas.unshift(nuevaVisita); // Agregar al inicio
						this.mostrarSnackbar("Visita creada correctamente", "success");
					}

					this.cerrarDialogo();
				} catch (error) {
					console.error('Error guardando visita:', error);
					this.mostrarSnackbar(error.message || "Error al guardar la visita", "error");
				} finally {
					this.guardando = false;
				}
			},

			async confirmarEliminar(visita) {
				console.log('Confirmando eliminación de visita:', visita);
				
				// Verificar que la visita tenga un ID válido
				if (!visita || !visita.id) {
					this.mostrarSnackbar("❌ Error: No se puede eliminar esta visita", "error");
					return;
				}

				// Opcional: Verificar que la visita aún existe en Firebase antes de mostrar el diálogo
				try {
					await VisitasService.obtenerVisitaPorId(visita.id);
					this.visitaAEliminar = visita;
					this.dialogoEliminar = true;
				} catch (error) {
					console.error('Error verificando visita:', error);
					this.mostrarSnackbar("⚠️ La visita ya no existe o no se puede acceder a ella", "warning");
					// Refrescar la lista para sincronizar
					await this.refrescarVisitas();
				}
			},

			cancelarEliminacion() {
				console.log('Cancelando eliminación');
				this.dialogoEliminar = false;
				this.visitaAEliminar = null;
				this.eliminando = false;
			},

			async eliminarVisita() {
				if (!this.visitaAEliminar || !this.visitaAEliminar.id) {
					this.mostrarSnackbar("❌ Error: No se puede eliminar la visita", "error");
					return;
				}

				this.eliminando = true;
				const visitaId = this.visitaAEliminar.id;
				const visitaInfo = `${this.visitaAEliminar.ticket || 'N/A'} - ${this.visitaAEliminar.nombrePersonal || 'N/A'}`;
				
				console.log('Iniciando eliminación de visita ID:', visitaId);

				try {
					// Verificar una vez más que la visita existe antes de eliminar
					await VisitasService.obtenerVisitaPorId(visitaId);
					
					// Proceder con la eliminación
					await VisitasService.eliminarVisita(visitaId);

					// Remover de la lista local
					const index = this.visitas.findIndex((v) => v.id === visitaId);
					
					if (index !== -1) {
						this.visitas.splice(index, 1);
						console.log('✅ Visita removida de la lista local');
					} else {
						console.warn('⚠️ Visita no encontrada en la lista local, refrescando...');
						// Si no se encuentra, recargar la lista completa sin mostrar loading
						try {
							this.visitas = await VisitasService.obtenerVisitas();
						} catch (refreshError) {
							console.error('Error refrescando después de eliminar:', refreshError);
						}
					}

					this.mostrarSnackbar(`🗑️ Visita eliminada: ${visitaInfo}`, "success");
					this.cancelarEliminacion();
				} catch (error) {
					console.error('Error eliminando visita:', error);
					
					// Si la visita ya no existe, removerla de la lista local
					if (error.message.includes('no existe') || error.message.includes('not-found')) {
						const index = this.visitas.findIndex((v) => v.id === visitaId);
						if (index !== -1) {
							this.visitas.splice(index, 1);
							this.mostrarSnackbar("📄 La visita ya había sido eliminada", "info");
							this.cancelarEliminacion();
							return;
						}
					}
					
					this.mostrarSnackbar(error.message || "❌ Error al eliminar la visita", "error");
				} finally {
					this.eliminando = false;
				}
			},

			formatearFecha(fecha) {
				if (!fecha) return "";
				const date = new Date(fecha);
				return date.toLocaleDateString("es-CL");
			},

			getColorEstado(estado) {
				const colores = {
					programada: "#2196F3",
					en_curso: "#FF9800",
					completada: "#4CAF50",
					cancelada: "#F44336",
				};
				return colores[estado] || "#9E9E9E";
			},

			mostrarSnackbar(mensaje, color = "success") {
				this.snackbar.mensaje = mensaje;
				this.snackbar.color = color;
				this.snackbar.show = true;
			},

			getTextoDistrito(value) {
				const distrito = this.distritosFiscales.find((d) => d.value === value);
				return distrito ? distrito.text : value;
			},

			getTextoTipificacion(value) {
				const tipificacion = this.tipificaciones.find((t) => t.value === value);
				return tipificacion ? tipificacion.text : value;
			},

			getTextoResponsable(value) {
				const responsable = this.responsables.find((r) => r.value === value);
				return responsable ? responsable.text : value;
			},

			getTextoModelo(value) {
				const modelo = this.modelos.find((m) => m.value === value);
				return modelo ? modelo.text : value;
			},

			// Funciones de validación reutilizables (solo alertas, sin modificar valores)
			validarSoloNumeros(valor, maxCaracteres, nombreCampo) {
				if (!valor) return true;

				// Validar que solo contenga números
				if (!/^\d+$/.test(valor)) {
					return `${nombreCampo} debe contener solo números`;
				}

				// Validar longitud máxima
				if (valor.length > maxCaracteres) {
					return `${nombreCampo} debe tener máximo ${maxCaracteres} caracteres`;
				}

				return true;
			},

			validarFormatoFecha(valor) {
				if (!valor) return true;

				// Validar formato DD/MM/YYYY
				const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
				if (!regex.test(valor)) {
					return "La fecha debe tener el formato DD/MM/YYYY (ej: 31/12/2024)";
				}

				// Validar que sea una fecha válida
				const [dia, mes, año] = valor.split("/").map(Number);
				const fecha = new Date(año, mes - 1, dia);

				if (
					fecha.getDate() !== dia ||
					fecha.getMonth() !== mes - 1 ||
					fecha.getFullYear() !== año
				) {
					return "La fecha ingresada no es válida";
				}

				return true;
			},

			validarAlfanumerico(valor, maxCaracteres, nombreCampo, patronCaracteres) {
				if (!valor) return true;

				// Crear regex dinámico basado en el patrón de caracteres permitidos
				const regex = new RegExp(`^${patronCaracteres}+$`);

				// Validar que solo contenga los caracteres permitidos
				if (!regex.test(valor)) {
					const tipoCaracteres =
						patronCaracteres === "[A-F0-9]"
							? "números y letras (A-F, 0-9)"
							: "números y letras";
					return `${nombreCampo} debe contener solo ${tipoCaracteres}`;
				}

				// Validar longitud máxima
				if (valor.length > maxCaracteres) {
					return `${nombreCampo} debe tener máximo ${maxCaracteres} caracteres`;
				}

				return true;
			},

			validarSoloLetras(valor) {
				if (!valor) return true;

				// Validar que solo contenga letras y espacios
				const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

				if (!regex.test(valor)) {
					return "El nombre debe contener solo letras y espacios";
				}

				// Validar que no tenga espacios múltiples
				if (/\s{2,}/.test(valor)) {
					return "El nombre no debe tener espacios múltiples";
				}

				// Validar que no empiece o termine con espacios
				if (valor.trim() !== valor) {
					return "El nombre no debe empezar o terminar con espacios";
				}

				return true;
			},
		},
	};
</script>

<style scoped>
	.v-card-title {
		background-color: rgba(199, 107, 107, 0.05);
	}

	.v-data-table >>> .v-data-table__wrapper {
		border-radius: 8px;
	}

	.v-chip {
		font-weight: 500;
	}
</style>
