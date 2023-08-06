function encode(str: string, field: string): string {
  const mustEncodeField = ['subject', 'body'];

  return mustEncodeField.includes(field) ? encodeURIComponent(str) : str;
}

export interface AdditionalFieldsOptions {
  cc?: string,
  bcc?: string,
  subject?: string,
  body?: string
}

/**
 * Creates a mailto: link
 *
 * @export
 * @param {string} to Address to send email to
 * @param {AdditionalFieldsOptions} [additionalFields] Additional fields to fill
 * @return {string} The resulting mailto: link
 */
export function createMailTo(to: string, additionalFields?: AdditionalFieldsOptions): string {
  const str = `mailto:${to}`;

  if (!additionalFields) {
    return str;
  }

  const queries: string[] = [];

  Object.entries(additionalFields).forEach(([key, val]) => {
    queries.push(`${key}=${encode(val, key)}`);
  });

  return `${str}?${queries.join('&')}`;
}
