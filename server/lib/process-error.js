function processError(originError, oldErrors) {
  const errors = oldErrors || [];

  function seqUniqueError(error) {
    error.errors.forEach((err) => {
      const { message, path, value } = err;
      errors.push({
        message,
        path,
        value,
      });
    });
  }

  function seqAggregateError(error) {
    error.forEach((err) => {
      processError(err, errors);
    });
  }

  function seqBulkRecordError(error) {
    if (Array.isArray(error.errors)) {
      error.errors.forEach((err) => {
        processError(err, errors);
      });
    } else {
      processError(error.errors, errors);
    }
  }

  function seqVlidationError(error) {
    error.errors.forEach((err) => {
      const {
        message,
        path,
        value,
        validatorArgs,
        validatorKey,
      } = err;
      errors.push({
        message,
        path,
        value,
        validatorKey,
        validatorArgs,
      });
    });
  }

  function seqForeignKeyError(error) {
    const { detail, constraint } = error.original;
    errors.push({
      message: 'item associated with other tables',
      text: error.message,
      detail,
      constraint,
    });
  }

  switch (originError.name) {
    case 'SequelizeValidationError':
      seqVlidationError(originError);
      break;

    case 'AggregateError':
      seqAggregateError(originError);
      break;

    case 'SequelizeUniqueConstraintError':
      seqUniqueError(originError);
      break;

    case 'SequelizeBulkRecordError':
      seqBulkRecordError(originError);
      break;

    case 'SequelizeForeignKeyConstraintError':
      seqForeignKeyError(originError);
      break;

    default:
      errors.push(originError);
      break;
  }

  return errors;
}

module.exports = processError;
