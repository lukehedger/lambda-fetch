/**
 * lambda-fetch - A lightweight fetch wrapper for AWS Lambda functions
 */

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Makes an HTTP request with the given URL and options
 * @param url - The URL to fetch
 * @param options - Optional configuration options
 * @returns Promise resolving to the Response object
 */
export async function fetch(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await globalThis.fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
    
    throw new Error('An unknown error occurred during fetch');
  }
}

export default fetch;
