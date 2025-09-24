-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
