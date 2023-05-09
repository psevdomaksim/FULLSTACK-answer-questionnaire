const Router = require('express')
const router = new Router()
const answerLikeController = require('../controllers/answerLikeController');
//const checkRole = require('../middleware/checkRoleMiddleware')
const checkBan = require('../middlewares/checkBanMiddleware')

router.get("/", checkBan, answerLikeController.getAllAnswerLikes);
router.get("/:id",checkBan, answerLikeController.getOneAnswerLike);
router.post("/",checkBan, answerLikeController.createNewAnswerLike);
router.delete("/:id",checkBan, answerLikeController.deleteAnswerLike);

module.exports = router;