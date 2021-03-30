// serverside

const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}
// create a transport for the nodemailer
// and also you dont need to hard code it so basically you will use the env file

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // check if data is coming from usePizza
  // bascially can be done by event.body
  const body = JSON.parse(event.body);
  // check if they have filled the maplesyrup
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Boop beepp bop zzsst good bye EEROORR CODE 34234',
      }),
    };
  }
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`check that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: ` oppps you are missing the ${field} field`,
        }),
      };
    }
  }
  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `why would you order nothing`,
      }),
    };
  }
  // send the email message
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
  // send the success or error message
};

// // // we create here handler in this file basically handler are node js ////amazon  serverless function under the hoods its the amazon lambda
// exports.handler = async (event, context) => {
//   // test send an email basically i am sending the  temp email with the transporter and send the temporary for the checking that the services are running
//   const info = await transporter.sendMail({
//     from: 'Slick Slices <slick@example.com>',
//     to: 'orders@example.com',
//     subject: 'New Order!',
//     html: `<p>Your New Pizza Order is here</p>`,
//   });
//   return {
//     statusCode: 200,
//     body: JSON.stringify(info),
//   };
// };
