const bcrypt = require('bcrypt');
const { sequelize, User, Chef, Customer, Dish } = require('../models');

const seedDatabase = async () => {
  try {
    console.log(' Starting database seeding...');

    // Clear existing data 
    // await sequelize.sync({ force: true });

    // Hash password
    const password_hash = await bcrypt.hash('password123', 10);

    // Create Users
    console.log(' Creating users...');
    const customer1 = await User.create({
      email: 'customer1@takeachef.com',
      password_hash,
      name: 'Sara malki',
      role: 'customer'
    });

    const customer2 = await User.create({
      email: 'customer2@takeachef.com',
      password_hash,
      name: 'Ahmed El Mansouri',
      role: 'customer'
    });

    const chef1User = await User.create({
      email: 'chef1@takeachef.com',
      password_hash,
      name: 'Chef Meriem Tahiri',
      role: 'chef'
    });

    const chef2User = await User.create({
      email: 'chef2@takeachef.com',
      password_hash,
      name: 'Chef Fatima Zahra',
      role: 'chef'
    });

    const chef3User = await User.create({
      email: 'chef3@takeachef.com',
      password_hash,
      name: 'Chef Moha',
      role: 'chef'
    });

    // Create Customer Profiles
    console.log(' Creating customer profiles...');
    await Customer.create({
      user_id: customer1.id,
      phone: '+212600000001',
      address: 'Casablanca, Morocco'
    });

    await Customer.create({
      user_id: customer2.id,
      phone: '+212600000002',
      address: 'Rabat, Morocco'
    });

    // Create Chef Profiles
    console.log(' Creating chef profiles...');
    const chef1 = await Chef.create({
      user_id: chef1User.id,
      bio: 'Passionate Moroccan chef with 15 years of experience specializing in traditional tagines, couscous, and pastilla. Trained in Fes and Marrakech.',
      specialty: 'Moroccan Cuisine',
      rating: 4.8,
      total_reviews: 24
    });

    const chef2 = await Chef.create({
      user_id: chef2User.id,
      bio: 'Expert in Mediterranean and Moroccan fusion cuisine. Certified pastry chef specializing in traditional Moroccan desserts.',
      specialty: 'Mediterranean & Moroccan Fusion',
      rating: 4.9,
      total_reviews: 18
    });

    const chef3 = await Chef.create({
      user_id: chef3User.id,
      bio: 'Modern Moroccan cuisine specialist. Creates innovative dishes while respecting traditional flavors.',
      specialty: 'Modern Moroccan',
      rating: 4.7,
      total_reviews: 12
    });

    // Create Dishes
    console.log(' Creating dishes...');
    
    // Chef 1 dishes (Traditional Moroccan)
    await Dish.bulkCreate([
      {
        chef_id: chef1.id,
        name: 'Chicken Tagine with Olives',
        description: 'Traditional Moroccan chicken tagine slow-cooked with preserved lemons and olives',
        price: 120.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641'
      },
      {
        chef_id: chef1.id,
        name: 'Lamb Couscous Royal',
        description: 'Authentic Moroccan couscous with tender lamb, seven vegetables, and aromatic broth',
        price: 150.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb'
      },
      {
        chef_id: chef1.id,
        name: 'Moroccan Mint Tea',
        description: 'Traditional sweet mint tea served in authentic silver teapot',
        price: 25.00,
        category: 'Beverage',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9'
      },
      {
        chef_id: chef1.id,
        name: 'Harira Soup',
        description: 'Rich and hearty traditional Moroccan soup with chickpeas, lentils, and lamb',
        price: 40.00,
        category: 'Starter',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd'
      },
      {
        chef_id: chef1.id,
        name: 'Pastilla',
        description: 'Traditional Moroccan pie with chicken, almonds, and cinnamon in phyllo pastry',
        price: 90.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950'
      }
    ]);

    // Chef 2 dishes (Mediterranean Fusion)
    await Dish.bulkCreate([
      {
        chef_id: chef2.id,
        name: 'Mediterranean Mezze Platter',
        description: 'Assorted dips including hummus, baba ganoush, and zaalouk',
        price: 80.00,
        category: 'Starter',
        image: 'https://images.unsplash.com/photo-1541529086526-db283c563270'
      },
      {
        chef_id: chef2.id,
        name: 'Seafood Tagine',
        description: 'Fresh seafood in aromatic tomato and herb sauce',
        price: 180.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1559847844-d05ce04d28bc'
      },
      {
        chef_id: chef2.id,
        name: 'Baklava Selection',
        description: 'Assorted traditional Moroccan pastries with honey and nuts',
        price: 45.00,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548'
      }
    ]);

    // Chef 3 dishes (Modern Moroccan)
    await Dish.bulkCreate([
      {
        chef_id: chef3.id,
        name: 'Deconstructed Couscous',
        description: 'Modern take on traditional couscous with sous-vide lamb and seasonal vegetables',
        price: 165.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141'
      },
      {
        chef_id: chef3.id,
        name: 'Moroccan Spiced Salmon',
        description: 'Pan-seared salmon with ras el hanout and citrus couscous',
        price: 140.00,
        category: 'Main Course',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288'
      },
      {
        chef_id: chef3.id,
        name: 'Orange Blossom Panna Cotta',
        description: 'Creamy panna cotta infused with Moroccan orange blossom water',
        price: 50.00,
        category: 'Dessert',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777'
      }
    ]);

    console.log('Database seeded successfully!');
    console.log(' Summary:');
    console.log('   - 5 Users (2 customers, 3 chefs)');
    console.log('   - 2 Customer profiles');
    console.log('   - 3 Chef profiles');
    console.log('   - 13 Dishes');
    console.log('\n Test credentials:');
    console.log('   Email: customer1@takeachef.com | Password: password123');
    console.log('   Email: chef1@takeachef.com     | Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();