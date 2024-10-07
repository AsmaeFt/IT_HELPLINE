const Incidents = require("../models/incidents");

exports.createIncidents = async (req, res) => {
  try {
    const newIncident = Incidents.createFromRequestBody(req.body);
    const Incident = new Incidents(newIncident);
    await Incident.save();

    res.status(201).json(Incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incidents.find({});
    res.status(201).json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
