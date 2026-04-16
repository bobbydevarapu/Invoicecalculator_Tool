# Tax and Invoice Calculator

A modern GST invoice calculator built with React, TypeScript, and Vite.

This tool helps you:

- Add multiple invoice line items
- Calculate subtotal, discount, taxable amount, GST, and final total in real time
- Validate input values before showing final preview
- Download a professional PDF invoice
- Use mobile-friendly keyboards for text and numeric fields

## Website Preview

Project image:

![Tax and Invoice Calculator](public/logo.png)

Note: if you want to show the full homepage screenshot in README, add your screenshot file (for example, `docs/website-preview.png`) and update this image path.

## Sample PDF

Sample generated invoice PDF:

- [View invoice.pdf](invoice.pdf)

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite

### PDF

- @react-pdf/renderer

### Styling

- Custom CSS (responsive, mobile-friendly layout)

## Key Features

1. Multiple item support
2. Real-time calculations
3. Input validation for item name, quantity, price, GST, and discount
4. Invoice preview panel
5. One-click PDF download
6. Mobile-friendly input behavior

## Project Structure

```text
.
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── InvoiceForm.tsx
│   │   ├── InvoicePreview.tsx
│   │   └── InvoicePDF.tsx
│   ├── types/
│   │   └── invoice.ts
│   ├── utils/
│   │   ├── calculate.ts
│   │   ├── format.ts
│   │   └── validate.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── invoice.pdf
├── package.json
└── README.md
```

## How to Run Locally

### 1. Prerequisites

- Node.js 18 or newer
- npm

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Now open:

- http://localhost:5173

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - run local development server
- `npm run build` - create production build
- `npm run preview` - preview the production build locally

## How to Use

1. Enter item name
2. Enter quantity and price
3. Add more items if needed
4. Set GST and discount percentages
5. Check invoice summary
6. Download invoice as PDF

## Validation Rules

- Item name is required
- Quantity must be greater than 0
- Price cannot be negative
- GST must be between 0 and 28
- Discount must be between 0 and 100

## Future Improvements

- Customer details and invoice metadata
- Save invoice draft in local storage
- Better chunk splitting for smaller production bundle size

## License

MIT

