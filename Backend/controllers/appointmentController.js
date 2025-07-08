import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';

// Book an appointment
export const bookAppointment = async (req, res) => {
  try {
    const { date, time, department, reason, doctorId } = req.body;
    const userId = req.user.id;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const appointment = await Appointment.create({
      userId,
      doctorId,
      date,
      time,
      department,
      reason,
    });

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};

// Fetch all appointments for logged-in user (Consultations)
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ userId })
      .populate('doctorId', 'name specialty')
      .sort({ createdAt: -1 });

    const consultationData = appointments.map((a) => ({
      id: a._id,
      doctor: a.doctorId.name,
      specialty: a.doctorId.specialty,
      date: a.date,
      time: a.time,
      note: a.reason || "No consultation notes provided yet.",
      status: a.status,
    }));

    res.status(200).json(consultationData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch consultations', error: error.message });
  }
};
