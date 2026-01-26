# SQL Schema Documentation - Take-a-Chef Database

## Database Information
- **Database Name:** take_a_chef
- **Database Engine:** PostgreSQL 14
- **ORM:** Sequelize
- **Character Set:** UTF8

---

## Tables Overview

| Table Name | Description | Relationships |
|------------|-------------|---------------|
| users | User accounts (customers & chefs) | 1:1 with customers, 1:1 with chefs |
| customers | Customer profiles | 1:N with bookings, belongs to users |
| chefs | Chef profiles with specialties | 1:N with bookings, 1:N with dishes, belongs to users |
| dishes | Chef menu items | Belongs to chefs |
| bookings | Booking records | Belongs to customers and chefs, 1:1 with reviews |
| reviews | Customer reviews and ratings | Belongs to bookings |

---

## Detailed Table Schemas

### 1. users
**Description:** Stores user authentication and basic information for both customers and chefs.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing user ID |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address (unique) |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| name | VARCHAR(255) | NOT NULL | User full name |
| role | VARCHAR(50) | NOT NULL, CHECK(role IN ('customer', 'chef')) | User role |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `email`
- INDEX on `role` for filtering

**Relationships:**
- 1:1 with `customers` (user_id)
- 1:1 with `chefs` (user_id)

---

### 2. customers
**Description:** Extended profile information for customer users.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing customer ID |
| user_id | INTEGER | FOREIGN KEY (users.id), UNIQUE, NOT NULL | Reference to users table |
| phone | VARCHAR(50) | NULL | Customer phone number |
| address | TEXT | NULL | Customer address |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Profile creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `user_id`
- FOREIGN KEY INDEX on `user_id`

**Relationships:**
- Belongs to `users` (user_id)
- Has many `bookings` (customer_id)

---

### 3. chefs
**Description:** Extended profile information for chef users with ratings and specialties.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing chef ID |
| user_id | INTEGER | FOREIGN KEY (users.id), UNIQUE, NOT NULL | Reference to users table |
| bio | TEXT | NULL | Chef biography and description |
| specialty | VARCHAR(255) | NULL | Chef's cuisine specialty |
| experience_years | INTEGER | NULL | Years of professional experience |
| price_per_person | DECIMAL(10,2) | NULL | Base price per person |
| rating | DECIMAL(3,2) | DEFAULT 0.00 | Average rating (0.00-5.00) |
| photo | VARCHAR(500) | NULL | Chef profile photo URL |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Profile creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `user_id`
- FOREIGN KEY INDEX on `user_id`
- INDEX on `specialty` for filtering
- INDEX on `rating` for sorting

**Relationships:**
- Belongs to `users` (user_id)
- Has many `bookings` (chef_id)
- Has many `dishes` (chef_id)

---

### 4. dishes
**Description:** Menu items offered by chefs.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing dish ID |
| chef_id | INTEGER | FOREIGN KEY (chefs.id), NOT NULL | Reference to chefs table |
| name | VARCHAR(255) | NOT NULL | Dish name |
| description | TEXT | NULL | Dish description |
| price | DECIMAL(10,2) | NOT NULL | Dish price |
| category | VARCHAR(100) | NULL | Dish category (appetizer, main, dessert) |
| image | VARCHAR(500) | NULL | Dish image URL |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- FOREIGN KEY INDEX on `chef_id`
- INDEX on `category` for filtering

**Relationships:**
- Belongs to `chefs` (chef_id)

---

### 5. bookings
**Description:** Booking records between customers and chefs.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing booking ID |
| customer_id | INTEGER | FOREIGN KEY (customers.id), NOT NULL | Reference to customers table |
| chef_id | INTEGER | FOREIGN KEY (chefs.id), NOT NULL | Reference to chefs table |
| booking_date | DATE | NOT NULL | Date of the booking |
| number_of_guests | INTEGER | NOT NULL, CHECK(number_of_guests > 0) | Number of guests |
| preferences | TEXT | NULL | Customer dietary preferences/notes |
| total_price | DECIMAL(10,2) | NULL | Total booking price |
| status | VARCHAR(50) | NOT NULL, DEFAULT 'pending', CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')) | Booking status |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Booking creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- FOREIGN KEY INDEX on `customer_id`
- FOREIGN KEY INDEX on `chef_id`
- INDEX on `status` for filtering
- INDEX on `booking_date` for sorting
- COMPOSITE INDEX on `(customer_id, booking_date)` for customer history queries
- COMPOSITE INDEX on `(chef_id, booking_date)` for chef schedule queries

**Relationships:**
- Belongs to `customers` (customer_id)
- Belongs to `chefs` (chef_id)
- Has one `reviews` (booking_id)

**Business Rules:**
- `booking_date` must be in the future
- `number_of_guests` must be > 0 and <= 50
- Status transitions: pending → confirmed → completed OR pending → cancelled

---

### 6. reviews
**Description:** Customer reviews and ratings for completed bookings.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Auto-incrementing review ID |
| booking_id | INTEGER | FOREIGN KEY (bookings.id), UNIQUE, NOT NULL | Reference to bookings table |
| rating | INTEGER | NOT NULL, CHECK(rating >= 1 AND rating <= 5) | Rating from 1 to 5 stars |
| comment | TEXT | NULL | Review comment/feedback |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Review creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `booking_id` (one review per booking)
- FOREIGN KEY INDEX on `booking_id`
- INDEX on `rating` for statistics

**Relationships:**
- Belongs to `bookings` (booking_id)

**Business Rules:**
- Only one review per booking
- Rating must be between 1 and 5
- Can only review completed bookings

---

## Entity Relationship Diagram (ERD)
```
┌─────────────┐         ┌──────────────┐
│   users     │◄───1:1──┤  customers   │
│             │         │              │
│ • id (PK)   │         │ • id (PK)    │
│ • email     │         │ • user_id(FK)│
│ • password  │         │ • phone      │
│ • name      │         │ • address    │
│ • role      │         └──────┬───────┘
└──────┬──────┘                │
       │                       │1
       │1:1                    │
       │                       │N
┌──────▼──────┐         ┌──────▼───────┐
│   chefs     │         │   bookings   │
│             │◄───N────┤              │
│ • id (PK)   │         │ • id (PK)    │
│ • user_id   │         │ • customer_id│
│ • bio       │         │ • chef_id    │
│ • specialty │         │ • date       │
│ • rating    │         │ • guests     │
└──────┬──────┘         │ • status     │
       │                └──────┬───────┘
       │1                      │
       │                       │1
       │N                      │
┌──────▼──────┐         ┌──────▼───────┐
│   dishes    │         │   reviews    │
│             │         │              │
│ • id (PK)   │         │ • id (PK)    │
│ • chef_id   │         │ • booking_id │
│ • name      │         │ • rating     │
│ • price     │         │ • comment    │
└─────────────┘         └──────────────┘
```

---

## Database Constraints Summary

### Primary Keys
- All tables use auto-incrementing SERIAL primary keys

### Foreign Keys
- `customers.user_id` → `users.id` (CASCADE DELETE)
- `chefs.user_id` → `users.id` (CASCADE DELETE)
- `dishes.chef_id` → `chefs.id` (CASCADE DELETE)
- `bookings.customer_id` → `customers.id` (RESTRICT DELETE)
- `bookings.chef_id` → `chefs.id` (RESTRICT DELETE)
- `reviews.booking_id` → `bookings.id` (CASCADE DELETE)

### Unique Constraints
- `users.email` - Email must be unique
- `customers.user_id` - One customer profile per user
- `chefs.user_id` - One chef profile per user
- `reviews.booking_id` - One review per booking

### Check Constraints
- `users.role` IN ('customer', 'chef')
- `bookings.status` IN ('pending', 'confirmed', 'completed', 'cancelled')
- `bookings.number_of_guests` > 0
- `reviews.rating` BETWEEN 1 AND 5

---

## Performance Optimizations

### Indexes Created
1. **users.email** - UNIQUE INDEX for fast login queries
2. **users.role** - INDEX for role-based filtering
3. **chefs.specialty** - INDEX for specialty filtering
4. **chefs.rating** - INDEX for sorting chefs by rating
5. **bookings.status** - INDEX for filtering by status
6. **bookings.booking_date** - INDEX for date range queries
7. **bookings.(customer_id, booking_date)** - COMPOSITE for customer history
8. **bookings.(chef_id, booking_date)** - COMPOSITE for chef schedule

### Query Optimization Strategies
- Use of Sequelize ORM to prevent SQL injection
- Eager loading with `include` to reduce N+1 queries
- Pagination support for large result sets
- Indexed foreign keys for fast JOIN operations

---

## Database Normalization

**Current Normalization Level:** 3NF (Third Normal Form)

### 1NF (First Normal Form)
✅ All columns contain atomic values
✅ No repeating groups
✅ Each row is unique (primary key)

### 2NF (Second Normal Form)
✅ All non-key attributes fully depend on primary key
✅ No partial dependencies

### 3NF (Third Normal Form)
✅ No transitive dependencies
✅ All non-key attributes depend only on primary key

---

## Backup and Maintenance

### Backup Strategy
- Daily automated backups via Docker volume snapshots
- PostgreSQL `pg_dump` for manual backups
- Volume: `postgres_data` contains persistent database

### Maintenance Tasks
- Regular VACUUM ANALYZE for performance
- Monitor index usage and add/remove as needed
- Archive old completed bookings (retention policy)
- Update chef ratings after new reviews

---

## Database Connection

### Connection Details
```javascript
{
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'take_a_chef',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
```

### ORM Configuration
- **ORM:** Sequelize v6
- **Sync Strategy:** `{ alter: true }` in development
- **Migrations:** To be implemented for production
- **Seeders:** Available for test data

---

## Security Considerations

1. **Password Storage:** Bcrypt hashing with salt rounds = 10
2. **SQL Injection Prevention:** Sequelize ORM with parameterized queries
3. **Database User:** Least privilege principle
4. **Network:** PostgreSQL only accessible within Docker network
5. **Environment Variables:** Sensitive data in `.env` file (not committed)

---

## Future Enhancements

- [ ] Add database migrations for version control
- [ ] Implement soft deletes for bookings
- [ ] Add full-text search on chef bios and dish names
- [ ] Create materialized view for chef statistics
- [ ] Add audit trail table for booking changes
- [ ] Implement read replicas for scalability