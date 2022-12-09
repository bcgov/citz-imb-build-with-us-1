const fakeUsers = [
  {
    guid: 1001,
    mentor_guid: 1002,
    groud_id: 405,
    points: 500,
  },
  {
    guid: 1002,
    mentor_guid: 1003,
    groud_id: 305,
    points: 950,
  }
];

/**
 * Get user by id.
 * @method GET
 */
exports.get_user = (req, res) => {
  const user = fakeUsers.filter(user => {
    return user.guid == req.params.id
  })[0];

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found.');
  };
};
