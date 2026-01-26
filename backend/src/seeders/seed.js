const { sequelize } = require('../config/database');
const { User, Chef, Customer, Dish, Booking, Review } = require('../models');
const bcrypt = require('bcrypt');

async function seedDatabase() {
  try {
    console.log(' Starting database seeding...');

    // Clean old test data
    console.log(' Cleaning old test data...');
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

    console.log('Creating users...');

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
        photo: 'https://www.cacao-barry.com/sites/default/files/styles/half_width_image/public/unnamed-4%5B1%5D.jpg.webp?itok=RqwAQqeY',
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
        photo: 'https://api.flavournetwork.ca/wp-content/uploads/2024/06/Susur-Lee-feat.jpg?w=3840&quality=75',
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
        photo: 'https://aujourdhui.ma/wp-content/uploads/2021/06/PORTRAIT-CHEF-MOHA-.jpg?x44726',
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
        photo: 'https://www.bloomberglinea.com/resizer/v2/DIPTGOE57NBGVLP4GMANHVB4CA.png?auth=ba57d962d4568b426b92c231dccfe08557e940968a9b4d5d69ffb071486941ee&width=800&height=566&quality=80&smart=true',
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
        price: 70,
        category: 'Main Course',
        image: 'https://broccyourbody.com/wp-content/uploads/2021/05/787522D6-8F9C-4B24-B5D7-FFE86BCF6A8B-1365x1536.jpeg',
      },
      {
        chef_id: chef1.id,
        name: 'Saffron Lamb Couscous',
        description: 'Seven-vegetable couscous with tender lamb ,Couscous is THE dish that any self-respecting Moroccan family eat every Friday',
        price: 90,
        category: 'Main Course',
        image: 'https://moroccanfoodtour.com/wp-content/uploads/2019/03/Moroccan-Food-Tours-Blog-Pictures-7.jpg',
      },
      {
        chef_id: chef1.id,
        name: 'Harira Soup Reimagined',
        description: 'Contemporary presentation of traditional soup with chickpeas and lentils',
        price: 18,
        category: 'Appetizer',
        image: 'https://www.grandmoroccanbazaar.com/wp-content/uploads/2022/12/Harira-Moroccan-soup-3-800x800.jpg.webp',
      },

      // Susur Lee - Asian Fusion
      {
        chef_id: chef2.id,
        name: 'Singaporean Chili Crab',
        description: 'Fresh crab in signature sweet and spicy tomato-chili sauce',
        price: 205,
        category: 'Main Course',
        image: 'https://nomadette.com/wp-content/uploads/2022/06/Singapore-Chilli-Crab-1024x1536.jpg',
      },
      {
        chef_id: chef2.id,
        name: 'Miso Black Cod',
        description: 'Buttery black cod marinated in sweet miso with pickled vegetables',
        price: 170,
        category: 'Main Course',
        image: 'https://cookingwithwineblog.com/wp-content/uploads/2024/09/Black-Cod-with-Miso-Butter-Sauce-Featured-1.jpg',
      },
      {
        chef_id: chef2.id,
        name: 'Thai Basil Duck',
        description: 'Crispy duck breast with Thai basil, chili, and tamarind glaze',
        price: 180,
        category: 'Main Course',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/26/8a/68/cc/crispy-basil-duck-duck.jpg',
      },

      // Mohamed Fadel - Traditional Moroccan
      {
        chef_id: chef3.id,
        name: 'Classic Lamb Tagine',
        description: 'Slow-cooked lamb with prunes, almonds, and honey in clay pot',
        price: 130,
        category: 'Main Course',
        image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2ji5p2QQDN8dteyWhNWyA3BXEW0IV1QVmFDyjLviH58XnDgRWxAacezvw_5PTmOaXCoevx9ewwjWuxpI61fm5EDiH3lYV4CJCd7mvZ3qGkxhpwuHmLsVjPnf9vGRkEVbnnsoNfm-yMf1eGssca45hzJ72OnSumznmTs351Z98fhaP1Oofpe4FcfIgU2jB/w640-h426-rw/2.jpg',
      },
      {
        chef_id: chef3.id,
        name: 'Seffa',
        description: 'Seffa is a Maghrebi term for a dish of sweetened semolina cuscus with butter, cinnamon, and almonds.',
        price: 110,
        category: 'Main Course',
        image: 'https://www.gzrecipes.com/content/uploads/sites/2/2025/11/IMG_1365-scaled-8-6926de07f3df96-04430957-1024x870.jpg',
      },
      {
        chef_id: chef3.id,
        name: 'Mechoui Lamb Shoulder',
        description: 'Whole roasted lamb shoulder with cumin and traditional spices',
        price: 350,
        category: 'Main Course',
        image: 'https://images.immediate.co.uk/production/volatile/sites/2/2022/04/Lamb_Shawarma-3fdc0a1.jpg?quality=90&resize=556,505',
      },

      // Meriem Tahiri - French Mediterranean
      {
        chef_id: chef4.id,
        name: 'Bouillabaisse Provençale',
        description: 'Traditional Marseille fish stew with saffron rouille',
        price: 195,
        category: 'Main Course',
        image: 'https://lacuisinedegeraldine.fr/wp-content/uploads/2023/07/Bouillabaisse-116-683x1024.jpg',
      },
      {
        chef_id: chef4.id,
        name: 'Duck Confit',
        description: 'Slow-cooked duck leg with crispy skin and fingerling potatoes',
        price: 120,
        category: 'Main Course',
        image: 'https://www.sevenhillswinery.com/wp-content/uploads/2019/09/duck-confit_1536x1152.jpg',
      },
      {
        chef_id: chef4.id,
        name: 'Pan-Seared Sea Bass',
        description: 'Mediterranean sea bass with fennel and cherry tomatoes',
        price: 142,
        category: 'Main Course',
        image: 'https://www.thedinnerbite.com/wp-content/uploads/2023/10/pan-seared-seabass-recipe-img-1.jpg',
      },

      // Ashley Palmer-Watts - Modern British
      {
        chef_id: chef5.id,
        name: 'Molecular Beef Wellington',
        description: 'Deconstructed Wellington with truffle foam and crispy pastry',
        price: 248,
        category: 'Main Course',
        image: 'https://www.fodder.co.uk/app/uploads/2021/11/Beef-wellington-web-237x300.jpg'
      },
      {
        chef_id: chef5.id,
        name: 'Fish & Chips Elevated',
        description: 'Beer-battered fish with triple-cooked chips and mushy pea puree',
        price: 198,
        category: 'Main Course',
        image: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/01/Next-level-fish-and-chips-f0ad0c4.jpg?quality=90&resize=708,643',
      },
      {
        chef_id: chef5.id,
        name: 'English Breakfast Reimagined',
        description: 'Modern take on classic fry-up with artisan ingredients',
        price: 122,
        category: 'Brunch',
        image: 'https://www.tamingtwins.com/wp-content/uploads/2025/04/full-english-breakfast-8-300x300.jpg',
      },

      // Jorge Badillo - Mexican
      {
        chef_id: chef6.id,
        name: 'Mole Poblano',
        description: 'Traditional chicken mole with 30+ ingredients and chocolate',
        price: 132,
        category: 'Main Course',
        image: 'https://images.squarespace-cdn.com/content/v1/59739d0ed2b857fb9af8f717/1569984238207-62GNS0LYZZ5ONG95CDH3/mole-poblano-cilantro-lime-rice.jpg',
      },
      {
        chef_id: chef6.id,
        name: 'Cochinita Pibil',
        description: 'Slow-roasted pork marinated in achiote and citrus',
        price: 135,
        category: 'Main Course',
        image: 'https://carlsbadcravings.com/wp-content/uploads/2024/07/Cochinita-Pibil-10.jpg',
      },
      {
        chef_id: chef6.id,
        name: 'Authentic Tacos al Pastor',
        description: 'Spit-roasted pork tacos with pineapple and cilantro',
        price: 158,
        category: 'Appetizer',
        image: 'https://www.jocooks.com/wp-content/uploads/2022/04/tacos-al-pastor-feature-1.jpg',
      },

      // Khadija Bensdira - Moroccan Home Cooking
      {
        chef_id: chef7.id,
        name: 'Grandmothers Chicken Tagine',
        description: 'Family recipe passed down through generations with preserved lemons',
        price: 128,
        category: 'Main Course',
        image: 'https://ethnicspoon.com/wp-content/uploads/2013/12/tagine-chicken-1.jpg',
      },
      {
        chef_id: chef7.id,
        name: 'Homestyle Couscous',
        description: 'Traditional Friday couscous with vegetables and tender meat',
        price: 126,
        category: 'Main Course',
        image: 'https://www.moroccoworldnews.com/wp-content/uploads/2024/11/couscous-1.jpg'
      },
      {
        chef_id: chef7.id,
        name: 'Rfissa',
        description: 'Traditional chicken dish with msemen and fenugreek',
        price: 130,
        category: 'Main Course',
        image: 'https://img.cuisineaz.com/660x660/2022/06/01/i184134-rfissa-au-poulet.jpeg',
      },

      // Amine Laabi - North African
      {
        chef_id: chef8.id,
        name: 'Charmoula Grilled Fish',
        description: 'Fresh fish marinated in North African spice blend',
        price: 134,
        category: 'Main Course',
        image: 'https://i.pinimg.com/736x/a4/a3/a8/a4a3a8c4801a5c77f9f43df75b1ce5f6.jpg',
      },
      {
        chef_id: chef8.id,
        name: 'Lamb Mechoui with Couscous',
        description: 'Roasted lamb with aromatic couscous and harissa',
        price: 118,
        category: 'Main Course',
        image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-3637_11-16f3ba4.jpg',
      },
      {
        chef_id: chef8.id,
        name: 'Zaalouk & Bread',
        description: 'Smoky eggplant salad with fresh Moroccan bread',
        price: 90,
        category: 'Appetizer',
        image: 'https://salimaskitchen.com/wp-content/uploads/2022/05/Zaalouk-Salimas-Kitchen-16-2.jpg',
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