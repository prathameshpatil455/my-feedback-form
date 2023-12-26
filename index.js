const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ratings_feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the ratings and feedback
const feedbackSchema = new mongoose.Schema({
  rating: Number,
  feedback: String,
});

// Create a model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit', async (req, res) => {
    const { rating, feedback } = req.body;
  
    // Check if rating is a valid number
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).send('Invalid rating. Please enter a number between 1 and 5.');
    }
  
    // Save the data to the database
    try {
      const newFeedback = new Feedback({
        rating: parsedRating,
        feedback,
      });
  
      await newFeedback.save();
      res.send('Feedback submitted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving feedback to the database');
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/feedback', async (req, res) => {
    try {
      const feedbackData = await Feedback.find();
      res.json(feedbackData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving feedback data');
    }
  });
  
