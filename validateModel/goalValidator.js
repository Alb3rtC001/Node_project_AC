const { body, validationResult } = require('express-validator');

const goalValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('El nombre es obligatorio'),
        body('description').optional(),
        body('deadline').optional().isISO8601().toDate().withMessage('La fecha límite debe ser una fecha válida'),
        body('schedule.horas').optional().isInt().withMessage('Las horas deben ser un número entero'),
        body('schedule.day').optional().isInt().withMessage('El día debe ser un número entero'),
        body('schedule.week').optional().isArray().withMessage('La semana debe ser un arreglo de números'),
        body('schedule.month.En').optional().isInt().withMessage('Enero debe ser un número entero'),
        body('schedule.month.Fb').optional().isInt().withMessage('Febrero debe ser un número entero'),
        body('schedule.month.Mr').optional().isInt().withMessage('Marzo debe ser un número entero'),
        body('schedule.month.Ab').optional().isInt().withMessage('Abril debe ser un número entero'),
        body('schedule.month.My').optional().isInt().withMessage('Mayo debe ser un número entero'),
        body('schedule.month.Jn').optional().isInt().withMessage('Junio debe ser un número entero'),
        body('schedule.month.Jl').optional().isInt().withMessage('Julio debe ser un número entero'),
        body('schedule.month.Ag').optional().isInt().withMessage('Agosto debe ser un número entero'),
        body('schedule.month.St').optional().isInt().withMessage('Septiembre debe ser un número entero'),
        body('schedule.month.Oc').optional().isInt().withMessage('Octubre debe ser un número entero'),
        body('schedule.month.Nb').optional().isInt().withMessage('Noviembre debe ser un número entero'),
        body('schedule.month.Dc').optional().isInt().withMessage('Diciembre debe ser un número entero'),
        body('startDate').optional().isISO8601().toDate().withMessage('La fecha de inicio debe ser una fecha válida'),
        body('lastUpdate').optional().isISO8601().toDate().withMessage('La última actualización debe ser una fecha válida'),
        body('countUpdates').optional().isInt().withMessage('El conteo de actualizaciones debe ser un número entero'),
        body('status').optional().isBoolean().withMessage('El estado debe ser un valor booleano'),
        body('progress.*.date').optional().isISO8601().toDate().withMessage('La fecha de progreso debe ser una fecha válida'),
        body('progress.*.notes').optional(),
        body('progress.*.status').optional().isBoolean().withMessage('El estado de progreso debe ser un valor booleano'),
        body('goalType').notEmpty().withMessage('El tipo de objetivo es obligatorio')
    ];
};

// Middleware para manejar las validaciones y errores
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    goalValidationRules,
    validate
};

