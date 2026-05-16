import resend from "./resend";

export async function sendOrderConfirmationEmail({ order }) {
  const {
    customerName,
    customerEmail,
    items,
    totalPrice,
    downPayment,
    monthlyPayment,
    loanTerm,
    interestRate,
    address,
    city,
    country,
    _id,
  } = order;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; color: #fff; font-family: Georgia, serif; text-transform: uppercase; font-weight: 700;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; color: rgba(255,255,255,0.6);">${item.color}</td>
        <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; color: rgba(255,255,255,0.6);">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #1a1a1a; color: #fff; font-weight: 700;">$${(item.price * item.quantity).toLocaleString()}</td>
      </tr>
    `
    )
    .join("");

  const paymentPlanHtml =
    monthlyPayment > 0
      ? `
      <tr>
        <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px;">Down Payment</td>
        <td style="padding: 10px 0; color: #fff; font-weight: 600; font-size: 14px;">$${downPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px;">Loan Term</td>
        <td style="padding: 10px 0; color: #fff; font-weight: 600; font-size: 14px;">${loanTerm} months @ ${interestRate}% APR</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px;">Monthly Payment</td>
        <td style="padding: 10px 0; color: #E31937; font-weight: 700; font-size: 14px;">$${monthlyPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</td>
      </tr>
    `
      : `
      <tr>
        <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 14px;">Payment Type</td>
        <td style="padding: 10px 0; color: #10B981; font-weight: 700; font-size: 14px;">Full Payment</td>
      </tr>
    `;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #000; font-family: Arial, sans-serif;">

      <div style="max-width: 600px; margin: 0 auto; background: #000;">

        <!-- Header -->
        <div style="background: #000; padding: 40px 40px 30px; border-bottom: 1px solid #1a1a1a; text-align: center;">
          <div style="display: inline-flex; align-items: center; gap: 10px; margin-bottom: 20px;">
            <svg width="24" height="24" viewBox="0 0 342 512" fill="white">
              <path d="M0 0l171 512L342 0H216l-45 236L126 0H0zm171 57l36 193H135L171 57z" />
            </svg>
            <span style="font-family: Georgia, serif; color: #fff; font-weight: 700; font-size: 18px; letter-spacing: 6px; text-transform: uppercase;">TESLA</span>
          </div>
          <div style="display: inline-block; padding: 4px 16px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); color: #10B981; font-size: 11px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 20px;">
            Order Confirmed
          </div>
          <h1 style="font-family: Georgia, serif; color: #fff; font-size: 28px; font-weight: 900; text-transform: uppercase; margin: 0 0 10px;">
            Thank You, ${customerName}!
          </h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0; line-height: 1.6;">
            Your order has been received. Payment instructions are below.
          </p>
        </div>

        <!-- Order ID Banner -->
        <div style="background: rgba(227,25,55,0.08); border-top: 1px solid rgba(227,25,55,0.2); border-bottom: 1px solid rgba(227,25,55,0.2); padding: 16px 40px; display: flex; justify-content: space-between; align-items: center;">
          <span style="color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">Order ID</span>
          <span style="color: #fff; font-weight: 700; font-size: 14px; letter-spacing: 1px;">#${_id?.toString().slice(-8).toUpperCase()}</span>
        </div>

        <!-- Items Table -->
        <div style="padding: 30px 40px;">
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 16px;">Your Order</p>
          <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.02); border: 1px solid #1a1a1a;">
            <thead>
              <tr style="background: rgba(255,255,255,0.04);">
                <th style="padding: 12px; text-align: left; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">Model</th>
                <th style="padding: 12px; text-align: left; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">Color</th>
                <th style="padding: 12px; text-align: left; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">Qty</th>
                <th style="padding: 12px; text-align: left; color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Total -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-top: 1px solid #1a1a1a; margin-top: 8px;">
            <span style="color: #fff; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Total</span>
            <span style="color: #fff; font-weight: 900; font-size: 22px;">$${totalPrice?.toLocaleString()}</span>
          </div>
        </div>

        <!-- Payment Plan -->
        <div style="padding: 0 40px 30px;">
          <div style="background: rgba(227,25,55,0.05); border: 1px solid rgba(227,25,55,0.15); padding: 24px;">
            <p style="color: #E31937; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 16px; font-weight: 700;">Payment Plan</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                ${paymentPlanHtml}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Payment Instructions -->
        <div style="padding: 0 40px 30px;">
          <div style="background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.2); padding: 24px;">
            <p style="color: #3B82F6; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px; font-weight: 700;">📧 Payment Instructions</p>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.7; margin: 0 0 12px;">
              Our team will contact you within <strong style="color: #fff;">24 hours</strong> with detailed payment instructions including bank details and payment reference.
            </p>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.7; margin: 0;">
              Please keep your Order ID <strong style="color: #fff;">#${_id?.toString().slice(-8).toUpperCase()}</strong> handy for reference.
            </p>
          </div>
        </div>

        <!-- What Happens Next -->
        <div style="padding: 0 40px 30px;">
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 16px;">What Happens Next</p>
          ${[
            ["01", "You receive payment instructions via email within 24 hours."],
            ["02", "Complete payment using the provided bank details."],
            ["03", "We confirm your payment and begin processing your order."],
            ["04", "Your Tesla is prepared and delivered to your address."],
          ]
            .map(
              ([step, text]) => `
            <div style="display: flex; gap: 16px; margin-bottom: 12px;">
              <span style="color: #E31937; font-weight: 900; font-size: 14px; font-family: Georgia, serif; flex-shrink: 0; min-width: 24px;">${step}</span>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin: 0;">${text}</p>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Delivery Info -->
        <div style="padding: 0 40px 30px;">
          <div style="background: rgba(255,255,255,0.02); border: 1px solid #1a1a1a; padding: 20px;">
            <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px;">Delivery Address</p>
            <p style="color: #fff; font-weight: 600; margin: 0 0 4px; font-size: 14px;">${customerName}</p>
            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0;">${address}, ${city}, ${country}</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 30px 40px; border-top: 1px solid #1a1a1a; text-align: center;">
          <p style="color: rgba(255,255,255,0.2); font-size: 12px; margin: 0 0 8px;">
            © ${new Date().getFullYear()} TeslaStore. All rights reserved.
          </p>
          <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 0;">
            If you have any questions, reply to this email.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: "TeslaStore <orders@teslaapp.xyz>",
    to: customerEmail,
    subject: `Order Confirmed — #${_id?.toString().slice(-8).toUpperCase()} | TeslaStore`,
    html,
  });
}

export async function sendAdminNotificationEmail({ order }) {
  const {
    customerName,
    customerEmail,
    customerPhone,
    items,
    totalPrice,
    downPayment,
    monthlyPayment,
    loanTerm,
    address,
    city,
    country,
    _id,
  } = order;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background: #000; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #000; padding: 40px;">

        <div style="border-bottom: 1px solid #1a1a1a; padding-bottom: 24px; margin-bottom: 24px;">
          <p style="color: #E31937; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">New Order Alert</p>
          <h1 style="font-family: Georgia, serif; color: #fff; font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0;">
            New Order Received
          </h1>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid #1a1a1a; padding: 20px; margin-bottom: 20px;">
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px;">Order Details</p>
          <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Order ID:</strong> #${_id?.toString().slice(-8).toUpperCase()}</p>
          <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Customer:</strong> ${customerName}</p>
          <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Email:</strong> ${customerEmail}</p>
          <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Phone:</strong> ${customerPhone}</p>
          <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Address:</strong> ${address}, ${city}, ${country}</p>
          <p style="color: #fff; font-size: 14px; margin: 0;"><strong>Total:</strong> $${totalPrice?.toLocaleString()}</p>
        </div>

        <div style="background: rgba(255,255,255,0.02); border: 1px solid #1a1a1a; padding: 20px; margin-bottom: 20px;">
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px;">Items Ordered</p>
          ${items.map((item) => `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1a1a1a;">
              <span style="color: #fff; font-size: 14px;">${item.name} — ${item.color} × ${item.quantity}</span>
              <span style="color: #fff; font-weight: 700; font-size: 14px;">$${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          `).join("")}
        </div>

        <div style="background: rgba(227,25,55,0.05); border: 1px solid rgba(227,25,55,0.2); padding: 20px;">
          <p style="color: rgba(255,255,255,0.4); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 12px;">Payment Plan</p>
          <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Down Payment:</strong> $${downPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          ${monthlyPayment > 0 ? `
            <p style="color: #fff; font-size: 14px; margin: 0 0 6px;"><strong>Monthly:</strong> $${monthlyPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo × ${loanTerm} months</p>
          ` : `
            <p style="color: #10B981; font-size: 14px; font-weight: 700; margin: 0;">Full Payment</p>
          `}
        </div>

        <div style="padding-top: 24px; text-align: center;">
          <p style="color: rgba(255,255,255,0.3); font-size: 12px;">
            Log in to admin panel to update order status.
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: "TeslaStore <orders@teslaapp.xyz>",
    to: process.env.ADMIN_EMAIL,
    subject: `🚗 New Order #${_id?.toString().slice(-8).toUpperCase()} — $${totalPrice?.toLocaleString()}`,
    html,
  });
}