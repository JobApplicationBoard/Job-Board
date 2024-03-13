## Tasks to enable basic bcrypt login:

### Make a new user
- [ ] Add route to handle POST requests to `/signup`
  - [ ] post request initiated in front-end
  - [ ] create a new route in server.js & connect to new router
- [ ] Adjust userController.createUser middleware to create a user
  - Properties: username, password
  - [ ] Middleware should use bcrypt to hash password
  - [] Import middleware into router
- [ ] Redirect successful signups somewhere
- [ ] Add route POST to login
- [ ] Build out userController.verifyUser
  - [ ] Missleware should use bcrypt to check password in DB
- [ ] React app should default to displaying login page, otherwise if logged in, should display whatever would normally get displayed

### Create a cookie
- [ ] add setSSIDCookie middleware to `/` route, name: ssid with the user's id from users table
- [ ] ensure cookie is httponly

### Sessions
- [ ] Create a session when a user creates an account. 