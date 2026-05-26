# AI Software Compiler - Complete CRM System

A full-stack Customer Relationship Management (CRM) application built with FastAPI, Next.js, and PostgreSQL.

## 🎯 Features

### ✅ Authentication & Security
- User registration and login with JWT authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes and frontend pages

### 👥 Contact Management
- Create, read, update, and delete contacts
- Contact search and filtering
- Contact export to CSV
- Unlimited contact storage for premium users

### 📊 Dashboard
- Personal user dashboard with key metrics
- Total contacts overview
- Monthly contact addition tracking
- Real-time interaction metrics
- Admin system-wide dashboard with advanced analytics

### 💳 Premium Plans & Payments
- Free tier (100 contacts limit)
- Premium tier ($29/month - unlimited contacts)
- Stripe integration for payments
- Subscription management (upgrade, downgrade, cancel)
- Invoice management
- Webhook handling for payment events

### 🔐 Role-Based Access Control
- **Admin**: Full system access, analytics, user management
- **Manager**: Team management, advanced analytics
- **User**: Personal CRM features

### 📈 Analytics
- User analytics dashboard
- Admin system-wide analytics
- Revenue tracking (Total, MRR)
- Churn rate calculation
- User distribution by role
- Daily signup trends

## 🏗️ Architecture

```
ai-software-compiler/
├── apps/
│   ├── api/                    # FastAPI Backend
│   │   ├── main.py            # App entry point
│   │   ├── models/            # SQLAlchemy models
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   ├── schemas/           # Pydantic schemas
│   │   └── config/            # Configuration
│   │
│   └── web/                    # Next.js Frontend
│       ├── app/               # Next.js app directory
│       │   ├── login/         # Login page
│       │   ├── register/      # Registration page
│       │   ├── dashboard/     # User dashboard
│       │   ├── contacts/      # Contacts management
│       │   ├── pricing/       # Pricing/billing
│       │   └── admin/         # Admin pages
│       └── lib/               # Utilities & services
│
└── docker-compose.crm.yml     # Docker services
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)

### Setup with Docker

1. **Clone and setup environment**
```bash
git clone <repo>
cd ai-software-compiler
cp .env.example .env
```

2. **Start services**
```bash
docker-compose -f docker-compose.crm.yml up -d
```

3. **Initialize database**
```bash
docker-compose -f docker-compose.crm.yml exec api python -c "from config.database import init_db; init_db()"
```

4. **Access the application**
- Frontend: http://localhost:3000
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Local Development

**Backend Setup**
```bash
cd apps/api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**Frontend Setup**
```bash
cd apps/web
npm install
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token

### Contact Endpoints
- `GET /api/contacts/` - List contacts (paginated)
- `POST /api/contacts/` - Create contact
- `GET /api/contacts/{id}` - Get contact details
- `PUT /api/contacts/{id}` - Update contact
- `DELETE /api/contacts/{id}` - Delete contact
- `GET /api/contacts/export/csv` - Export contacts as CSV

### Dashboard Endpoints
- `GET /api/dashboard/` - User dashboard
- `GET /api/dashboard/analytics` - User analytics
- `GET /api/dashboard/admin/analytics` - Admin analytics

### Payment Endpoints
- `POST /api/payments/create-checkout-session` - Create Stripe checkout
- `GET /api/payments/subscription-status` - Get subscription status
- `POST /api/payments/upgrade-to-premium` - Upgrade to premium
- `POST /api/payments/cancel-subscription` - Cancel subscription
- `POST /api/payments/webhook/stripe` - Stripe webhooks
- `GET /api/payments/invoices` - Get invoices

### Admin Endpoints
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/{id}` - Get user details
- `PUT /api/admin/users/{id}/role` - Update user role
- `PUT /api/admin/users/{id}/plan` - Update user plan
- `DELETE /api/admin/users/{id}` - Delete user
- `GET /api/admin/analytics` - System analytics

## 🔧 Configuration

### Environment Variables

Create `.env` file from `.env.example`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/crm_db

# JWT
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📦 Dependencies

### Backend
- FastAPI 0.100+
- SQLAlchemy 2.0+
- Pydantic 2.0+
- PyJWT
- bcrypt
- stripe
- psycopg2-binary

### Frontend
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- SQL injection prevention (SQLAlchemy ORM)
- Rate limiting ready
- Secure password reset flow
- Role-based access control

## 📊 Database Schema

### Users Table
- ID (UUID)
- Email (unique)
- Password Hash
- Full Name
- Role (enum: admin, manager, user)
- Plan (enum: free, premium)
- Subscription End Date
- Created/Updated Timestamps

### Contacts Table
- ID (UUID)
- User ID (FK)
- First Name, Last Name
- Email, Phone
- Company, Job Title
- Address, Notes
- Created/Updated Timestamps

### Analytics Table
- ID (UUID)
- User ID (FK) / System-wide
- Metrics (contacts, revenue, etc.)
- Date

## 🧪 Testing

```bash
# Backend tests
cd apps/api
pytest tests/

# Frontend tests
cd apps/web
npm run test
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📞 Support

For issues and questions, please open a GitHub issue or contact the team.

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: 2026-05-26
