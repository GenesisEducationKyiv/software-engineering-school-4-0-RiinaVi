/* eslint-disable */
import * as sinon from 'sinon';
import { EmailSendingService } from '../../services/EmailSendingService';
import getRateEmailTemplate from '../../utils/getRateEmailTemplate';
import getUnsubscribeURL from '../../utils/getUnsubscribeURL';
import emailTransporter from '../../utils/emailTransporter';

describe('EmailSendingService', () => {
  let transportedStub: sinon.SinonStub;

  beforeEach(() => {
    transportedStub = sinon.stub(emailTransporter, 'sendMail');
  });

  afterEach(sinon.restore);

  it('should send a currency rate email', async () => {
    const email = 'test@mail.com';
    const rate = 40;
    const emailTemplate = getRateEmailTemplate(rate)(getUnsubscribeURL(email));
    await EmailSendingService.sendEmail(email, emailTemplate);

    expect(transportedStub.calledOnce).toBe(true);
    expect(transportedStub.firstCall.args[0]).toEqual({
      to: email,
      from: process.env.SENDER_EMAIL_ADDRESS,
      subject: 'Current USD to UAH exchange rate',
      html: emailTemplate,
    });
  });
});
