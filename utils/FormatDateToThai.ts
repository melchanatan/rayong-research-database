const formatDateToThai = (dateStr: string) => {
    console.log(dateStr)
    const dateObj = new Date(dateStr);
    console.log(dateObj)

  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];

  const day = dateObj.getDate();
  const month = thaiMonths[dateObj.getMonth()];
  const year = dateObj.getFullYear() + 543; // Add 543 to convert to Buddhist Era

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate
}

export default formatDateToThai;