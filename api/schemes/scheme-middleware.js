/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const Scheme = require('./scheme-model')

const checkSchemeId = (req, res, next) => {
  Scheme.findById(req.params.scheme_id)
      .then(schemeElem => {
        if(!schemeElem) return next({ status:404, message: `scheme with scheme_id ${req.params.scheme_id} not found` })
        req.scheme = schemeElem
        next()
      })
      // .catch(e=> next({ status:404, message: `scheme with ${req.params.scheme_id} not found`}))
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  if(!scheme_name || typeof scheme_name !== 'string')
      return next({ status:400, message: 'invalid scheme_name' })
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if(!instructions || typeof instructions !== 'string' || isNaN(step_number) || step_number < 1 )
      return next({ status: 400, message: 'invalid step' })
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
