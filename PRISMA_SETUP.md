# Prisma Setup Instructions

## 📦 Install Prisma

```bash
cd apps/api
npm install @prisma/client prisma
```

## 🗄️ Database Configuration

1. Ensure your `DATABASE_URL` environment variable is set:
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/crm_db"
```

2. For Railway, the `DATABASE_URL` is automatically provided

## 📋 Migration Commands

### Initialize Prisma (First Time Only)
```bash
npx prisma init
```

### Create Migration (After Schema Changes)
```bash
npx prisma migrate dev --name init
```

### Deploy Migration to Database
```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset
```

### View Database GUI
```bash
npx prisma studio
```

## 🚀 Steps to Deploy

### Step 1: Install Dependencies
```bash
cd apps/api
npm install
```

### Step 2: Set Environment Variable
```bash
# For local development
export DATABASE_URL="postgresql://user:password@localhost:5432/crm_db"

# For production (Railway sets this automatically)
```

### Step 3: Run Migrations
```bash
# Deploy existing migrations
npx prisma migrate deploy

# Or create and run new migration
npx prisma migrate dev --name init
```

### Step 4: Verify Migration
```bash
npx prisma studio
# Opens at http://localhost:5555
```

## 📊 Generated Prisma Client

After running migrations, Prisma generates a client at:
```
apps/api/node_modules/.prisma/client
```

## 🔄 Using Prisma in Your Code

### Initialize Connection
```python
from prisma import Prisma

db = Prisma()

async def startup():
    await db.connect()

async def shutdown():
    await db.disconnect()
```

### Query Examples
```python
# Create user
user = await db.user.create(
    data={
        "email": "user@example.com",
        "password_hash": "hashed_password",
        "full_name": "John Doe"
    }
)

# Get user
user = await db.user.find_unique(where={"email": "user@example.com"})

# Update user
user = await db.user.update(
    where={"id": user_id},
    data={"plan": "PREMIUM"}
)

# Delete user
await db.user.delete(where={"id": user_id})

# List contacts
contacts = await db.contact.find_many(where={"user_id": user_id})
```

## 📝 Common Issues & Solutions

### Issue: Migration Not Running
```
Solution:
1. Check DATABASE_URL is set correctly
2. Verify PostgreSQL is running
3. Run: npx prisma migrate reset
```

### Issue: Type Errors
```
Solution:
1. Regenerate Prisma client: npx prisma generate
2. Clear cache: rm -rf node_modules/.prisma
3. Reinstall: npm install
```

### Issue: Database Connection Failed
```
Solution:
1. Check connection string
2. Verify database exists
3. Check firewall/network rules
```

## 🔐 Deployment Checklist

- [ ] DATABASE_URL set in Railway
- [ ] PostgreSQL service provisioned
- [ ] Prisma installed: `npm install @prisma/client prisma`
- [ ] Migration files created in `prisma/migrations/`
- [ ] Run migration: `npx prisma migrate deploy`
- [ ] Verify schema: `npx prisma studio`
- [ ] Test database queries

## 📚 Prisma Resources

- Docs: https://www.prisma.io/docs
- Migrations: https://www.prisma.io/docs/concepts/components/prisma-migrate
- Python Client: https://github.com/RobertCraigie/prisma-client-py
- Schema: https://www.prisma.io/docs/concepts/components/prisma-schema

---

**Status**: Ready for Prisma migration deployment! 🚀
