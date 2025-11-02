/**
 * Formatea una fecha a DD/MM/YYYY directamente desde string
 * Sin usar objetos Date para evitar problemas de zona horaria
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada como DD/MM/YYYY
 */
export function formatDateLocal(dateString) {
  if (!dateString) return "";
  
  // Validar formato YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return "";
  
  // Convertir directamente de YYYY-MM-DD a DD/MM/YYYY
  const [año, mes, dia] = dateString.split('-');
  
  // Validar que las partes sean números válidos
  if (!año || !mes || !dia) return "";
  
  return `${dia}/${mes}/${año}`;
}
