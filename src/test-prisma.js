import { prisma } from "./config/database.js";
async function getUsers() {
    const users = await prisma.user.findMany();
    console.log(users);
}
getUsers()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
