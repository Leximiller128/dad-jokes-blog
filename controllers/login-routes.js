//require express
const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');


// currently at "/"
//renders when you FIRST login(your dashboard)
router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          userId: req.session.userId,
        },
      });

      const posts = postData.map((post) => post.get({ plain: true }));

      
  
      res.render('dashboard', { 
        posts,
        username: req.session.username
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


//rendering login and sign up pages for users
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});
  
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(405).end();
  }
});

//module.exports
module.exports = router;

