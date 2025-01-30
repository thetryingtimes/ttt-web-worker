export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(
        String(reader.result).replace('data:application/pdf;base64,', '')
      );
    reader.onerror = (error) => reject(error);
  });
};

export const filesToBase64 = async (files: File[]): Promise<string[]> => {
  try {
    const base64Promises = files.map((file) => fileToBase64(file));
    return await Promise.all(base64Promises);
  } catch (error) {
    throw new Error(`Error converting files to base64: ${error}`);
  }
};
