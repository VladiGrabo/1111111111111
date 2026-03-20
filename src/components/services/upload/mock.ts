export async function mockUploadChunk(
  chunk: Blob,
  chunkIndex: number,
  totalChunks: number
): Promise<{ success: boolean }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate random failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Симуляция ошибки сети');
  }

  // Simulate successful upload
  return { success: true };
}