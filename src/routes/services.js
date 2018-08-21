const express = require('express')
const router = express.Router()
const { accounts, writeJSON } = require('../data')

router.get('/transfer', (req, res) => res.render('transfer'))
router.post('/transfer', (req, res) => {
  const body = req.body
  accounts[body.from].balance = accounts[body.from].balance - body.amount
  accounts[body.to].balance = parseInt(accounts[body.to].balance, 10) + parseInt(body.amount, 10)

  writeJSON()
  res.render('transfer', { message: 'Transfer Completed' })
})

router.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }))
router.post('/payment', (req, res) => {
  accounts.credit.balance = req.body.amount - accounts.credit.balance
  accounts.credit.available = parseInt(req.body.amount) + parseInt(accounts.credit.available)

  writeJSON()
  res.render('payment', { message: 'Payment Successful', account: accounts.credit })
})

module.exports = router
