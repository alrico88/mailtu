import { describe, it, expect } from 'vitest';
import { createMailTo } from '../src';

describe('Test lib', () => {
  it('Should create only the needed fields', () => {
    expect(createMailTo('test@test.com')).toStrictEqual('mailto:test@test.com');
  });

  it('Should concatenate additional fields', () => {
    expect(createMailTo('test@test.com', {
      cc: 'another@email.com',
    })).toStrictEqual('mailto:test@test.com?cc=another@email.com');
  });

  it('Should encode elements safely for URLs', () => {
    expect(createMailTo('to@to.com', {
      cc: 'cc@cc.com',
      bcc: 'bcc@bcc.com',
      subject: 'Subject goes here',
      body: 'Body goes here',
    })).toStrictEqual('mailto:to@to.com?cc=cc@cc.com&bcc=bcc@bcc.com&subject=Subject%20goes%20here&body=Body%20goes%20here');
  });
});
