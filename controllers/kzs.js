const { orders } = require("../database/models");
const { responseMaker, telegramBot } = require("../utils");

module.exports = {
    /**
     * POST запрос, заказ звонка
     * @param {*} req
     * @param {*} res
     */
    async kzsFeedback(req, res) {
        const { name = null, phone = null, message = null, data = {} } = req.body;

        if (!name || !phone) {
            return responseMaker(res, 204);
        }

        const newLoftOrder = await orders.create({
            name,
            phone,
            message,
            data
        });

        telegramBot(
            `Имя: <b>${name}</b>\nТелефон: <b>${phone}</b>\nСообщение: <b>${message}</b>`
        );

        if (newLoftOrder.id) {
            return responseMaker(
                res,
                200,
                "Success",
                "Заявка отправлена. Ожидайте звонка."
            );
        } else {
            return responseMaker(res, 400, "Error", "Ошибка сервера.");
        }
    },
};
