const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/predict', async (req, res) => {
  try {
    console.log(req.body)
    const { data } = await axios.post('https://ussouthcentral.services.azureml.net/workspaces/36337bfb73cb47c2b5e35e61c8f7b24e/services/30862801b5874558b651cfb2614407b5/execute?api-version=2.0&details=true', req.body, {
      headers: {
        'Authorization': 'Bearer 6Htc5eIjMB8g+6old2WTalq+gd0wMaLAnSqGJ3RnqPHizbENswuIHdMP5TWEn3Yo0g388+JL1bJWmbjVFCELZQ=='
      }
    })
    console.log('data', data, 'dd', req.body)
    res.json(data)

  } catch (error) {
    console.log('dd', req.body)
    res.json(error)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})