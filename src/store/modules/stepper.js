export default {
	namespaced: true,

	state: {
		currentStep: 1,
		formData: {
			ticket: null,
			tipo: null,
			cuismp: null,
			fechaInicio: null,
			horaInicio: null,
			fechaFin: null,
			horaFin: null,
			desplazamiento: null,
			tipoDesplazamiento: null,
			pronombre: null,
			nombre: null,
			comunicacionCliente: null,
			problemaEncontrado: null,
			otroProblemaEncontrado: null,
			correctivo: null,
			causaProblema: null,
			otraCausaProblema: null,
			distanciaCorte: null,
		},
		validationErrors: {},
		tipos: [
			{
				label:
					"FALLA DE ENERGIA (CLIENTE) - SERVICIO RESTABLECIDO POR POWER ON",
				value: "1",
				estado: true,
			},
			{
				label: "PROBLEMA DE ENERGIA COMERCIAL EN SITE/POP TIPO A",
				value: "2",
				estado: true,
			},
			{
				label: "ANEXO DESCONFIGURADO",
				value: "3",
				estado: true,
			},
			{
				label: "ANEXO DESCONFIGURADO / DESLOGUEO",
				value: "4",
				estado: true,
			},
			{
				label:
					"FALLA DE ENERGIA (CLIENTE) - FALLA EN SISTEMA ELECTRICO DE CLIENTE",
				value: "5",
				estado: true,
			},
			{
				label: "CORTE DE FIBRA OPTICA / COBRE DE ULTIMA MILLA - CASO FORTUITO",
				value: "6",
				estado: true,
			},
			{ label: "PROBLEMA LAN DEL CLIENTE", value: "7", estado: false },
			{
				label: "CLIENTE: CAÍDA DE SERVICIO-MANIPULACIÓN DE EQUIPOS/CABLEADO",
				value: "8",
				estado: false,
			},
			{
				label: "CORTE DE FIBRA OPTICA TRONCAL DE RED - CASO FORTUITO",
				value: "9",
				estado: false,
			},
			{
				label: "SATURAMIENTO ANCHO DE BANDA ALQUILADO",
				value: "10",
				estado: false,
			},
			{ label: "TELEFONO / ANEXO AVERIADO", value: "11", estado: false },
			{ label: "JUMPER DE FIBRA AVERIADO", value: "12", estado: false },
		],
	},

	getters: {
		currentStep: (state) => state.currentStep,
		formData: (state) => state.formData,
		validationErrors: (state) => state.validationErrors,
		tipos: (state) => state.tipos,
		tiposFiltrados: (state) => state.tipos.filter((tipo) => tipo.estado),

		// Getter para tipos válidos según el ticket seleccionado
		tiposValidos: (state) => {
			const combinacionesValidas = [
				{ ticket: "1", tipos: ["1", "2", "3", "4", "5", "6"] }, // Reclamos: tipos 1, 2, 3
				{ ticket: "2", tipos: ["1", "2", "5", "6"] }, // Proactivos: tipos 1, 2
			];

			const ticketActual = state.formData.ticket;
			if (!ticketActual) return state.tipos.filter((tipo) => tipo.estado);

			const config = combinacionesValidas.find(
				(c) => c.ticket === ticketActual
			);
			const tiposPermitidos = config ? config.tipos : [];

			return state.tipos.filter(
				(tipo) => tipo.estado && tiposPermitidos.includes(tipo.value)
			);
		},

		// Getter para validar si la combinación actual es válida
		combinacionValida: (state) => {
			const { ticket, tipo } = state.formData;
			if (!ticket || !tipo) return false;

			const combinacionesValidas = [
				{ ticket: "1", tipo: "1" }, // Speach1
				{ ticket: "2", tipo: "1" }, // Speach2
				{ ticket: "2", tipo: "2" }, // Speach3
				{ ticket: "1", tipo: "2" }, // Speach4
				{ ticket: "1", tipo: "3" }, // Speach5
				{ ticket: "1", tipo: "4" }, // Speach6
				{ ticket: "2", tipo: "5" }, // Speach7
				{ ticket: "1", tipo: "5" }, // Speach8
				{ ticket: "1", tipo: "6" }, // Speach9
				{ ticket: "2", tipo: "6" }, // Speach10
			];

			return combinacionesValidas.some(
				(c) => c.ticket === ticket && c.tipo === tipo
			);
		},

		// Getter para determinar el componente seleccionado
		componenteSeleccionado: (state) => {
			if (state.formData.ticket === "1" && state.formData.tipo === "1")
				return "Speach1";
			if (state.formData.ticket === "2" && state.formData.tipo === "1")
				return "Speach2";
			if (state.formData.ticket === "2" && state.formData.tipo === "2")
				return "Speach3";
			if (state.formData.ticket === "1" && state.formData.tipo === "2")
				return "Speach4";
			if (state.formData.ticket === "1" && state.formData.tipo === "3")
				return "Speach5";
			if (state.formData.ticket === "1" && state.formData.tipo === "4")
				return "Speach6";
			if (state.formData.ticket === "2" && state.formData.tipo === "5")
				return "Speach7";
			if (state.formData.ticket === "1" && state.formData.tipo === "5")
				return "Speach8";
			if (state.formData.ticket === "1" && state.formData.tipo === "6")
				return "Speach9";
			if (state.formData.ticket === "2" && state.formData.tipo === "6")
				return "Speach10";
			return null;
		},

		// Validaciones por paso
		isStep1Valid: (state, getters) => {
			const { ticket, tipo } = state.formData;
			return !!(ticket && tipo && getters.combinacionValida);
		},
		isStep2Valid: (state) => {
			const {
				cuismp,
				fechaInicio,
				horaInicio,
				fechaFin,
				horaFin,
				ticket,
				pronombre,
				nombre,
			} = state.formData;

			const basicValidation =
				cuismp && fechaInicio && horaInicio && fechaFin && horaFin;

			if (ticket === "1") {
				return basicValidation && pronombre && nombre;
			}

			return basicValidation;
		},
	},

	mutations: {
		SET_CURRENT_STEP(state, step) {
			state.currentStep = step;
		},

		UPDATE_FORM_DATA(state, { field, value }) {
			state.formData[field] = value;
		},

		UPDATE_MULTIPLE_FORM_DATA(state, data) {
			state.formData = { ...state.formData, ...data };
		},

	RESET_FORM_DATA(state) {
		state.formData = {
			ticket: null,
			tipo: null,
			cuismp: null,
			fechaInicio: null,
			horaInicio: null,
			fechaFin: null,
			horaFin: null,
			desplazamiento: null,
			pronombre: null,
			nombre: null,
			comunicacionCliente: null,
			problemaEncontrado: null,
			otroProblemaEncontrado: null,
			correctivo: null,
			tipoDesplazamiento: null,
			causaProblema: null,
			otraCausaProblema: null,
			distanciaCorte: null,
		};
	},

		SET_VALIDATION_ERROR(state, { field, error }) {
			state.validationErrors = { ...state.validationErrors, [field]: error };
		},

		CLEAR_VALIDATION_ERRORS(state) {
			state.validationErrors = {};
		},

	RESET_STEPPER(state) {
		state.currentStep = 1;
		state.formData = {
			ticket: null,
			tipo: null,
			cuismp: null,
			fechaInicio: null,
			horaInicio: null,
			fechaFin: null,
			horaFin: null,
			desplazamiento: null,
			pronombre: null,
			nombre: null,
			comunicacionCliente: null,
			problemaEncontrado: null,
			otroProblemaEncontrado: null,
			correctivo: null,
			tipoDesplazamiento: null,
			causaProblema: null,
			otraCausaProblema: null,
			distanciaCorte: null,
		};
		state.validationErrors = {};
	},
	},

	actions: {
		// Navegar a un paso específico
		goToStep({ commit, getters }, step) {
			// Validar antes de avanzar
			if (step === 2 && !getters.isStep1Valid) {
				throw new Error("Por favor selecciona las opciones en el paso 1.");
			}

			if (step === 3 && !getters.isStep2Valid) {
				throw new Error("Por favor completa todos los campos requeridos.");
			}

			commit("SET_CURRENT_STEP", step);
		},

		// Actualizar datos del formulario
		updateFormField({ commit }, { field, value }) {
			commit("UPDATE_FORM_DATA", { field, value });
		},

		// Actualizar múltiples campos
		updateFormData({ commit }, data) {
			commit("UPDATE_MULTIPLE_FORM_DATA", data);
		},

		// Resetear todo el stepper
		resetStepper({ commit }) {
			commit("RESET_STEPPER");
		},

		// Validar formulario
		validateForm({ commit, state }, step) {
			commit("CLEAR_VALIDATION_ERRORS");
			const errors = {};

			if (step === 2) {
				if (!state.formData.cuismp) errors.cuismp = "CUISMP es requerido";
				if (!state.formData.fechaInicio)
					errors.fechaInicio = "Fecha de inicio es requerida";
				if (!state.formData.horaInicio)
					errors.horaInicio = "Hora de inicio es requerida";
				if (!state.formData.fechaFin)
					errors.fechaFin = "Fecha de fin es requerida";
				if (!state.formData.horaFin)
					errors.horaFin = "Hora de fin es requerida";

				if (state.formData.ticket === "1") {
					if (!state.formData.pronombre)
						errors.pronombre = "Pronombre es requerido";
					if (!state.formData.nombre) errors.nombre = "Nombre es requerido";
				}
			}

			// Establecer errores
			Object.keys(errors).forEach((field) => {
				commit("SET_VALIDATION_ERROR", { field, error: errors[field] });
			});

			return Object.keys(errors).length === 0;
		},
	},
};
