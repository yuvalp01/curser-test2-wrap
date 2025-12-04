# Quick Setup Guide

## Step-by-Step Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Database Connection**
   
   Make sure your `.env.local` file contains:
   ```env
   DATABASE_URL="sqlserver://YOUR_SERVER.database.windows.net:1433;database=YOUR_DB;user=YOUR_USER;password=YOUR_PASSWORD;encrypt=true"
   ```

3. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What Was Built

### API Routes
- `/api/metadata` - Main endpoint that returns all tables, columns, and relationships
- `/api/metadata/tables` - Returns only table/column information
- `/api/metadata/relationships` - Returns only relationship information

### UI Components
- **TableCard** - Displays individual table with expandable details
- **ColumnList** - Shows all columns in a table with their properties
- **RelationshipList** - Displays foreign key relationships (outgoing and incoming)
- **SearchBar** - Search functionality for tables, schemas, and columns
- **SchemaFilter** - Filter tables by schema

### Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Real-time search
- ✅ Schema filtering
- ✅ Expandable table cards
- ✅ Visual relationship indicators
- ✅ Column type and nullable status display

## Database Queries Used

The app uses the exact SQL queries from `metadata-queries.sql`:
1. **Tables/Columns**: Queries `INFORMATION_SCHEMA.COLUMNS`
2. **Relationships**: Queries `sys.foreign_keys` and related system tables
3. **Exclusions**: Excludes `sys` schema and `accountTypes` table (as configured)

## Next Steps

1. Make sure your Azure SQL Database firewall allows connections from your IP
2. Test the connection by running the app
3. If you want to customize the UI, edit components in `app/components/`
4. If you need to modify the queries, update the API routes in `app/api/metadata/`
