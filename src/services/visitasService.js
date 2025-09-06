import { db, auth } from '../utils/firebase';
import { Environment } from '../config/environment';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';

// Configuración de colección según ambiente
const COLLECTION_NAME = Environment.getCollectionName('visitas');

// Log de información del ambiente
Environment.logEnvironmentInfo(COLLECTION_NAME);

export class VisitasService {
  
  // Obtener todas las visitas
  static async obtenerVisitas() {
    try {
      // Verificar autenticación
      if (!auth.currentUser) {
        console.log('Usuario no autenticado, retornando array vacío');
        return [];
      }

      console.log('Cargando visitas para usuario:', auth.currentUser.email);
      
      const q = query(
        collection(db, COLLECTION_NAME), 
        orderBy('fechaCreacion', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const visitas = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        visitas.push({
          ...data,
          id: doc.id  // Asignar el ID después del spread para que no se sobrescriba
        });
      });
      
      console.log(`Cargadas ${visitas.length} visitas`);
      return visitas;
    } catch (error) {
      console.error('Error obteniendo visitas:', error);
      
      if (error.code === 'permission-denied') {
        throw new Error('❌ PERMISOS INSUFICIENTES: Configura las reglas de Firestore en la consola de Firebase. Ve a Firestore Database > Reglas y permite acceso a usuarios autenticados.');
      } else if (error.code === 'unauthenticated') {
        throw new Error('🔐 NO AUTENTICADO: Debes iniciar sesión para ver los registros.');
      } else {
        throw new Error(`Error al cargar las visitas: ${error.message}`);
      }
    }
  }

  // Crear nueva visita
  static async crearVisita(visitaData) {
    try {
      // Verificar autenticación
      if (!auth.currentUser) {
        throw new Error('Usuario no autenticado');
      }

      // Eliminar el campo id de los datos antes de guardar
      const { id, ...datosLimpios } = visitaData;
      
      const nuevaVisita = {
        ...datosLimpios,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        fechaCreacion: serverTimestamp(),
        fechaActualizacion: serverTimestamp()
      };
      
      console.log('Intentando crear visita:', nuevaVisita);
      const docRef = await addDoc(collection(db, COLLECTION_NAME), nuevaVisita);
      console.log('Visita creada con ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...nuevaVisita
      };
    } catch (error) {
      console.error('Error detallado creando visita:', error);
      
      // Manejar diferentes tipos de errores
      if (error.code === 'permission-denied') {
        throw new Error('❌ PERMISOS INSUFICIENTES: Configura las reglas de Firestore en la consola de Firebase. Ve a Firestore Database > Reglas y permite acceso a usuarios autenticados.');
      } else if (error.code === 'unauthenticated') {
        throw new Error('🔐 NO AUTENTICADO: Debes iniciar sesión para crear registros.');
      } else if (error.message === 'Usuario no autenticado') {
        throw error;
      } else {
        throw new Error(`Error al crear la visita: ${error.message}`);
      }
    }
  }

  // Actualizar visita existente
  static async actualizarVisita(id, visitaData) {
    try {
      // Verificar autenticación
      if (!auth.currentUser) {
        throw new Error('Usuario no autenticado');
      }

      // Validar que el ID no sea null o undefined
      if (!id || id.trim() === '') {
        throw new Error('ID de visita inválido o no proporcionado');
      }

      const visitaRef = doc(db, COLLECTION_NAME, id);
      
      // Preparar datos para actualización (sin incluir campos que no deben cambiar)
      const { id: visitaId, fechaCreacion, userId, userEmail, ...datosParaActualizar } = visitaData;
      
      const datosActualizados = {
        ...datosParaActualizar,
        fechaActualizacion: serverTimestamp(),
        // Mantener información del usuario original si existe, sino usar el actual
        userId: visitaData.userId || auth.currentUser.uid,
        userEmail: visitaData.userEmail || auth.currentUser.email
      };
      
      console.log('Actualizando visita con ID:', id);
      console.log('Datos a actualizar:', datosActualizados);
      
      await updateDoc(visitaRef, datosActualizados);
      
      console.log('Visita actualizada exitosamente');
      
      return {
        id,
        ...visitaData, // Mantener todos los datos originales
        ...datosActualizados // Sobrescribir con los actualizados
      };
    } catch (error) {
      console.error('Error detallado actualizando visita:', error);
      
      // Manejar diferentes tipos de errores
      if (error.code === 'permission-denied') {
        throw new Error('❌ PERMISOS INSUFICIENTES: No tienes permisos para actualizar este registro.');
      } else if (error.code === 'not-found') {
        throw new Error('📄 REGISTRO NO ENCONTRADO: La visita que intentas actualizar no existe.');
      } else if (error.code === 'unauthenticated') {
        throw new Error('🔐 NO AUTENTICADO: Debes iniciar sesión para actualizar registros.');
      } else if (error.message === 'Usuario no autenticado') {
        throw error;
      } else {
        throw new Error(`Error al actualizar la visita: ${error.message}`);
      }
    }
  }

  // Obtener una visita específica por ID
  static async obtenerVisitaPorId(id) {
    try {
      // Verificar autenticación
      if (!auth.currentUser) {
        throw new Error('Usuario no autenticado');
      }

      if (!id || id.trim() === '') {
        throw new Error('ID de visita inválido');
      }

      console.log('Obteniendo visita con ID:', id);
      
      const visitaRef = doc(db, COLLECTION_NAME, id);
      const visitaSnap = await getDoc(visitaRef);
      
      if (!visitaSnap.exists()) {
        throw new Error('Visita no encontrada');
      }

      const visitaData = visitaSnap.data();
      console.log('✅ Visita encontrada:', visitaData);
      
      return {
        id: visitaSnap.id,
        ...visitaData
      };
    } catch (error) {
      console.error('Error obteniendo visita por ID:', error);
      
      if (error.code === 'permission-denied') {
        throw new Error('❌ PERMISOS INSUFICIENTES: No tienes permisos para leer este registro.');
      } else if (error.code === 'not-found') {
        throw new Error('📄 REGISTRO NO ENCONTRADO: La visita solicitada no existe.');
      } else if (error.message === 'Usuario no autenticado' || error.message === 'ID de visita inválido') {
        throw error;
      } else {
        throw new Error(`Error al obtener la visita: ${error.message}`);
      }
    }
  }

  // Eliminar visita
  static async eliminarVisita(id) {
    try {
      // Verificar autenticación
      if (!auth.currentUser) {
        throw new Error('Usuario no autenticado');
      }

      // Validar que el ID no esté vacío
      if (!id || id.trim() === '') {
        throw new Error('ID de visita inválido');
      }

      console.log('Eliminando visita con ID:', id);
      console.log('Usuario que elimina:', auth.currentUser.email);
      
      const visitaRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(visitaRef);
      
      console.log('✅ Visita eliminada exitosamente');
      return true;
    } catch (error) {
      console.error('Error detallado eliminando visita:', error);
      
      // Manejar diferentes tipos de errores
      if (error.code === 'permission-denied') {
        throw new Error('❌ PERMISOS INSUFICIENTES: No tienes permisos para eliminar este registro.');
      } else if (error.code === 'not-found') {
        throw new Error('📄 REGISTRO NO ENCONTRADO: La visita que intentas eliminar no existe o ya fue eliminada.');
      } else if (error.code === 'unauthenticated') {
        throw new Error('🔐 NO AUTENTICADO: Debes iniciar sesión para eliminar registros.');
      } else if (error.message === 'Usuario no autenticado') {
        throw error;
      } else if (error.message === 'ID de visita inválido') {
        throw error;
      } else {
        throw new Error(`Error al eliminar la visita: ${error.message}`);
      }
    }
  }

  // Buscar visitas por filtros
  static async buscarVisitas(filtros = {}) {
    try {
      let q = collection(db, COLLECTION_NAME);
      
      // Aplicar filtros si existen
      if (filtros.distritoFiscal) {
        q = query(q, where('distritoFiscal', '==', filtros.distritoFiscal));
      }
      
      if (filtros.responsable) {
        q = query(q, where('responsable', '==', filtros.responsable));
      }
      
      if (filtros.tipificacion) {
        q = query(q, where('tipificacion', '==', filtros.tipificacion));
      }
      
      // Ordenar por fecha de creación
      q = query(q, orderBy('fechaCreacion', 'desc'));
      
      const querySnapshot = await getDocs(q);
      
      const visitas = [];
      querySnapshot.forEach((doc) => {
        visitas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return visitas;
    } catch (error) {
      console.error('Error buscando visitas:', error);
      throw new Error('Error al buscar las visitas');
    }
  }

  // Obtener estadísticas básicas
  static async obtenerEstadisticas() {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      
      let totalVisitas = 0;
      let visitasActivas = 0;
      let visitasInactivas = 0;
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalVisitas++;
        
        if (data.estadoFinal) {
          visitasActivas++;
        } else {
          visitasInactivas++;
        }
      });
      
      return {
        totalVisitas,
        visitasActivas,
        visitasInactivas
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw new Error('Error al obtener estadísticas');
    }
  }


}

export default VisitasService;
