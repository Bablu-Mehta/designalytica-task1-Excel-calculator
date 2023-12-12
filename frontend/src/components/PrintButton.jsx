import React from 'react';
import axios from 'axios';

const PrintButton = () => {
  const handlePrint = () => {
    axios.get('http://localhost:5000/print', { responseType: 'blob' })
      .then((response) => {
        const file = new Blob(
          [response.data], 
          { type: 'application/pdf' }
        );

        const fileURL = URL.createObjectURL(file);

        window.open(fileURL);

        // If you want to download instead of opening in new tab
        // const fileLink = document.createElement('a');
        // fileLink.href = fileURL;
        // fileLink.setAttribute('download', 'file.pdf');
        // document.body.appendChild(fileLink);
        // fileLink.click();
      })
      .catch(error => {
        console.error('Error fetching the PDF:', error);
      });
  };

  return <button className='btn-print' onClick={handlePrint}>Print PDF</button>;
};

export default PrintButton;