import { db, auth } from '../utils/firebase';
import VisitasService from './visitasService';
import { TIPIFICACIONES } from '../constants/tipificaciones';

export class IndicadoresService {
  
  // Obtener tipificaciones con total por responsable
  static async obtenerTipificaciones() {
    try {
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando tipificaciones con total por responsable para usuario:', auth.currentUser.email);
      
      // Obtener todas las visitas
      const visitas = await VisitasService.obtenerVisitas();
      
      // Contar cada tipificación por responsable
      const contadorTipificaciones = {};
      
      visitas.forEach(visita => {
        if (visita.tipificacion && visita.responsable) {
          const key = `${visita.tipificacion}_${visita.responsable}`;
          
          if (!contadorTipificaciones[key]) {
            contadorTipificaciones[key] = {
              tipificacion: this.getTextoTipificacion(visita.tipificacion),
              responsabilidad: visita.responsable,
              total: 0
            };
          }
          contadorTipificaciones[key].total++;
        }
      });
      
      // Convertir a array y ordenar
      const resultado = Object.values(contadorTipificaciones)
        .sort((a, b) => a.tipificacion.localeCompare(b.tipificacion));
      
      console.log(`Procesadas ${resultado.length} tipificaciones con totales por responsable`);
      return resultado;
    } catch (error) {
      console.error('Error obteniendo tipificaciones con totales:', error);
      return [];
    }
  }

  // Obtener anexos revisados por distrito fiscal
  static async obtenerAnexosPorDistrito() {
    try {
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando anexos por distrito fiscal para usuario:', auth.currentUser.email);
      
      // Obtener todas las visitas
      const visitas = await VisitasService.obtenerVisitas();
      
      // Contar anexos por distrito fiscal
      const contadorDistritos = {};
      
      visitas.forEach(visita => {
        if (visita.distritoFiscal) {
          const distrito = visita.distritoFiscal;
          
          if (!contadorDistritos[distrito]) {
            contadorDistritos[distrito] = {
              distrito: distrito,
              totalAnexos: 0
            };
          }
          contadorDistritos[distrito].totalAnexos++;
        }
      });
      
      // Convertir a array y ordenar por distrito
      const resultado = Object.values(contadorDistritos)
        .sort((a, b) => a.distrito.localeCompare(b.distrito));
      
      console.log(`Procesados ${resultado.length} distritos fiscales con totales de anexos`);
      return resultado;
    } catch (error) {
      console.error('Error obteniendo anexos por distrito:', error);
      return [];
    }
  }

  // Obtener anexos por mes y distrito fiscal
  static async obtenerAnexosPorMesYDistrito() {
    try {
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando anexos por mes y distrito fiscal para usuario:', auth.currentUser.email);
      
      // Obtener todas las visitas
      const visitas = await VisitasService.obtenerVisitas();
      
      // Agrupar distritos fiscales por mes y contar anexos por mes-distrito
      const contadorMesDistrito = {};
      
      visitas.forEach(visita => {
        if (visita.distritoFiscal && visita.fechaRevision) {
          try {
            // Extraer mes y año de la fecha - manejar diferentes formatos
            let fecha;
            if (visita.fechaRevision.seconds) {
              // Timestamp de Firebase
              fecha = new Date(visita.fechaRevision.seconds * 1000);
            } else if (typeof visita.fechaRevision === 'string') {
              // String de fecha - formato DD/MM/YYYY
              const [dia, mes, año] = visita.fechaRevision.split('/');
              fecha = new Date(año, mes - 1, dia);
            } else {
              // Objeto Date
              fecha = new Date(visita.fechaRevision);
            }
            
            // Verificar que la fecha sea válida
            if (isNaN(fecha.getTime())) {
              console.warn('Fecha inválida encontrada:', visita.fechaRevision);
              return;
            }
            
            const año = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const mesFormateado = `${año}/${mes}`;
            const distrito = visita.distritoFiscal;
            const key = `${mesFormateado}_${distrito}`;
            
            // Contar anexos por mes y distrito
            if (!contadorMesDistrito[key]) {
              contadorMesDistrito[key] = {
                mes: mesFormateado,
                distrito: distrito,
                totalAnexos: 0
              };
            }
            contadorMesDistrito[key].totalAnexos++;
            
          } catch (error) {
            console.warn('Error procesando fecha:', visita.fechaRevision, error);
          }
        }
      });
      
      // Convertir a array y ordenar por mes, luego por distrito
      const resultado = Object.values(contadorMesDistrito)
        .sort((a, b) => {
          // Primero ordenar por mes, luego por distrito
          const mesComparison = a.mes.localeCompare(b.mes);
          if (mesComparison !== 0) {
            return mesComparison;
          }
          return a.distrito.localeCompare(b.distrito);
        });
      
      console.log(`Procesados ${resultado.length} registros de anexos por mes y distrito`);
      return resultado;
    } catch (error) {
      console.error('Error obteniendo anexos por mes y distrito:', error);
      return [];
    }
  }

  // Obtener anexos agrupados por mes para gráfico
  static async obtenerAnexosPorMes() {
    try {
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando anexos por mes para gráfico para usuario:', auth.currentUser.email);
      
      // Obtener todas las visitas
      const visitas = await VisitasService.obtenerVisitas();
      
      // Contar anexos por mes
      const contadorPorMes = {};
      
      visitas.forEach(visita => {
        if (visita.fechaRevision) {
          try {
            // Extraer mes y año de la fecha - manejar diferentes formatos
            let fecha;
            if (visita.fechaRevision.seconds) {
              // Timestamp de Firebase
              fecha = new Date(visita.fechaRevision.seconds * 1000);
            } else if (typeof visita.fechaRevision === 'string') {
              // String de fecha - formato DD/MM/YYYY
              const [dia, mes, año] = visita.fechaRevision.split('/');
              fecha = new Date(año, mes - 1, dia);
            } else {
              // Objeto Date
              fecha = new Date(visita.fechaRevision);
            }
            
            // Verificar que la fecha sea válida
            if (isNaN(fecha.getTime())) {
              console.warn('Fecha inválida encontrada:', visita.fechaRevision);
              return;
            }
            
            const año = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const mesFormateado = `${año}/${mes}`;
            
            // Contar anexos por mes
            if (!contadorPorMes[mesFormateado]) {
              contadorPorMes[mesFormateado] = 0;
            }
            contadorPorMes[mesFormateado]++;
            
          } catch (error) {
            console.warn('Error procesando fecha:', visita.fechaRevision, error);
          }
        }
      });
      
      // Convertir a array y ordenar por mes
      const resultado = Object.entries(contadorPorMes)
        .map(([mes, total]) => ({ mes, total }))
        .sort((a, b) => a.mes.localeCompare(b.mes));
      
      console.log(`Procesados ${resultado.length} meses con anexos para gráfico`);
      return resultado;
    } catch (error) {
      console.error('Error obteniendo anexos por mes:', error);
      return [];
    }
  }

  // Obtener anexos agrupados por modelo para gráfico
  static async obtenerAnexosPorModelo() {
    try {
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando anexos por modelo para gráfico para usuario:', auth.currentUser.email);
      
      // Obtener todas las visitas
      const visitas = await VisitasService.obtenerVisitas();
      
      // Contar anexos por modelo
      const contadorPorModelo = {};
      
      visitas.forEach(visita => {
        if (visita.modelo) {
          const modelo = visita.modelo;
          
          // Contar anexos por modelo
          if (!contadorPorModelo[modelo]) {
            contadorPorModelo[modelo] = 0;
          }
          contadorPorModelo[modelo]++;
        }
      });
      
      // Convertir a array y ordenar por cantidad (descendente)
      const resultado = Object.entries(contadorPorModelo)
        .map(([modelo, total]) => ({ modelo, total }))
        .sort((a, b) => b.total - a.total);
      
      console.log(`Procesados ${resultado.length} modelos con anexos para gráfico`);
      return resultado;
    } catch (error) {
      console.error('Error obteniendo anexos por modelo:', error);
      return [];
    }
  }

  // Obtener porcentajes por responsabilidad para gráfico de torta
  static async obtenerPorcentajesPorResponsabilidad() {
    try {
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando porcentajes por responsabilidad para gráfico de torta para usuario:', auth.currentUser.email);
      
      // Obtener todas las visitas
      const visitas = await VisitasService.obtenerVisitas();
      
      // Contar por responsabilidad
      const contadorPorResponsabilidad = {};
      let totalVisitas = 0;
      
      visitas.forEach(visita => {
        if (visita.responsable) {
          const responsable = visita.responsable;
          console.log('Responsable encontrado en DB:', `"${responsable}"`, 'Tipo:', typeof responsable);
          
          if (!contadorPorResponsabilidad[responsable]) {
            contadorPorResponsabilidad[responsable] = 0;
          }
          contadorPorResponsabilidad[responsable]++;
          totalVisitas++;
        }
      });
      
      // Convertir a array con porcentajes
      const resultado = Object.entries(contadorPorResponsabilidad)
        .map(([responsabilidad, total]) => ({
          responsabilidad,
          total,
          porcentaje: ((total / totalVisitas) * 100).toFixed(1)
        }))
        .sort((a, b) => b.total - a.total);
      
      console.log(`Procesados ${resultado.length} responsabilidades con porcentajes para gráfico de torta`);
      return resultado;
    } catch (error) {
      console.error('Error obteniendo porcentajes por responsabilidad:', error);
      return [];
    }
  }

  // Convertir value de tipificación a texto legible
  static getTextoTipificacion(value) {
    const tipificacion = TIPIFICACIONES.find(t => t.value === value);
    return tipificacion ? tipificacion.text : value;
  }

}

export default IndicadoresService;