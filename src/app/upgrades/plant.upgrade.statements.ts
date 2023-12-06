import { UpgradeStatement } from "./upgrades.type";

export const plantUpgradeStatements: UpgradeStatement[] = [
  {
    toVersion: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS plant (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          imgUrl        VARCHAR NOT NULL,
          name          VARCHAR NOT NULL,
          description   TEXT NOT NULL
        );`
    ]
  },
]
