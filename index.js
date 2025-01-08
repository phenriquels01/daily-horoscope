import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/:sign', async (req, res) => {
    const { sign } = req.params;
    
    try {

        const response = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`);
        const horoscope = response.data.data.horoscope_data;
        const date = response.data.data.date;
        
        res.render('sign-page.ejs', { sign, horoscope, date });
    } catch (error) {
        console.error('Error fetching horoscope:', error);
        res.render('sign-page.ejs', { sign, horoscope: 'Oops! Something went wrong. Try again later.', date: '' });
    }
});

app.get('/horoscope/:sign', async (req, res) => {
    const sign = req.params.sign;
    try {
      const response = await axios.get(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`);
      const horoscopeData = response.data.data.horoscope_data;
      res.render('sign-page', { sign, horoscopeData });
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      res.render('sign-page', { sign, horoscopeData: 'Oops! Something went wrong. Please try again later.' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});