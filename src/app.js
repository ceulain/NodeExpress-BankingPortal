const fs = require('fs')
const path = require('path')
const express = require('express')
const { accounts, users, writeJSON } = require('./data')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.render(
  'index', {title: 'Account Summary', accounts})
)

app.get('/savings', (req, res) => res.render('account', {account: accounts.savings}))
app.get('/checking', (req, res) => res.render('account', {account: accounts.checking}))
app.get('/credit', (req, res) => res.render('account', {account: accounts.credit}))
app.get('/profile', (req, res) => res.render('profile', {user: users[0]}))
app.get('/transfer', (req, res) => res.render('transfer'))
app.post('/transfer', (req, res) => {
  const body = req.body
  accounts[body.from].balance = accounts[body.from].balance - body.amount
  accounts[body.to].balance = parseInt(accounts[body.to].balance, 10) + parseInt(body.amount, 10)

  writeJSON()
  res.render('transfer', { message: "Transfer Completed" })
})

app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }))
app.post('/payment', (req, res) => {
  accounts.credit.balance = req.body.amount - accounts.credit.balance
  accounts.credit.available = parseInt(req.body.amount) + parseInt(accounts.credit.available)

  writeJSON()
  res.render('payment', { message: "Payment Successful", account: accounts.credit })
})

app.listen(3000, () => console.log('PS Project Running on port 3000!'))
