// Vietnamese: Tiện ích dùng chung

export async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  timeoutMessage = 'Yêu cầu quá thời gian'
): Promise<T> {
  let timeoutId: any;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(timeoutMessage)), ms);
  });
  try {
    const result = (await Promise.race([promise, timeout])) as T;
    return result;
  } finally {
    clearTimeout(timeoutId);
  }
}
