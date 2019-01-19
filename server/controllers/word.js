const db = require('../models');

exports.getWords = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};

exports.addWords = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};

exports.rmWords = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};

exports.getUserWords = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};

exports.addUserWords = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};

exports.changeStatusWord = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};

exports.changeStatusUserWord = (req, res) => {
  const { name } = req.body;
  res.send(`word "${name}"`);
};
