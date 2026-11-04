import {
  hashPassword,
  verifyPassword,
  randomToken,
  PASSWORD_HASH_COST,
} from "../backend/password";
const password = randomToken();
for (let i = 0; i < 3; i++) {
  const start = process.cpuUsage(),
    wall = performance.now();
  const iterations = 10;
  for (let j = 0; j < iterations; j++) {
    const hash = await hashPassword(password);
    if (!(await verifyPassword(password, hash)))
      throw new Error("Password verification failed");
  }
  const cpu = process.cpuUsage(start);
  console.log(
    JSON.stringify({
      sample: i + 1,
      operations: iterations * 2,
      cost: PASSWORD_HASH_COST,
      cpuMsPerOperation: Number(
        ((cpu.user + cpu.system) / (1000 * iterations * 2)).toFixed(3),
      ),
      wallMsPerOperation: Number(
        ((performance.now() - wall) / (iterations * 2)).toFixed(3),
      ),
    }),
  );
}
console.log(
  "Local CPU measurements are a deployment feasibility check, not a Cloudflare production benchmark.",
);
