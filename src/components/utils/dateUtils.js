

/**
 * Hàm định dạng thời gian dùng chung
 * @param {number|string|Date} [dateInput=Date.now()]
 * @param {string} [format='DD/MM/YYYY HH:mm:ss']
 */
export const formatDate = (dateInput = Date.now(), format = 'DD/MM/YYYY HH:mm:ss') => {
    if (!dateInput) return '';
  
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      return 'Ngày không hợp lệ';
    }
  
    const pad = (num) => String(num).padStart(2, '0');
  
    const map = {
      YYYY: date.getFullYear(),
      MM: pad(date.getMonth() + 1),
      DD: pad(date.getDate()),
      HH: pad(date.getHours()),
      mm: pad(date.getMinutes()),
      ss: pad(date.getSeconds()),
    };
  
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (matched) => map[matched]);
  };