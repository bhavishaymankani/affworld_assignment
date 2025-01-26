const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('./config/passport');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Initialize Passport middleware
app.use(passport.initialize());

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const feedRoutes = require('./routes/feedRoutes');
app.use('/api/feed', feedRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api', uploadRoutes);

app.get('/api/test', (req, res) => {
  res.send( "It's working!" );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
