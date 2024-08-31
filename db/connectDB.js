import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const connectDB = async () => {
  try {
    await global._mongoClientPromise;
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
