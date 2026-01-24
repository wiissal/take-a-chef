const { sequelize } = require('../config/database');
const { User, Chef, Customer, Dish, Booking, Review } = require('../models');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clean old test data
    console.log('🗑️ Cleaning old test data...');
    await Review.destroy({ where: {} });
    await Booking.destroy({ where: {} });
    await Dish.destroy({ where: {} });
    await Chef.destroy({ where: {} });
    await Customer.destroy({ where: {} });
    await User.destroy({ 
      where: { 
        email: ['chef1@takeachef.com', 'chef2@takeachef.com', 'chef3@takeachef.com'] 
      } 
    });

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
      where: { email: 'najat@takeachef.com' },
      defaults: {
        email: 'najat@takeachef.com',
        password_hash: password,
        name: 'Najat Kaanache',
        role: 'chef',
      },
    });

    const [chefUser2] = await User.findOrCreate({
      where: { email: 'susur@takeachef.com' },
      defaults: {
        email: 'susur@takeachef.com',
        password_hash: password,
        name: 'Susur Lee',
        role: 'chef',
      },
    });

    const [chefUser3] = await User.findOrCreate({
      where: { email: 'mohamed@takeachef.com' },
      defaults: {
        email: 'mohamed@takeachef.com',
        password_hash: password,
        name: 'Mohamed Fadel',
        role: 'chef',
      },
    });

    const [chefUser4] = await User.findOrCreate({
      where: { email: 'meriem@takeachef.com' },
      defaults: {
        email: 'meriem@takeachef.com',
        password_hash: password,
        name: 'Meriem Tahiri',
        role: 'chef',
      },
    });

    const [chefUser5] = await User.findOrCreate({
      where: { email: 'ashley@takeachef.com' },
      defaults: {
        email: 'ashley@takeachef.com',
        password_hash: password,
        name: 'Ashley Palmer-Watts',
        role: 'chef',
      },
    });

    const [chefUser6] = await User.findOrCreate({
      where: { email: 'jorge@takeachef.com' },
      defaults: {
        email: 'jorge@takeachef.com',
        password_hash: password,
        name: 'Jorge Badillo',
        role: 'chef',
      },
    });

    const [chefUser7] = await User.findOrCreate({
      where: { email: 'khadija@takeachef.com' },
      defaults: {
        email: 'khadija@takeachef.com',
        password_hash: password,
        name: 'Khadija Bensdira',
        role: 'chef',
      },
    });

    const [chefUser8] = await User.findOrCreate({
      where: { email: 'amine@takeachef.com' },
      defaults: {
        email: 'amine@takeachef.com',
        password_hash: password,
        name: 'Amine Laabi',
        role: 'chef',
      },
    });

    console.log('👨‍🍳 Creating chef profiles...');

   const [chef1] = await Chef.findOrCreate({
      where: { user_id: chefUser1.id },
      defaults: {
        user_id: chefUser1.id,
        bio: 'Award-winning Moroccan chef bringing modern twists to traditional recipes. Passionate about sustainable, locally-sourced ingredients and cultural fusion.',
        specialty: 'Moroccan Fusion',
        photo: 'https://i.pravatar.cc/https://www.marlene.it/media/64e42a02-3aa5-4fbc-8196-0765e0f2c251/602_x_602/p=4/chef-najat-kaanache-01.webp?img=4https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_XnGIbt6OJ-KEp3vmJCXxTX3sEURUqHscxzIYz9__0KjveNY5YPSRpzaoOH7G2POpyhGmSMhQfBMpg3LQToG8UGiejrblyupc40X3KGI&s=10',
        rating: 4.9,
        total_reviews: 127,
      },
    });

    const [chef2] = await Chef.findOrCreate({
      where: { user_id: chefUser2.id },
      defaults: {
        user_id: chefUser2.id,
        bio: 'Internationally acclaimed chef specializing in Asian fusion cuisine. Known for innovative techniques and artistic presentations that blend East and West.',
        specialty: 'Asian Fusion',
        photo: 'https://i.pravatar.https://api.flavournetwork.ca/wp-content/uploads/2024/06/Susur-Lee-feat.jpg?w=1080&quality=75cc/400?img=33',
        rating: 4.8,
        total_reviews: 89,
      },
    });

    const [chef3] = await Chef.findOrCreate({
      where: { user_id: chefUser3.id },
      defaults: {
        user_id: chefUser3.id,
        bio: 'Master of traditional Moroccan cuisine with 20 years of experience. Specializing in authentic tagines, couscous, and pastries passed down through generations.',
        specialty: 'Traditional Moroccan',
        photo: 'https://mylittlekech.com/wp-content/uploads/2020/11/chef-moha-top-3-championnat-tapas.jpg',
        rating: 4.7,
        total_reviews: 156,
      },
    });

    const [chef4] = await Chef.findOrCreate({
      where: { user_id: chefUser4.id },
      defaults: {
        user_id: chefUser4.id,
        bio: 'Contemporary French chef with a passion for Mediterranean flavors. Expert in creating elegant dishes with seasonal ingredients and refined techniques.',
        specialty: 'French Mediterranean',
        photo: 'https://h24info.ma/wp-content/uploads/2025/07/Meryem-Tahiri-La-Pause-Vivo-Energy-Maroc.png',
        rating: 4.9,
        total_reviews: 94,
      },
    });

    const [chef5] = await Chef.findOrCreate({
      where: { user_id: chefUser5.id },
      defaults: {
        user_id: chefUser5.id,
        bio: 'British culinary innovator known for molecular gastronomy and experimental cuisine. Creates unforgettable multi-sensory dining experiences.',
        specialty: 'Modern British',
        photo: 'https://media-cdn2.greatbritishchefs.com/media/4uzkwrxw/gbc_devonshire_edit-20.whqc_520x347q80.webp',
        rating: 4.8,
        total_reviews: 112,
      },
    });

    const [chef6] = await Chef.findOrCreate({
      where: { user_id: chefUser6.id },
      defaults: {
        user_id: chefUser6.id,
        bio: 'Mexican chef bringing authentic flavors with contemporary presentation. Expert in regional Mexican cuisine and traditional cooking methods.',
        specialty: 'Mexican',
        photo: 'https://www.caterermiddleeast.com/cloud/2024/10/10/Anantara_Mina_Al_Arab_Resort_Chef_Jorge_Badillo-HME-1024x768.jpg',
        rating: 4.7,
        total_reviews: 78,
      },
    });

    const [chef7] = await Chef.findOrCreate({
      where: { user_id: chefUser7.id },
      defaults: {
        user_id: chefUser7.id,
        bio: 'Moroccan home cooking specialist focusing on authentic family recipes. Known for warm hospitality and traditional preparation methods.',
        specialty: 'Moroccan Home Cooking',
        photo: 'https://www.leparisien.fr/resizer/iT7q9JH1DU-0XkASdxF7u3begGo=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/GZ43ZA3HOE6YKIF42HUDOX35HE.jpg',
        rating: 4.9,
        total_reviews: 143,
      },
    });

    const [chef8] = await Chef.findOrCreate({
      where: { user_id: chefUser8.id },
      defaults: {
        user_id: chefUser8.id,
        bio: 'Contemporary Moroccan chef blending North African and Middle Eastern flavors. Specializes in creative presentations and spice blends.',
        specialty: 'North African',
        photo: 'https://images.radio-canada.ca/q_auto,w_1200/v1/ici-tele/16x9/les-chefs-2022-11e-saison-amine.jpg',
        rating: 4.8,
        total_reviews: 95,
      },
    });

    console.log('🍽️ Creating dishes...');

    const dishes = [
      // Najat Kaanache - Moroccan Fusion
      {
        chef_id: chef1.id,
        name: 'Deconstructed Chicken Tagine',
        description: 'Modern take on classic tagine with preserved lemons, olives, and aromatic spices',
        price: 32,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
      },
      {
        chef_id: chef1.id,
        name: 'Saffron Lamb Couscous',
        description: 'Seven-vegetable couscous with tender lamb, infused with saffron',
        price: 35,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500',
      },
      {
        chef_id: chef1.id,
        name: 'Harira Soup Reimagined',
        description: 'Contemporary presentation of traditional soup with chickpeas and lentils',
        price: 12,
        category: 'Appetizer',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
      },

      // Susur Lee - Asian Fusion
      {
        chef_id: chef2.id,
        name: 'Singaporean Chili Crab',
        description: 'Fresh crab in signature sweet and spicy tomato-chili sauce',
        price: 45,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
      },
      {
        chef_id: chef2.id,
        name: 'Miso Black Cod',
        description: 'Buttery black cod marinated in sweet miso with pickled vegetables',
        price: 42,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500',
      },
      {
        chef_id: chef2.id,
        name: 'Thai Basil Duck',
        description: 'Crispy duck breast with Thai basil, chili, and tamarind glaze',
        price: 38,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500',
      },

      // Mohamed Fadel - Traditional Moroccan
      {
        chef_id: chef3.id,
        name: 'Classic Lamb Tagine',
        description: 'Slow-cooked lamb with prunes, almonds, and honey in clay pot',
        price: 30,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
      },
      {
        chef_id: chef3.id,
        name: 'Royal Couscous',
        description: 'Traditional couscous with lamb, chicken, merguez, and vegetables',
        price: 34,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500',
      },
      {
        chef_id: chef3.id,
        name: 'Mechoui Lamb Shoulder',
        description: 'Whole roasted lamb shoulder with cumin and traditional spices',
        price: 50,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500',
      },

      // Meriem Tahiri - French Mediterranean
      {
        chef_id: chef4.id,
        name: 'Bouillabaisse Provençale',
        description: 'Traditional Marseille fish stew with saffron rouille',
        price: 38,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=500',
      },
      {
        chef_id: chef4.id,
        name: 'Duck Confit',
        description: 'Slow-cooked duck leg with crispy skin and fingerling potatoes',
        price: 36,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=500',
      },
      {
        chef_id: chef4.id,
        name: 'Pan-Seared Sea Bass',
        description: 'Mediterranean sea bass with fennel and cherry tomatoes',
        price: 42,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
      },

      // Ashley Palmer-Watts - Modern British
      {
        chef_id: chef5.id,
        name: 'Molecular Beef Wellington',
        description: 'Deconstructed Wellington with truffle foam and crispy pastry',
        price: 48,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500',
      },
      {
        chef_id: chef5.id,
        name: 'Fish & Chips Elevated',
        description: 'Beer-battered fish with triple-cooked chips and mushy pea puree',
        price: 28,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=500',
      },
      {
        chef_id: chef5.id,
        name: 'English Breakfast Reimagined',
        description: 'Modern take on classic fry-up with artisan ingredients',
        price: 22,
        category: 'Brunch',
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500',
      },

      // Jorge Badillo - Mexican
      {
        chef_id: chef6.id,
        name: 'Mole Poblano',
        description: 'Traditional chicken mole with 30+ ingredients and chocolate',
        price: 32,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
      },
      {
        chef_id: chef6.id,
        name: 'Cochinita Pibil',
        description: 'Slow-roasted pork marinated in achiote and citrus',
        price: 35,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500',
      },
      {
        chef_id: chef6.id,
        name: 'Authentic Tacos al Pastor',
        description: 'Spit-roasted pork tacos with pineapple and cilantro',
        price: 18,
        category: 'Appetizer',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500',
      },

      // Khadija Bensdira - Moroccan Home Cooking
      {
        chef_id: chef7.id,
        name: 'Grandmothers Chicken Tagine',
        description: 'Family recipe passed down through generations with preserved lemons',
        price: 28,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
      },
      {
        chef_id: chef7.id,
        name: 'Homestyle Couscous',
        description: 'Traditional Friday couscous with vegetables and tender meat',
        price: 26,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=500',
      },
      {
        chef_id: chef7.id,
        name: 'Rfissa',
        description: 'Traditional chicken dish with msemen and fenugreek',
        price: 30,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
      },

      // Amine Laabi - North African
      {
        chef_id: chef8.id,
        name: 'Charmoula Grilled Fish',
        description: 'Fresh fish marinated in North African spice blend',
        price: 34,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500',
      },
      {
        chef_id: chef8.id,
        name: 'Lamb Mechoui with Couscous',
        description: 'Roasted lamb with aromatic couscous and harissa',
        price: 38,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500',
      },
      {
        chef_id: chef8.id,
        name: 'Zaalouk & Bread',
        description: 'Smoky eggplant salad with fresh Moroccan bread',
        price: 14,
        category: 'Appetizer',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500',
      },
    ];

    for (const dish of dishes) {
      await Dish.create(dish);
    }

    console.log('👤 Creating customer profiles...');

const [customerProfile1] = await Customer.findOrCreate({
  where: { user_id: customer1.id },
  defaults: { user_id: customer1.id },
});

const [customerProfile2] = await Customer.findOrCreate({
  where: { user_id: customer2.id },
  defaults: { user_id: customer2.id },
});

    console.log('📅 Creating bookings...');

    const [booking1] = await Booking.findOrCreate({
      where: {
        customer_id: customerProfile1.id,
        chef_id: chef1.id,
        booking_date: new Date('2026-02-15'),
      },
      defaults: {
        customer_id: customerProfile1.id,
        chef_id: chef1.id,
        booking_date: new Date('2026-02-15'),
        booking_time: '19:00:00',
        guests: 6,
        total_price: 450,
        status: 'confirmed',
      },
    });

    console.log('⭐ Creating reviews...');

    await Review.findOrCreate({
      where: { booking_id: booking1.id },
      defaults: {
        booking_id: booking1.id,
        customer_id: customerProfile1.id,
        chef_id: chef1.id,
        rating: 5,
        comment: 'Absolutely incredible! Najat created a beautiful Moroccan feast. Every dish was perfectly executed!',
      },
    });

    console.log('✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   👥 Users: ${await User.count()}`);
    console.log(`   👨‍🍳 Chefs: ${await Chef.count()}`);
    console.log(`   🍽️ Dishes: ${await Dish.count()}`);
    console.log('\n🔐 Test credentials:');
    console.log('   Customer: customer1@takeachef.com / password123');
    console.log('   Chefs:');
    console.log('     - najat@takeachef.com (Najat Kaanache - Moroccan Fusion)');
    console.log('     - susur@takeachef.com (Susur Lee - Asian Fusion)');
    console.log('     - mohamed@takeachef.com (Mohamed Fadel - Traditional Moroccan)');
    console.log('     - meriem@takeachef.com (Meriem Tahiri - French Mediterranean)');
    console.log('     - ashley@takeachef.com (Ashley Palmer-Watts - Modern British)');
    console.log('     - jorge@takeachef.com (Jorge Badillo - Mexican)');
    console.log('     - khadija@takeachef.com (Khadija Bensdira - Moroccan Home)');
    console.log('     - amine@takeachef.com (Amine Laabi - North African)');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();