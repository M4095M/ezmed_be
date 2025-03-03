const prisma = require("../../../config/dbConfig.js");

function normalizeIP(ip) {
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }
  return ip;
}

const getSession = async (token, ip) => {
  try {
    const normalizedIp = normalizeIP(ip);
    const session = await prisma.authSession.findFirst({
      where: {
        token,
        ip: normalizedIp,
      },
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findSessionByUser = async (userId) => {
  try {
    const session = await prisma.authSession.findFirst({
      where: {
        userId,
      },
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createSession = async (userId, token, ip) => {
  try {
    const normalizedIp = normalizeIP(ip);
    const session = await prisma.authSession.create({
      data: {
        token,
        user: {
          connect: {
            id: userId,
          },
        },
        ip: normalizedIp,
      },
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteSession = async (userId) => {
  try {
    const session = await prisma.authSession.delete({
      where: {
        userId,
      },
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSessionToken = async (userId, newToken) => {
  try {
    // Assumes a one-to-one mapping: one session per user.
    const session = await prisma.authSession.update({
      where: { userId: userId },
      data: { token: newToken },
    });
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getSession,
  findSessionByUser,
  createSession,
  deleteSession,
  updateSessionToken,
};
