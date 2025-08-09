import store from "../store";

export function useStepperFlow() {

  // Getters que retornan valores reactivos para Vue 2
  const getters = {
    get currentStep() {
      return { value: store.getters['stepper/currentStep'] };
    },
    get formData() {
      return { value: store.getters['stepper/formData'] };
    },
    get validationErrors() {
      return { value: store.getters['stepper/validationErrors'] };
    },
    get tipos() {
      return { value: store.getters['stepper/tipos'] };
    },
    get tiposFiltrados() {
      return { value: store.getters['stepper/tiposFiltrados'] };
    },
    get componenteSeleccionado() {
      return { value: store.getters['stepper/componenteSeleccionado'] };
    },
    get isStep1Valid() {
      return { value: store.getters['stepper/isStep1Valid'] };
    },
    get isStep2Valid() {
      return { value: store.getters['stepper/isStep2Valid'] };
    }
  };

  // Navegar a un paso específico
  const goToStep = async (step) => {
    try {
      await store.dispatch('stepper/goToStep', step);
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  // Navegar al siguiente paso
  const nextStep = async () => {
    const next = getters.currentStep.value + 1;
    return await goToStep(next);
  };

  // Navegar al paso anterior
  const previousStep = async () => {
    const prev = Math.max(1, getters.currentStep.value - 1);
    return await goToStep(prev);
  };

  // Actualizar campo del formulario
  const updateFormField = (field, value) => {
    store.dispatch('stepper/updateFormField', { field, value });
  };

  // Actualizar múltiples campos
  const updateFormData = (data) => {
    store.dispatch('stepper/updateFormData', data);
  };

  // Validar formulario
  const validateForm = (step) => {
    return store.dispatch('stepper/validateForm', step);
  };

  // Resetear stepper completo
  const resetStepper = () => {
    store.dispatch('stepper/resetStepper');
  };

  // Métodos específicos para cada paso
  const irAPaso1 = () => goToStep(1);
  const irAPaso2 = () => goToStep(2);
  const irAPaso3 = () => goToStep(3);

  // Validaciones simplificadas - el store maneja la lógica de validación
  const canGoToStep2 = () => {
    return store.getters['stepper/isStep1Valid'];
  };

  const canGoToStep3 = () => {
    return store.getters['stepper/isStep2Valid'];
  };

  return {
    // Estado - usando los getters
    currentStep: getters.currentStep,
    formData: getters.formData,
    validationErrors: getters.validationErrors,
    tipos: getters.tipos,
    tiposFiltrados: getters.tiposFiltrados,
    componenteSeleccionado: getters.componenteSeleccionado,
    isStep1Valid: getters.isStep1Valid,
    isStep2Valid: getters.isStep2Valid,

    // Navegación
    goToStep,
    nextStep,
    previousStep,
    irAPaso1,
    irAPaso2,
    irAPaso3,

    // Validaciones
    canGoToStep2,
    canGoToStep3,
    validateForm,

    // Datos del formulario
    updateFormField,
    updateFormData,
    resetStepper
  };
}
