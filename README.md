# Database Schema Browser

A readonly responsive web application to explore your Azure SQL Database structure, including tables, fields, and relationships.

## Features

- 📊 View all database tables organized by schema
- 🔍 Search tables, schemas, and columns
- 📋 Detailed column information (data types, nullable, max length)
- 🔗 Visual display of foreign key relationships
- 📱 Fully responsive design
- 🎨 Modern, clean UI with dark mode support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Azure SQL Database (via Prisma)
- **ORM**: Prisma

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Azure SQL Database connection string

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

Create or update `.env.local` with your database connection string:

```env
DATABASE_URL="sqlserver://your-server.database.windows.net:1433;database=your-database;user=your-username;password=your-password;encrypt=true"
```

For Azure SQL, the connection string format is:
```
sqlserver://SERVER:PORT;database=DATABASE;user=USER;password=PASSWORD;encrypt=true
```

3. Generate Prisma Client:
```bash
npm run prisma:generate
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/
│   ├── api/
│   │   └── metadata/        # API routes for database metadata
│   ├── components/          # React components
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── lib/
│   ├── prisma.ts            # Prisma client singleton
│   └── types.ts             # TypeScript types
├── prisma/
│   └── schema.prisma        # Prisma schema
└── documentation/           # Project documentation
```

## Usage

The app automatically fetches and displays:
- All tables (excluding `sys` schema and `accountTypes` table as per your configuration)
- All columns with their properties
- All foreign key relationships

### Filtering

- Use the search bar to filter by table name, schema, or column name
- Click on schema buttons to filter by specific schema
- Click on any table card to expand and see columns and relationships

## API Routes

- `GET /api/metadata` - Fetch all database metadata (tables, columns, relationships)
- `GET /api/metadata/tables` - Fetch only table/column information
- `GET /api/metadata/relationships` - Fetch only relationship information

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:studio` - Open Prisma Studio

## Notes

- This is a **readonly** application - no database modifications are made
- The app queries `INFORMATION_SCHEMA` and `sys` tables to get metadata
- Tables from the `sys` schema are excluded
- The `accountTypes` table is excluded (as configured in your SQL queries)

## Troubleshooting

### Connection Issues

If you're having trouble connecting to your Azure SQL Database:

1. Ensure your connection string is correct
2. Check that your IP address is allowed in Azure SQL firewall rules
3. Verify that encryption is enabled (`encrypt=true` in connection string)
4. Make sure your credentials are correct

### Build Errors

If you encounter build errors:

1. Make sure Prisma Client is generated: `npm run prisma:generate`
2. Check that all environment variables are set correctly
3. Verify that your database is accessible

## License

Private project - All rights reserved
