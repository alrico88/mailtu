type Recipients = string | string[];

export interface AdditionalFieldsOptions {
  cc?: Recipients,
  bcc?: Recipients,
  subject?: string,
  body?: string
}

const fields = ['cc', 'bcc', 'subject', 'body'] as const;

function encodeAddresses(addresses: Recipients): string {
  // '@' is allowed as-is in mailto addresses (RFC 6068), keep it readable
  return ([] as string[])
    .concat(addresses)
    .filter(Boolean)
    .map((address) => encodeURIComponent(address).replace(/%40/g, '@'))
    .join(',');
}

function encodeText(text: string): string {
  // RFC 6068 requires line breaks to be encoded as CRLF
  return encodeURIComponent(text.replace(/\r?\n/g, '\r\n'));
}

/**
 * Creates a mailto: link
 *
 * @export
 * @param {Recipients} [to] Address or addresses to send email to
 * @param {AdditionalFieldsOptions} [additionalFields] Additional fields to fill
 * @return {string} The resulting mailto: link
 */
export function createMailTo(
  to: Recipients = [],
  additionalFields: AdditionalFieldsOptions = {},
): string {
  const queries: string[] = [];

  fields.forEach((field) => {
    const val = additionalFields[field];

    if (val === undefined) {
      return;
    }

    const encoded = typeof val === 'string' && (field === 'subject' || field === 'body')
      ? encodeText(val)
      : encodeAddresses(val);

    if (encoded) {
      queries.push(`${field}=${encoded}`);
    }
  });

  const str = `mailto:${encodeAddresses(to)}`;

  return queries.length ? `${str}?${queries.join('&')}` : str;
}
