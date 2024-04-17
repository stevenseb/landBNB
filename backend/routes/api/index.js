
// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models/index.js');
const { requireAuth } = require('../../utils/auth.js');



// test route for api router
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });



router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Breakfast'
      }
    });
    setTokenCookie(res, user);
    
    return res.json({ user: user });
  });

// GET /api/restore-user
router.use(restoreUser);
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });



module.exports = router;
