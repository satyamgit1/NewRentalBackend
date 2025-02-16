import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendLowStockAlert = async (clothes) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'Low Stock Alert!',
      html: `
        <h3>Low Stock Alert for ${clothes.name}</h3>
        <p>Product: ${clothes.productName}</p>
        <p>Current Quantity: ${clothes.quantity}</p>
        <p>Please restock soon!</p>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};