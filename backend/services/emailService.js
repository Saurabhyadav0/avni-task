import transporter, { sendMail } from '../config/mailer.js';
import logger from '../utils/logger.js';

const MAIL_FROM = process.env.MAIL_FROM || process.env.MAIL_USER;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const sendDocumentShareEmail = async ({ to, document, role, inviter }) => {
    if (!transporter) {
        throw new Error('Email transporter is not configured');
    }

    const documentUrl = `${CLIENT_URL}/file/${document._id}`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Mini Drive</h2>
      <p>Hi there,</p>
      <p><strong>${inviter?.name || 'A user'}</strong> (${inviter?.email}) shared a file with you on Mini Drive.</p>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>File:</strong> ${document.name}</p>
        <p style="margin: 5px 0;"><strong>Access Level:</strong> ${role.toUpperCase()}</p>
      </div>

      <p>You can open the file using the link below:</p>
      <p>
        <a href="${documentUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Open File
        </a>
      </p>
      
      <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
        If you don't have an account yet, please sign up using this email address to access the file.
      </p>
      <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="font-size: 12px; color: #9ca3af;">Mini Drive - Secure File Sharing</p>
    </div>
  `;

    const message = {
        from: `"Mini Drive" <${MAIL_FROM}>`,
        to,
        subject: `${inviter?.name || 'A user'} shared "${document.name}" with you`,
        html,
    };

    try {
        const info = await sendMail(message);
        logger.info(`Document share email sent: ${info.messageId}`, { service: 'mini-drive-mailer', to });
        return info;
    } catch (error) {
        logger.error(`Error sending email: ${error.message}`, { service: 'mini-drive-mailer', error });
        throw error;
    }
};

export { sendDocumentShareEmail };