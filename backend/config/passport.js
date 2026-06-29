// backend/config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true, // Production scale reverse proxies like Render/Heroku k liye safe hai
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;

      // Strict Authorization Check: Sirf aapka specific email dashboard access karega
      if (email !== process.env.ADMIN_EMAIL) {
        return done(null, false, {
          message: "Access Denied: Unauthorized administrator email.",
        });
      }

      // Admin authenticated successfully
      const adminUser = {
        id: profile.id,
        name: profile.displayName,
        email: email,
        picture: profile.photos[0].value,
      };

      return done(null, adminUser);
    },
  ),
);

// Session handling logic for Passport
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
