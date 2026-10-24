import { describe, it, expect } from 'vite-plus/test';
import { createMailTo } from '../src';

describe('Test lib', () => {
  it('Should create only the needed fields', () => {
    expect(createMailTo('test@test.com')).toStrictEqual('mailto:test@test.com');
  });

  it('Should concatenate additional fields', () => {
    expect(
      createMailTo('test@test.com', {
        cc: 'another@email.com',
      }),
    ).toStrictEqual('mailto:test@test.com?cc=another@email.com');
  });

  it('Should encode elements safely for URLs', () => {
    expect(
      createMailTo('to@to.com', {
        cc: 'cc@cc.com',
        bcc: 'bcc@bcc.com',
        subject: 'Subject goes here',
        body: 'Body goes here',
      }),
    ).toStrictEqual(
      'mailto:to@to.com?cc=cc@cc.com&bcc=bcc@bcc.com&subject=Subject%20goes%20here&body=Body%20goes%20here',
    );
  });

  it('Should not add a trailing ? for empty fields', () => {
    expect(createMailTo('to@to.com', {})).toStrictEqual('mailto:to@to.com');
  });

  it('Should skip undefined and empty values', () => {
    expect(
      createMailTo('to@to.com', {
        cc: undefined,
        bcc: '',
        subject: undefined,
        body: 'Hi',
      }),
    ).toStrictEqual('mailto:to@to.com?body=Hi');
  });

  it('Should encode reserved characters in addresses', () => {
    expect(createMailTo('a&b?c#d%e@to.com', { cc: 'x&bcc=evil@cc.com' })).toStrictEqual(
      'mailto:a%26b%3Fc%23d%25e@to.com?cc=x%26bcc%3Devil@cc.com',
    );
  });

  it('Should accept multiple recipients', () => {
    expect(createMailTo(['a@a.com', 'b@b.com'], { cc: ['c@c.com', 'd@d.com'] })).toStrictEqual(
      'mailto:a@a.com,b@b.com?cc=c@c.com,d@d.com',
    );
  });

  it('Should allow links without recipient', () => {
    expect(createMailTo(undefined, { subject: 'Hi' })).toStrictEqual('mailto:?subject=Hi');
  });

  it('Should encode line breaks as CRLF', () => {
    expect(createMailTo('to@to.com', { body: 'a\nb\r\nc' })).toStrictEqual(
      'mailto:to@to.com?body=a%0D%0Ab%0D%0Ac',
    );
  });

  it('Should ignore unknown fields', () => {
    expect(createMailTo('to@to.com', { foo: 'bar' } as never)).toStrictEqual('mailto:to@to.com');
  });
});
