const prisma = require("../../../config/dbConfig.js");

const findAllUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      Pay: {
        include: {
          plan: true,
        },
        take: 3,
        orderBy: {
          date: "desc",
        },
      },
    },
  });
  return users;
};

const findAllUserPayments = async () => {
  const payments = await prisma.pay.findMany({
    where: {
      status: false,
    },
    include: {
      User: true,
    },
  });
  return payments;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
  return user;
};

const createUser = async (data) => {
  const user = await prisma.user.create({
    data: data,
  });
  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return user;
};

const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      Pay: {
        include: {
          plan: true,
        },
        take: 1,
        orderBy: {
          date: "desc",
        },
      },
    },
  });
  return user;
};

const updateUserRefreshToken = async (userId, refreshToken) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });
};

module.exports = {
  findAllUsers,
  findAllUserPayments,
  findUserById,
  updateUser,
  createUser,
  deleteUser,
  findUserByEmail,
  updateUserRefreshToken,
};
