import jwt from "jsonwebtoken";

interface ITokenPayload {
  userId: string;
}

const generateToken = (userId: string): string => {
  const payload: ITokenPayload = {
    userId: userId,
  };

  const token = jwt.sign(payload, process.env.JWT as string, {
    expiresIn: "1h",
  });

  return token;
};

export default generateToken;
