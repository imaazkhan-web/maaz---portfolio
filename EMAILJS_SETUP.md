# 📧 EmailJS Setup Instructions

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a FREE account (no credit card needed)
3. Verify your email

## Step 2: Add Email Service
1. Go to **Email Services** tab
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or any email provider
4. Connect your email: `imaazdev00@gmail.com`
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to **Email Templates** tab
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. Copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `AbCdEf123XyZ`)

## Step 5: Update Portfolio Code
Open `script.js` and replace these 3 values:

```javascript
Line ~420: emailjs.init("YOUR_PUBLIC_KEY");  // Replace with your Public Key

Line ~439-440:
const response = await emailjs.send(
  'YOUR_SERVICE_ID',      // Replace with your Service ID
  'YOUR_TEMPLATE_ID',     // Replace with your Template ID
  formData
)
```

## Step 6: Test
1. Open portfolio: http://localhost:4000
2. Fill contact form
3. Click "Send Message"
4. Check your email inbox!

## ✅ Done!
Your contact form is now 100% working and will deliver emails to: **imaazdev00@gmail.com**

---

## Need Help?
Watch tutorial: https://www.youtube.com/watch?v=dgcYOm8n8ME
Or message me on WhatsApp: +92 333 9334031
