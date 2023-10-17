import readXlsxFile from "read-excel-file";

export const useUploadSection = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      readXlsxFile(file)
        .then((rows) => {
          console.log(rows); // You can work with the data here
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return {
    handleFileUpload,
  };
};
