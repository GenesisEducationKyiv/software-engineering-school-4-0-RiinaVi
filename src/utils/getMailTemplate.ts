const getMailTemplate = (rateValue: number, unsubscribeUrl: string): string => `
  <div style="font-size: 20px; text-align: center">
    <p>Hello, if you see this email, then you have previously subscribed to our updates.</p>
    <hr>
    <p>Current USD to UAH exchange rate is: </p>
    <p style="font-weight: bold; background: #dedede; padding: 22px">₴${rateValue}</p>
    <p style="float: right; font-size: 18px;">Don't want to hear from us anymore? <br>You may&nbsp;<a href=${unsubscribeUrl} style="color: black;">unsubscribe</a></p>
  </div>
`;

export default getMailTemplate;
