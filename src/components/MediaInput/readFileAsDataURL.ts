export async function readFileAsDataURL(
  file: File,
): Promise<{ result?: string; error?: string }> {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (reader.result) {
        resolve({ result: reader.result as string });
      }
    });

    reader.addEventListener('error', () => {
      if (reader.error) {
        resolve({ error: reader.error.message as string });
      }
    });

    reader.readAsDataURL(file);
  });
}
