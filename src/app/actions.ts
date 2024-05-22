'use server';

import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { signUpService } from '@/services/axios';
import { AppRoutes } from '@/constants/routes';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { i18n, Locale } from '@/i18n-config';
import { getSignUpSchema } from '@/validation';
export interface ErrorMessages {
  [key: string]: string[];
}

const specificClientErrorMessages: { [key: number]: string } = {
  400: 'Bad Request: The server could not understand the request due to invalid syntax.',
  401: 'Unauthorized: You are not authorized to view the requested file.',
  402: 'Payment Required: Payment is needed to access the resource.',
  403: 'Forbidden: You do not have the permissions to access this resource.',
  404: 'Not Found: The requested resource was not found on this server.',
  405: 'Method Not Allowed: The method specified in the request is not allowed.',
  406: 'Not Acceptable: The resource is capable of generating only content not acceptable according to the Accept headers sent in the request.',
  407: 'Proxy Authentication Required: You must authenticate with a proxy server before this request can be served.',
  408: 'Request Timeout: The request took longer than the server was prepared to wait.',
  409: 'Conflict: The request could not be processed because of conflict in the request.',
  410: 'Gone: The resource requested is no longer available and will not be available again.',
  411: 'Length Required: The request did not specify the length of its content, which is required by the requested resource.',
  412: 'Precondition Failed: The server does not meet one of the preconditions that the requester put on the request.',
  413: 'Payload Too Large: The request is larger than the server is willing or able to process.',
  414: 'URI Too Long: The URI provided was too long for the server to process.',
  415: 'Unsupported Media Type: The request entity has a media type which the server or resource does not support.',
  416: 'Range Not Satisfiable: The portion of the requested file cannot be supplied by the server.',
  417: 'Expectation Failed: The server cannot meet the requirements of the Expect request-header field.',
  418: "I'm a teapot: I refuse to brew coffee because I am, permanently, a teapot.",
  421: 'Misdirected Request: The request was directed at a server that is not able to produce a response.',
  422: 'Unprocessable Content: The request was well-formed but was unable to be followed due to semantic errors.',
  423: 'Locked: The resource that is being accessed is locked.',
  424: 'Failed Dependency: The request failed due to failure of a previous request.',
  425: 'Too Early: Indicates that the server is unwilling to risk processing a request that might be replayed.',
  426: 'Upgrade Required: The client should switch to a different protocol such as TLS/1.3, given in the Upgrade header field.',
};

const specificServerErrorMessages: { [key: number]: string } = {
  500: 'Internal Server Error: The server has encountered a situation it does not know how to handle.',
  501: 'Not Implemented: The request method is not supported by the server and cannot be handled.',
  502: 'Bad Gateway: This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
  503: 'Service Unavailable: The server is not ready to handle the request.',
  504: 'Gateway Timeout: This error response is given when the server is acting as a gateway and cannot get a response in time.',
  505: 'HTTP Version Not Supported: The HTTP version used in the request is not supported by the server.',
  506: 'Variant Also Negotiates: The server has an internal configuration error.',
  507: 'Insufficient Storage (WebDAV).',
  508: 'Loop Detected (WebDAV): The server detected an infinite loop while processing the request.',
  510: 'Not Extended: Further extensions to the request are required for the server to fulfill it.',
  511: 'Network Authentication Required: Indicates that the client needs to authenticate to gain network access.',
};

const generateErrorMessage = (statusCode: number) => {
  const clientErrorMessage = specificClientErrorMessages[statusCode];
  const serverErrorMessage = specificServerErrorMessages[statusCode];

  if (statusCode >= 400 && statusCode < 500) {
    return clientErrorMessage || 'Client Error: Your request cannot be processed.';
  } else if (statusCode >= 500 && statusCode < 600) {
    return serverErrorMessage || 'Server Error: An error occurred on our server.';
  }

  return 'Unknown Error: An unexpected error occurred.';
};

export const registerAction = async (formData: FormData, locale: Locale) => {
  const translations = await getAllTranslations(locale);
  console.log('Translations: ', translations);
  const translationFunction = getTranslation(translations);
  const authTranslation = translationFunction('auth');
  console.log('Auth Translations: ', authTranslation);
  console.log('EMAIL: ', formData.get('email'));
  console.log(`Email ${formData.get('email')} is already in use.`);
  const credentials = Object.fromEntries(formData);
  console.log('CREDENTIALS:', credentials);
  const SignUpSchema = getSignUpSchema(authTranslation);
  const validatedFields = SignUpSchema.safeParse({
    ...credentials,
  });
  console.log('ValidatedFields! ', validatedFields);
  if (!validatedFields.success) {
    const errors: ErrorMessages = {};
    validatedFields.error.issues.forEach(issue => {
      if (!errors[issue.path[0]]) {
        errors[issue.path[0]] = [];
      }
      errors[issue.path[0]].push(issue.message);
    });
    console.log(validatedFields.error.issues);
    console.log(errors);
    return { errors: errors };
  }
  try {
    const result = await signUpService(credentials);
    console.log('Form submitted successfully:', result.data);
    if (result?.data) {
      return {
        success: authTranslation.registration.success,
      };
    }
  } catch (error: unknown) {
    console.error('Error submitting form:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error submitting form:', error.message);
      if (error.response) {
        console.log('Error data:', error.response.data);
        if (error.response.status >= 400) {
          console.log(error.response.data);
          return { submitError: generateErrorMessage(error.response.status) };
        }
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
