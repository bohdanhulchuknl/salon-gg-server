export const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

export const EDITOR_RANG = {
  junior: "Junior",
  middle: "Middle",
  senior: "Senior",
};

export const ORDER_STATUSES = {
  pending: {
    title: "pending",
    text: {
      user: "pending user confirmation",
      admin: "pending admin confirmation",
    },
  },
  inProcess: {
    title: "in process",
    text: "in process",
  },
  canceled: {
    title: "canceled",
    test: {
      user: "canceled by user",
      admin: "canceled by admin",
    },
  },
  placed: {
    title: "placed",
    text: "successfully placed"
  },
  completed: {
    title: "completed",
    text: "completed order"
  }
};
