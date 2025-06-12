// export const formatMessageTime = (dateString) => {
//   if (!dateString || typeof dateString !== 'string') {
//     return 'Unknown time';
//   }

//   // Nếu có dấu chấm và chữ số mili giây dài hơn 3 chữ số
//   const sanitized = dateString.replace(/(\.\d{3})\d+/, '$1');

//   const date = new Date(sanitized);

//   if (isNaN(date.getTime())) {
//     return 'Invalid time';
//   }

//   return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };


export const formatMessageTime = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return 'Unknown time';
  }

  // Cắt mili giây chỉ giữ lại 3 chữ số sau dấu chấm
  const sanitized = dateString.replace(/(\.\d{3})\d+/, '$1');

  const date = new Date(sanitized);

  if (isNaN(date.getTime())) {
    console.warn("Invalid date after parsing:", sanitized);
    return 'Invalid time';
  }

  // Format: dd/MM/yyyy - HH:mm
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
