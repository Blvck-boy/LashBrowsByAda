const Trainee = require('../models/Trainee');

exports.registerTrainee = async (req, res) => {
  try {
    const { name, email, phone, experienceLevel } = req.body;

    // Check if email already exists
    const existingTrainee = await Trainee.findOne({ email });
    if (existingTrainee) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const trainee = new Trainee({
      name,
      email,
      phone,
      experienceLevel
    });

    await trainee.save();

    res.status(201).json({ message: 'Trainee registered successfully', trainee });
  } catch (error) {
    console.error('Trainee registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find().sort({ registeredAt: -1 });
    res.json(trainees);
  } catch (error) {
    console.error('List trainees error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};