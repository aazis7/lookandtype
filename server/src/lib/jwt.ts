import {
  SignJWT,
  jwtVerify,
  jwtDecrypt,
  type JWTPayload,
  type JWTVerifyOptions,
} from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

type Payload = JWTPayload & {
  sub: string;
};

export const verifyOptions: JWTVerifyOptions = {
  algorithms: ["HS256"],
  audience: "user",
  maxTokenAge: "15m",
};

export async function encode(
  payload: Payload,
  expiresIn: string = "15m",
): Promise<string> {
  return await new SignJWT({ sub: payload.sub })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setAudience(verifyOptions.audience!)
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}

export async function decode(token: string) {
  return await jwtDecrypt(token, JWT_SECRET, {
    maxTokenAge: verifyOptions.maxTokenAge,
    subject: verifyOptions.subject,
    audience: verifyOptions.audience,
  });
}

export async function verify(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET, verifyOptions);
  return payload as Payload;
}
