import PDFDocument from 'pdfkit';
import fs from 'fs';
import User from '../user/user.model.js';

export const generateInvoicePDF = async (invoice, invoiceItems, totals, filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const document = new PDFDocument();
            document.pipe(fs.createWriteStream(filePath));

            const user = await User.findById(invoice.userId);

            if (!user) {
                reject(new Error('User not found'));
                return;
            }

            document.fontSize(18).text('Invoice', { align: 'center' });
            document.fontSize(12).text(`User Name: ${user.name}`, { align: 'center' });
            document.text(`Date: ${new Date().toLocaleDateString()}`);
            document.text(`User ID: ${invoice.userId}`);
            document.text('-----------------------------------');
            document.text('Items:', { underline: true });

            invoiceItems.forEach((item, index) => {
                document.text(`${index + 1}. ${item.productId.name} ------------- Quantity: ${item.quantity} ------------- Price: $${item.price}`);
            });

            document.text('-----------------------------------');
            document.text(`Total Price: $${totals}`);

            document.end();

            resolve({
                success: true,
                message: 'Invoice PDF generated successfully',
                filePath: filePath,
            });

            reject({
                success: false,
                message: 'Error generating the PDF',
                error: err,
            });

        } catch (err) {
            reject({
                success: false,
                message: 'Error occurred during PDF generation',
                error: err,
            });
        }
    });
};
