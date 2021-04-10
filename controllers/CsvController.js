/* eslint consistent-return: off */
const fs = require('fs');
const parse = require('csv-parse');
const bcrypt = require('bcryptjs');

const debug = require('debug')('shoppingcart:csv-controller');

const User = require('../models/User');
const Product = require('../models/Product');

exports.csvProducts = (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }
    const path = `${__dirname}/../tmp/${req.file.filename}`;
    const products = [];

    fs.createReadStream(path)
      .pipe(parse({ columns: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        products.push(row);
      })
      .on('end', () => {
        Product.insertMany(products)
          .then(() => {
            res.status(200).send({
              message:
                 `Uploaded the file successfully: ${req.file.originalname}`,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
  } catch (e) {
    debug(`Error: ${e.message}`);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`,
    });
  }
};

exports.csvUsers = (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send('Please upload a CSV file!');
    }
    const path = `${__dirname}/../tmp/${req.file.filename}`;
    const users = [];

    fs.createReadStream(path)
      .pipe(parse({ columns: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        const user = row;
        user.password = bcrypt.hashSync(row.password, 8);
        users.push(user);
      })
      .on('end', () => {
        User.insertMany(users)
          .then(() => {
            res.status(200).send({
              message:
                   `Uploaded the file successfully: ${req.file.originalname}`,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
  } catch (e) {
    debug(`Error: ${e.message}`);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}`,
    });
  }
};
