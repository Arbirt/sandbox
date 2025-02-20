export const getBatches = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Batch ${i + 1}`,
    b_TemplateName: `Template ${Math.ceil(Math.random() * 5)}`,
    creationUserName: `User${Math.ceil(Math.random() * 10)}`,
    b_CurrentStageTitle: `Stage ${Math.ceil(Math.random() * 5)}`,
    b_CheckOutUserName: `User${Math.ceil(Math.random() * 20)}`,
    b_Status: Math.floor(Math.random() * 4), // 0 to 3
    priority: [0, 5, 10][Math.floor(Math.random() * 3)], // 0, 5, or 10
  }));
  return { data };
};

export const getListOfPages = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i,
  }));
  return { data };
};

export const batchDocumentsNames = [
  "Payment",
  "Cheque",
  "Barcode",
  "MICR",
  "OMR",
];

export const getBatchDocuments = () => {
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `${batchDocumentsNames[Math.ceil(Math.random() * 5) - 1]}_${i + 1}`,
    pageCount: `${Math.ceil(Math.random() * 10) - 1}`,
  }));
  return { data };
};

export const getBatchPages = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    fileName: `page 0000${i + 1}`,
  }));
  return { data };
};
