const mongoose = require('mongoose');
const Gender = require('./models/Gender');
const genderSeeds = require('./seeds/genderSeeds.json');

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pharmax';

async function seedGenders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing genders
    await Gender.deleteMany({});
    console.log('🗑️  Cleared existing genders');

    // Insert seed data
    const insertedGenders = await Gender.insertMany(genderSeeds);
    console.log(`✅ Inserted ${insertedGenders.length} genders:`);
    insertedGenders.forEach(gender => {
      console.log(`   - ${gender.displayName} (${gender.genderName})`);
    });

    console.log('✅ Gender seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding genders:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedGenders();
