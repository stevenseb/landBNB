// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const { restoreUser } = require('../../utils/auth.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models/index.js');
const { requireAuth } = require('../../utils/auth.js');


router.post('/test', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({ requestBody: req.body });
  });


router.get('/set-token-cookie', async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Breakfast'
      }
    });
    setTokenCookie(res, user);
    
    return res.json({ user: user });
  });

// GET /api/restore-user
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


router.use(restoreUser);
router.use('/session', sessionRouter);



router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
  });



module.exports = router;
