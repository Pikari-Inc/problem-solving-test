# Welcome 😃

Here's a little sample project to test your problem solving skills.

- [Welcome 😃](#welcome-)
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Additional Information](#additional-information)
- [App Directory Structure](#app-directory-structure)
- [Extra Credit](#extra-credit)

# Overview

There's a bug in this application! Customers are complaining that clicking on the `Pay Now` button doesn't always work. Your job is to figure out the problem and implement a fix so we can keep the money flowing!

# Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**To get rolling:**

- [ ] Clone this repo 'git clone`
- [ ] Run `npm install`
- [ ] Fire up the development server with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.

# Additional Information

- This app uses [WiPay](https://www.wipaycaribbean.com/credit-card-api) for the payment gateway. All environment variables have been setup already, but you can view the [documentation](https://www.wipaycaribbean.com/credit-card-api) as needed. The service is a bit on the slow side so be patient with it.
  - You may use the test credit card below to confirm that the transaction was a success
    ```
    Card number: 4111111111111111
    Card CCV: 123
    Expiry Month: 01
    Expiry Year: 25
    ```

# App Directory Structure

The problem resides in the `/src` directory so don't go messing around with anything else.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/transactions/invoices/getInvoicesByUser/1](http://localhost:3000/api/transactions/invoices/getInvoicesByUser/1). This endpoint can be edited in `pages/api/transactions/invoices/getInvoicesByUser/[id].js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Extra Credit

- Do you have any suggestions on how we could have improved this experience for our customers?
