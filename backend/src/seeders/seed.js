const { sequelize } = require('../config/database');
const { User, Chef, Customer, Dish, Booking, Review } = require('../models');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Hash password
    const password = await bcrypt.hash('password123', 10);

    console.log('👥 Creating users...');

    // Create Customers
    const [customer1] = await User.findOrCreate({
      where: { email: 'customer1@takeachef.com' },
      defaults: {
        email: 'customer1@takeachef.com',
        password_hash: password,
        name: 'Sara Malki',
        role: 'customer',
      },
    });

    const [customer2] = await User.findOrCreate({
      where: { email: 'customer2@takeachef.com' },
      defaults: {
        email: 'customer2@takeachef.com',
        password_hash: password,
        name: 'Ahmed Benani',
        role: 'customer',
      },
    });

    // Create Chef Users
    const [chefUser1] = await User.findOrCreate({
      where: { email: 'chef1@takeachef.com' },
      defaults: {
        email: 'chef1@takeachef.com',
        password_hash: password,
        name: 'Mohamed Fadel',
        role: 'chef',
      },
    });

    const [chefUser2] = await User.findOrCreate({
      where: { email: 'chef2@takeachef.com' },
      defaults: {
        email: 'chef2@takeachef.com',
        password_hash: password,
        name: 'Najat Kaanache',
        role: 'chef',
      },
    });

    const [chefUser3] = await User.findOrCreate({
      where: { email: 'chef3@takeachef.com' },
      defaults: {
        email: 'chef3@takeachef.com',
        password_hash: password,
        name: 'Moha Lee',
        role: 'chef',
      },
    });

    console.log('👨‍🍳 Creating chef profiles...');

    const [chef1] = await Chef.findOrCreate({
      where: { user_id: chefUser1.id },
      defaults: {
        user_id: chefUser1.id,
        bio: 'Passionate about Moroccan cuisine with 15 years of experience. Specializing in traditional tagines and modern fusion dishes.',
        specialty: 'Moroccan',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.8,
        total_reviews: 42,
      },
    });

    const [chef2] = await Chef.findOrCreate({
      where: { user_id: chefUser2.id },
      defaults: {
        user_id: chefUser2.id,
        bio: 'International chef known for creative presentations. Expert in Italian and French cuisine with a modern twist.',
        specialty: 'Italian',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4.9,
        total_reviews: 67,
      },
    });

    const [chef3] = await Chef.findOrCreate({
      where: { user_id: chefUser3.id },
      defaults: {
        user_id: chefUser3.id,
        bio: 'Asian fusion specialist bringing authentic flavors with contemporary techniques. Sushi master and Thai cuisine expert.',
        specialty: 'Japanese',
        photo: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4.7,
        total_reviews: 38,
      },
    });

    console.log('🍽️ Creating dishes...');

    const dishes = [
      {
        chef_id: chef1.id,
        name: 'Moroccan Chicken Tagine',
        description: 'Traditional slow-cooked chicken with preserved lemons, olives, and aromatic spices',
        price: 25,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
      },
      {
        chef_id: chef1.id,
        name: 'Lamb Couscous',
        description: 'Tender lamb with seven vegetables served over fluffy couscous',
        price: 28,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500',
      },
      {
        chef_id: chef2.id,
        name: 'Homemade Pasta Carbonara',
        description: 'Creamy pasta with guanciale, eggs, and Parmigiano-Reggiano',
        price: 22,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500',
      },
      {
        chef_id: chef2.id,
        name: 'Beef Bourguignon',
        description: 'Classic French beef stew braised in red wine with mushrooms and pearl onions',
        price: 32,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500',
      },
      {
        chef_id: chef3.id,
        name: 'Sushi Omakase',
        description: "Chef's selection of premium nigiri and sashimi with seasonal fish",
        price: 45,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500',
      },
      {
        chef_id: chef3.id,
        name: 'Pad Thai',
        description: 'Authentic Thai stir-fried rice noodles with shrimp, tofu, and tamarind sauce',
        price: 18,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
      },
    ];

    for (const dish of dishes) {
      await Dish.findOrCreate({
        where: {
          chef_id: dish.chef_id,
          name: dish.name,
        },
        defaults: dish,
      });
    }

    console.log('👤 Creating customer profiles...');

    await Customer.findOrCreate({
      where: { user_id: customer1.id },
      defaults: {
        user_id: customer1.id,
      },
    });

    await Customer.findOrCreate({
      where: { user_id: customer2.id },
      defaults: {
        user_id: customer2.id,
      },
    });

    console.log('📅 Creating bookings...');

    const [booking1] = await Booking.findOrCreate({
      where: {
        customer_id: customer1.id,
        chef_id: chef1.id,
        booking_date: new Date('2026-02-15'),
      },
      defaults: {
        customer_id: customer1.id,
        chef_id: chef1.id,
        booking_date: new Date('2026-02-15'),
        booking_time: '19:00:00',
        guests: 6,
        total_price: 450,
        status: 'confirmed',
      },
    });

    const [booking2] = await Booking.findOrCreate({
      where: {
        customer_id: customer2.id,
        chef_id: chef2.id,
        booking_date: new Date('2026-02-20'),
      },
      defaults: {
        customer_id: customer2.id,
        chef_id: chef2.id,
        booking_date: new Date('2026-02-20'),
        booking_time: '20:00:00',
        guests: 4,
        total_price: 340,
        status: 'pending',
      },
    });

    console.log('⭐ Creating reviews...');

    await Review.findOrCreate({
      where: {
        booking_id: booking1.id,
      },
      defaults: {
        booking_id: booking1.id,
        customer_id: customer1.id,
        chef_id: chef1.id,
        rating: 5,
        comment: 'Absolutely amazing experience! Mohamed prepared the most delicious Moroccan feast. Highly recommend!',
      },
    });

    console.log('✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   👥 Users: ${await User.count()}`);
    console.log(`   👨‍🍳 Chefs: ${await Chef.count()}`);
    console.log(`   👤 Customers: ${await Customer.count()}`);
    console.log(`   🍽️ Dishes: ${await Dish.count()}`);
    console.log(`   📅 Bookings: ${await Booking.count()}`);
    console.log(`   ⭐ Reviews: ${await Review.count()}`);
    console.log('\n🔐 Test credentials:');
    console.log('   Customer: customer1@takeachef.com / password123');
    console.log('   Chef: chef1@takeachef.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();