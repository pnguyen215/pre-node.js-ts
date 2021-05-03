import App from './app';

const PORT = process.env.PORT || 9091;
App.app.listen(PORT, () => console.log('Server is running on port: ' + PORT));