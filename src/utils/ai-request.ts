import axios from 'axios';
import { LoggerServiceImplementation } from '../logger/logger.service';

const logger = new LoggerServiceImplementation(); // Створюємо глобальний логер

export async function makeRequest(url: string, data: any, headers: any = {}) {
  logger.log(`Sending request to ${url} with data: ${JSON.stringify(data)}`);

  try {
    const response = await axios.post(url, data, { headers });
    logger.log(
      `Response received from ${url}: ${JSON.stringify(response.data)}`,
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response
      ? `Server responded with error: ${JSON.stringify(error.response.data)}`
      : `Request failed: ${error.message}`;

    logger.error(errorMessage, error.stack);
    throw error;
  }
}
